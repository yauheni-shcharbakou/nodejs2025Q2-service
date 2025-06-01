import { IsBoolean, IsNotEmpty } from 'class-validator';

export class OkResponseDto {
  @IsNotEmpty()
  @IsBoolean()
  ok: boolean;
}
