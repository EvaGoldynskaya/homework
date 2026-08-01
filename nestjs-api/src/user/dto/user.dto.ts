import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto{
  @IsString()
  @MinLength(2)
  name!: string;
  @IsDate()
  birthdate!: string;
  @IsEmail()
  email!: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}