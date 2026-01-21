import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './database/models/user.model';
import { TransactionModel } from './database/models/transaction.model';
import { Sequelize } from 'sequelize-typescript';
import { ActionEnum } from './types/action.enum';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(UserModel) private userModel: typeof UserModel,
        @InjectModel(TransactionModel) private transactionModel: typeof TransactionModel,
        private readonly sequelize: Sequelize
    ) { }

    async getUser(userId: number) {
        const user = await this.userModel.findByPk(userId, {
            include: [
                {
                    model: TransactionModel
                }
            ]
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async create(balance: number) {
        return await this.userModel.create({
            balance
        });

    }

    async withdraw(userId: number, amount: number, idempotentKey: string) {

        const transaction = await this.sequelize.transaction();

        try {
            const existingTransaction = await this.transactionModel.findOne({
                where: {
                    idempotentKey
                },
                transaction, lock: transaction.LOCK.NO_KEY_UPDATE
            });

            if (existingTransaction) {
                await transaction.rollback();
                Logger.warn('Idempotent transaction found, skipping withdrawal')
                return;
            }

            const user = await this.userModel.findByPk(userId, { transaction, lock: transaction.LOCK.NO_KEY_UPDATE });

            if (!user) throw new NotFoundException('User not found');
            if (user.balance < amount) throw new BadRequestException('Insufficient balance');

            await this.userModel.decrement({ balance: amount }, { where: { id: user.id }, transaction });

            await this.transactionModel.create({
                userId: user.id,
                action: ActionEnum.WITHDRAW,
                amount,
                idempotentKey
            }, { transaction });

            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }
}
