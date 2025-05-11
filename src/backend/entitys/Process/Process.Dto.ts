import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsDefined, IsDateString, Matches, IsNumber} from 'class-validator';

export abstract class ProcessDto {
    @Matches(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    id: String;

    @IsString()
    periodoInicio: String;

    @IsString()
    periodoTermino: String;
    
    @IsDateString()
    inicio: Date;

    @IsDateString()
    termino: Date;

    @IsString()
    BondId: String;

    @IsString()
    ClassId: String;

    @IsString()
    DisciplineId: String;

    @IsString()
    UserId: String;

    constructor(partial: Partial<ProcessDto> = {}) {
        this.id= partial.id ?? "";

        this.periodoInicio= partial.periodoInicio ?? "";

        this.periodoTermino= partial.periodoTermino ?? "";
    
        this.inicio= partial.inicio ?? new Date();
    
        this.termino= partial.termino ?? new Date(0);

        this.BondId= partial.BondId ?? "";

        this.ClassId= partial.ClassId ?? "";

        this.DisciplineId= partial.DisciplineId ?? "";

        this.UserId= partial.UserId ?? "";

    }
}