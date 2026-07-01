import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateWebsiteDto {
  @IsInt()
  publisherId!: number;

  @IsString()
  @MinLength(1)
  name!: string;
}
