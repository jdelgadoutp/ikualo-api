import { Controller, Get, Param, HttpStatus, HttpCode, ParseIntPipe, Post, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MovementsService } from 'src/users/service/movements.service';
import { CreateMomeventsDto, UpdateMomeventsDto } from '../dtos/movements.dto';
import { CreateUsersDto } from '../dtos/users.dto';
import { UsersService } from '../service/users.service';
import { runInThisContext } from 'vm';

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


  @Get(':movementid')
  @ApiOperation({ summary: "Search by id" })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('movementid') movementid: string) {
    return this.movementsService.findOne(movementid);

  }

  @Post()
  @ApiOperation({ summary: "Create movements" })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateMomeventsDto) {
    return await this.userService.update(payload.user, { balance: payload.value }, payload.type)
      ? this.movementsService.create(payload)
      : { code: -1, message: "Saldo insuficiente" };
  }

  @Put(':movementId')
  @ApiOperation({ summary: "Update by id" })
  @HttpCode(HttpStatus.OK)
  update(@Param('movementId') movementId: string, @Body() payload: UpdateMomeventsDto) {
    return this.movementsService.update(movementId, payload);
  }

  @Delete('/delete/:movementid')
  async delete(@Param('movementid') movementid: string) {
    const movement = await this.movementsService.findOne(movementid);
    const userId = !movement?.user ? '' : movement?.user;
    const type = !movement?.type ? '' : movement?.type;
    const value = !movement?.value ? 0 : movement?.value;
    return await this.userService.validDelete(userId.toString(), { balance: value }, type)
      ? this.movementsService.delete(movementid)
      : { code: -1, message: "Saldo insuficiente" };
  }
}
