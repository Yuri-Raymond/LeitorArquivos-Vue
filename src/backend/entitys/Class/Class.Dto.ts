import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class ClassDto {
    @IsString()
    turma: String;

    @IsString()
    codigo: String;

    @IsString()
    disciplina: String;

    @IsString()
    turno: String;

    @IsNumber()
    capacidade: Number;

    @IsDate()
    inicio: Date;

    @IsDate()
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