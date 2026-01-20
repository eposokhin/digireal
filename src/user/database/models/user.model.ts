import { Column, HasMany, Table, Model, DataType } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";

@Table({
    tableName: 'users',
    timestamps: true,
})
export class UserModel extends Model {
    @Column({
        type: DataType.DECIMAL(15, 2),
        allowNull: false
    })
    declare balance: number;

    @HasMany(() => TransactionModel, {
        foreignKey: 'userId'
    })
    transactions!: TransactionModel[];
}