import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class DisciplineDto {
    periodo: String;

    disciplina: String;

    codigo: number;

    inicio: Date;

    termino: Date;

    categoria: string;

    periodoCurricular: Number;

    estado: String;

    campus: string;

    status: String;

    constructor(partial: Partial<DisciplineDto> = {}) {

        this.periodo= partial.periodo ?? "";

        this.disciplina= partial.disciplina ?? "";
    
        this.codigo= partial.codigo ?? 0;
    
        this.inicio= partial.inicio ?? new Date();
    
        this.termino= partial.termino ?? new Date();
    
        this.categoria= partial.categoria ?? "";
    
        this.periodoCurricular= partial.periodoCurricular ?? 0;
    
        this.estado= partial.estado ?? "";
    
        this.campus= partial.campus ?? "";
    
        this.status= partial.status ?? "";
    }
}