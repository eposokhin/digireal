import { Column, HasMany, Table, Model, DataType } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";

interface userCreationAttrs {
    balance: number;
}

@Table({
    tableName: 'users',
    timestamps: true,
})
export class UserModel extends Model<UserModel, userCreationAttrs> {
    @Column({
        type: DataType.DECIMAL(15, 2),
        allowNull: false
    })
    balance!: number;

    @HasMany(() => TransactionModel, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'transactions'
    })
    transactions!: TransactionModel[];
}