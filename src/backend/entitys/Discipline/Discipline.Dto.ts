import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined, IsDateString, Matches} from 'class-validator';

export abstract class DisciplineDto {
    @IsString()
    periodo: String;

    @Matches(/^[A-Za-zÀ-ÿ0-9\s]+$/, { message: 'Disciplina deve conter apenas letras, números e espaços.' })
    @IsString()
    disciplina: String;

    @Matches(/^[A-Za-z0-9]+$/, { message: 'Código deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    codigo: String;

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
    
        this.codigo= partial.codigo ?? "";
    
        this.inicio= partial.inicio ?? new Date();
    
        this.termino= partial.termino ?? new Date();
    
        this.categoria= partial.categoria ?? "";
    
        this.periodoCurricular= partial.periodoCurricular ?? 0;
    
        this.estado= partial.estado ?? "";
    
        this.campus= partial.campus ?? "";
    
        this.status= partial.status ?? "";
    }
}