import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório!' })
  fullName: string;

  @IsEmail({}, { message: 'O email deve ser válido!' })
  @IsNotEmpty({ message: 'O email é obrigatório!' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório!' })
  @IsPhoneNumber('BR', {message: 'O telefone deve ser válido'})
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'O empresa é obrigatória!' })
  business: string
}