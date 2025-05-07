import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class BondDto {  
    nome: string;

    matricula: string;

    turma: String;

    disciplina: String;

    papel: String;

    inicio: Date;

    termino: Date;

    obs: Number;

    status: String;

    constructor(partial: Partial<BondDto> = {}) { 
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