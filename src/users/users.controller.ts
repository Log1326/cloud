import { Controller, Get, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserId } from '../decorators/user-id.decorators'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('/me')
	@UseGuards(JwtAuthGuard)
	getMe(@UserId() id: number) {
		return this.usersService.findById(id)
	}
}
