import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FavoritesAddResultDto {
  @ApiProperty({ description: 'Result message' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
