import { IsString, IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  contactName: string;
}
