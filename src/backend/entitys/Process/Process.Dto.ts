import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsDefined, Matches, IsNumber, IsDateString} from 'class-validator';

export abstract class ProcessDto {
    @Matches(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    id: String;

    @Matches(/^[A-Za-z0-9]+$/, { message: 'Código do vínculo deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    BondId: String;

    @Matches(/^[A-Za-z0-9]+$/, { message: 'Código da turma deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    ClassId: String;

    @Matches(/^[A-Za-z0-9]+$/, { message: 'Código da disciplina deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    DisciplineId: String;

    @Matches(/^\d{6,12}$/, { message: 'Matrícula deve conter entre 6 e 12 dígitos numéricos.' })
    @IsNumber()
    UserMtr: Number;

    @IsDateString()
    DataInicio: Date;

    @IsDateString()
    DataTermino: Date;

    @IsString()
    StatusEnvio: String;

    @IsString()
    Acoes: String;

    constructor(partial: Partial<ProcessDto> = {}) {
        this.id= partial.id ?? "";

        this.BondId= partial.BondId ?? "";

        this.ClassId= partial.ClassId ?? "";

        this.DisciplineId= partial.DisciplineId ?? "";

        this.UserMtr= partial.UserMtr ?? 0;

        this.DataInicio= partial.DataInicio ?? new Date();

        this.DataTermino= partial.DataTermino ?? new Date();

        this.StatusEnvio= partial.StatusEnvio ?? "";

        this.Acoes= partial.Acoes ?? "";

    }
}