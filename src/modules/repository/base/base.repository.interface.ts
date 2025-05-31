import { IIdField } from '../../../interfaces/id-field.interface';

export interface IBaseRepository<
  Entity extends IIdField,
  Create extends object = Partial<Entity>,
  Update extends object = Partial<Entity>,
> {
  findAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity | undefined>;
  create(data: Create): Promise<Entity>;
  updateById(
    id: string,
    updateData: Update | ((entity: Entity) => Update),
  ): Promise<Entity | undefined>;
  deleteById(id: string): Promise<boolean>;
}
