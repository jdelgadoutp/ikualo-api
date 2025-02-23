import { IsNotEmpty, IsNumber, IsPositive, IsString, IsMongoId } from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateMomeventsDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Fecha movimiento financiero"})
    readonly date: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Valor posible [Ingreso,Egreso]"})
    readonly type: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: "Valor de movimiento financiero"})
    readonly value: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Descripción del movimiento"})
    readonly description: string;

    @IsNotEmpty()
    @IsMongoId()
    readonly user: string;

};

export class UpdateMomeventsDto extends PartialType(CreateMomeventsDto){}