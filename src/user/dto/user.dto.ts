import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail({}, { message: 'O email deve ser válido!' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  @IsNotEmpty()
  business: string
}