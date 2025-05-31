import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
import { UserPublicDto } from './dto/user.public.dto';
import { UserUpdatePasswordDto } from './dto/user.update-password.dto';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findMany(): Promise<UserPublicDto[]> {
    const result = await this.userService.findMany();
    return result.map((user) => plainToInstance(UserPublicDto, user));
  }

  @Get(':id')
  async findByIdOrException(
    @Param() params: IdFieldDto,
  ): Promise<UserPublicDto> {
    const user = await this.userService.findById(params.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserPublicDto, user);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<UserPublicDto> {
    const user = await this.userService.create(body);
    return plainToInstance(UserPublicDto, user);
  }

  @Put(':id')
  async updateByIdOrException(
    @Param() params: IdFieldDto,
    @Body() body: UserUpdatePasswordDto,
  ): Promise<UserPublicDto> {
    const { errors, updatedUser } = await this.userService.updatePassword(
      params.id,
      body,
    );

    if (errors.notFound) {
      throw new NotFoundException('User not found');
    }

    if (errors.invalidPassword) {
      throw new BadRequestException('Invalid password');
    }

    return plainToInstance(UserPublicDto, updatedUser);
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
