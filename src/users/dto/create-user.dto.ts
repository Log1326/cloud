import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
	@ApiProperty({
		default: 'test@mail.com'
	})
	email: string
	@ApiProperty({
		default: 'John Doil'
	})
	fullName: string
	@ApiProperty({
		default: '12356'
	})
	password: string
}
