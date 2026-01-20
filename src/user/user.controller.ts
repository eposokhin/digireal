import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { WithdrawDto } from './dto/withdraw.dto';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  create(@Body() body: UserDto) {
    return this.userService.create(body.balance);
  }

  @Post(':id/withdraw')
  withdraw(
    @Body() body: WithdrawDto,
    @Param('id', ParseIntPipe) userId: number
  ) {
    return this.userService.withdraw(userId, body.amount, body.idempotentKey)
  }
}
