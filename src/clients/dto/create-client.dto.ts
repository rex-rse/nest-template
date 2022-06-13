import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `client's name` })
  readonly name: string;

  // @IsString()
  // @IsNotEmpty()
  // readonly description: string;

  // @IsNumber()
  // @IsNotEmpty()
  // @IsPositive()
  // readonly price: number;

  // @IsNumber()
  // @IsNotEmpty()
  // readonly stock: number;

  // @IsUrl()
  // @IsNotEmpty()
  // readonly image: string;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}

export class FilterClientsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
