import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined, IsDateString, Matches} from 'class-validator';

export abstract class ClassDto {
    @IsString()
    turma: String;

    @Matches(/^[A-Za-z0-9]+$/, { message: 'Código deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    codigo: String;

    @Matches(/^[A-Za-zÀ-ÿ0-9\s]+$/, { message: 'Disciplina deve conter apenas letras, números e espaços.' })
    @IsString()
    disciplina: String;

    @IsString()
    turno: String;

    @IsNumber()
    capacidade: Number;

    @IsDateString()
    inicio: Date;

    @IsDateString()
    termino: Date;

    @IsString()
    professor: String;

    @IsString()
    status: String;

    constructor(partial: Partial<ClassDto> = {}) {
        this.turma= partial.turma ?? "";

        this.codigo= partial.codigo ?? "";
    
        this.disciplina= partial.disciplina ?? "";
    
        this.turno= partial.turno ?? "";
    
        this.capacidade= partial.capacidade ?? 0;
    
        this.inicio= partial.inicio ?? new Date();
    
        this.termino= partial.termino ?? new Date();
    
        this.professor= partial.professor ?? "";
    
        this.status= partial.status ?? "";
    }
}