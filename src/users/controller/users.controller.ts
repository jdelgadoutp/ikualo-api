import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UsersService } from 'src/users/service/users.service';
import { CreateUsersDto, UpdateUsersDto } from '../dtos/users.dto';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) { }

    @Get()
    @ApiOperation({ summary: "List of users" })
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.usersService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: "Search by Id" })
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: string) {
        return this.usersService.findId(id);
    }

    @Get('/email/:email')
    @ApiOperation({ summary: "Search by email" })
    @HttpCode(HttpStatus.OK)
    findByEmail(@Param('email') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Post()
    @ApiOperation({ summary: "Create users" })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: CreateUsersDto) {
        return this.usersService.create(payload);
    }
}
