import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ActionEnum } from "../../types/action.enum";

@Table({
  tableName: 'transactions'
})
export class TransactionModel extends Model {
  @ForeignKey(() => UserModel)
  @Column({
    allowNull: false
  })
  userId!: number;

  @Column({
    type: DataType.ENUM(...Object.values(ActionEnum)),
    allowNull: false
  })
  action!: ActionEnum;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false
  })
  amount!: number;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true
  })
  idempotentKey!: string;
}