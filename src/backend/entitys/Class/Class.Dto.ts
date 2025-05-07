import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class ClassDto {
    turma: String;

    codigo: String;

    disciplina: String;

    turno: String;

    capacidade: Number;

    inicio: Date;

    termino: Date;

    professor: String;

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