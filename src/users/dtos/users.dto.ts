import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateUsersDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Nombre de usuario"})
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: "Email de usuario"})
    readonly email: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: "Email de usuario"})
    readonly balance: number;


};

export class UpdateUsersDto extends PartialType(CreateUsersDto){}