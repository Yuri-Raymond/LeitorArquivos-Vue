import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsDefined, IsDateString, Matches, IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class ProcessDto {
    @Matches(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    @ApiProperty({ example: 'e3e03e39ie3jroefj484fd5gd84' })
    id: String;

    @IsString()
    @ApiProperty({ example: '1°' })
    periodoInicio: String;

    @IsString()
    @ApiProperty({ example: '9°' })
    periodoTermino: String;
    
    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    inicio: Date;

    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    termino: Date;

    @IsString()
    @ApiProperty({ example: '1597326' })
    BondId: String;

    @IsString()
    @ApiProperty({ example: 'f1ds5fsg8sd5' })
    ClassId: String;

    @IsString()
    @ApiProperty({ example: 'asd88a4a5e8f6d2' })
    DisciplineId: String;

    @IsString()
    @ApiProperty({ example: '1597326' })
    UserId: String;

    constructor(partial: Partial<ProcessDto> = {}) {
        this.id= partial.id ?? "";

        this.periodoInicio= partial.periodoInicio ?? "";

        this.periodoTermino= partial.periodoTermino ?? "";
    
        this.inicio= partial.inicio ?? new Date()
    
        this.termino= partial.termino ?? new Date();

        this.BondId= partial.BondId ?? "";

        this.ClassId= partial.ClassId ?? "";

        this.DisciplineId= partial.DisciplineId ?? "";

        this.UserId= partial.UserId ?? "";

    }
}