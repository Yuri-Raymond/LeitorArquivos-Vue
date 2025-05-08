import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsDefined, Matches, IsNumber} from 'class-validator';

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
    UserId: Number;

    constructor(partial: Partial<ProcessDto> = {}) {
        this.id= partial.id ?? "";

        this.BondId= partial.BondId ?? "";

        this.ClassId= partial.ClassId ?? "";

        this.DisciplineId= partial.DisciplineId ?? "";

        this.UserId= partial.UserId ?? 0;

    }
}