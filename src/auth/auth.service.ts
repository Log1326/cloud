import { ForbiddenException, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { UserEntity } from '../users/entities/user.entity'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}
	async validateUser(email: string, password: string) {
		const user = await this.usersService.findByEmail(email)
		if (user && user.password === password) {
			const { password, ...result } = user
			return result
		}
		return null
	}
	async register(dto: CreateUserDto): Promise<{ token: string }> {
		try {
			const userData = await this.usersService.create(dto)
			return {
				token: this.jwtService.sign({ id: userData.id })
			}
		} catch (e) {
			throw new ForbiddenException('mistake with registration')
		}
	}
	async login(user: UserEntity): Promise<{ token: string }> {
		return {
			token: this.jwtService.sign({ id: user.id })
		}
	}
}
