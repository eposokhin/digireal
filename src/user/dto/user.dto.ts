import { IsPositive } from "class-validator";

export class UserDto {
    @IsPositive()
    balance!: number;
}