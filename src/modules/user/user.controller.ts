import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IdFieldDto } from '../../dto/id-field.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UserUpdatePasswordDto } from './dto/user.update-password.dto';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findMany(): Promise<UserDto[]> {
    const result = await this.userService.findMany();
    return result.map((user) => plainToInstance(UserDto, user));
  }

  @Get(':id')
  async findByIdOrException(@Param() params: IdFieldDto): Promise<UserDto> {
    const user = await this.userService.findById(params.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserDto, user);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<UserDto> {
    const user = await this.userService.create(body);
    return plainToInstance(UserDto, user);
  }

  @Put(':id')
  async updateByIdOrException(
    @Param() params: IdFieldDto,
    @Body() body: UserUpdatePasswordDto,
  ): Promise<UserDto> {
    const { errors, updatedUser } = await this.userService.updatePassword(
      params.id,
      body,
    );

    if (errors.notFound) {
      throw new NotFoundException('User not found');
    }

    if (errors.invalidPassword) {
      throw new ForbiddenException('Invalid password');
    }

    return plainToInstance(UserDto, updatedUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteByIdOrException(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.userService.deleteById(params.id);

    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
