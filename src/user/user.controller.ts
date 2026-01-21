import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { WithdrawDto } from './dto/withdraw.dto';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  getUser(@Param('id') userId: number) {
    return this.userService.getUser(userId)
  }

  @Post('create')
  createUser(@Body() body: UserDto) {
    return this.userService.create(body.balance);
  }

  @Post(':id/withdraw')
  withdrawFromUserBalance(
    @Body() body: WithdrawDto,
    @Param('id', ParseIntPipe) userId: number
  ) {
    return this.userService.withdraw(userId, body.amount, body.idempotentKey)
  }
}
