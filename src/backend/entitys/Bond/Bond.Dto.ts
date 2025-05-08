import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class BondDto {  
    @IsString()
    id: string;
    
    @IsString()
    nome: string;

    @IsString()
    matricula: string;

    @IsString()
    turma: String;

    @IsString()
    disciplina: String;

    @IsString()
    papel: String;

    @IsDate()
    inicio: Date;

    @IsDate()
    termino: Date;

    @IsNumber()
    obs: Number;

    @IsString()
    status: String;

    constructor(partial: Partial<BondDto> = {}) { 
        this.id= partial.id ?? "";

        this.nome= partial.nome ?? "";

        this.matricula= partial.matricula ?? "";
    
        this.turma= partial.turma ?? "";
    
        this.disciplina= partial.disciplina ?? "";
    
        this.papel= partial.papel ?? "";
    
        this.inicio= partial.inicio ?? new Date();
    
        this.termino= partial.termino ?? new Date();
    
        this.obs= partial.obs ?? 0;
    
        this.status= partial.status ?? "";
    }
}