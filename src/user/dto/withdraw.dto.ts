import { IsPositive, IsUUID } from "class-validator";

export class WithdrawDto {
    @IsPositive()
    amount!: number;

    @IsUUID()
    idempotentKey!: string;
}