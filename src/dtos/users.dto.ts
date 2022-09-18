import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(5)
  public password: string;

  @IsString()
  @MinLength(3)
  public name: string;
}

export class SigninUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
