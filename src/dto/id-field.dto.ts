import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IIdField } from '../interfaces/id-field.interface';

export class IdFieldDto implements IIdField {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
