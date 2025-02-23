import { Controller, Get, Param, HttpStatus, HttpCode, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MovementsService } from 'src/users/service/movements.service';
import { CreateMomeventsDto, UpdateMomeventsDto } from '../dtos/movements.dto';
import { CreateUsersDto } from '../dtos/users.dto';
import { UsersService } from '../service/users.service';

@Controller('movements')
export class MovementsController {
  constructor(
    private movementsService: MovementsService,
    private userService: UsersService,
  ) { }

  @Get()
  @ApiOperation({ summary: "List of movements" })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.movementsService.findAll();
  }

  @Get(':user')
  @ApiOperation({ summary: "List of movements by User" })
  @HttpCode(HttpStatus.OK)
  findByUser(@Param('user') user: string) {
    return this.movementsService.findByUser(user);
  }


  @Get(':movementId')
  @ApiOperation({ summary: "Search by id" })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('movementId') movementId: string) {
    return this.movementsService.findOne(movementId);

  }

  @Post()
  @ApiOperation({ summary: "Create movements" })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateMomeventsDto) {
    return await this.userService.update(payload.user, { balance: payload.value }, payload.type)
      ? { code: -1, message: "Saldo insuficiente" } : this.movementsService.create(payload);
  }

  @Put(':movementId')
  @ApiOperation({ summary: "Update by id" })
  @HttpCode(HttpStatus.OK)
  update(@Param('movementId') movementId: string, @Body() payload: UpdateMomeventsDto) {
    return this.movementsService.update(movementId, payload);
  }

  @Delete(':movementId')
  @ApiOperation({ summary: "Delete by id" })
  @HttpCode(HttpStatus.OK)
  delete(@Param(':movementId') movementId: string) {
    return this.movementsService.delete(movementId);
  }
}
