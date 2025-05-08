import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined, IsDateString} from 'class-validator';

export abstract class DisciplineDto {
    @IsString()
    periodo: String;

    @IsString()
    disciplina: String;

    @IsNumber()
    codigo: Number;

    @IsDateString()
    inicio: Date;

    @IsDateString()
    termino: Date;

    @IsString()
    categoria: String;

    @IsNumber()
    periodoCurricular: Number;

    @IsString()
    estado: String;

    @IsString()
    campus: String;

    @IsString()
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