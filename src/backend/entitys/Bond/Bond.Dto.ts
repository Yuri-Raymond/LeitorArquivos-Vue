import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined, IsDateString, Matches} from 'class-validator';

export abstract class BondDto {  
    @Matches(/^[A-Za-z0-9]+$/, { message: 'Id deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    id: String;
    
    @IsString()
    nome: String;

    @Matches(/^\d{6,12}$/, { message: 'Matrícula deve conter entre 6 e 12 dígitos numéricos.' })
    @IsNumber()
    matricula: Number;

    @IsString()
    turma: String;

    @Matches(/^[A-Za-zÀ-ÿ0-9\s]+$/, { message: 'Disciplina deve conter apenas letras, números e espaços.' })
    @IsString()
    disciplina: String;

    @IsString()
    papel: String;

    @IsDateString()
    inicio: Date;

    @IsDateString()
    termino: Date;

    @IsNumber()
    obs: Number;

    @IsString()
    status: String;

    constructor(partial: Partial<BondDto> = {}) { 
        this.id= partial.id ?? "";

        this.nome= partial.nome ?? "";

        this.matricula= partial.matricula ?? 0;
    
        this.turma= partial.turma ?? "";
    
        this.disciplina= partial.disciplina ?? "";
    
        this.papel= partial.papel ?? "";
    
        this.inicio= partial.inicio ?? new Date();
    
        this.termino= partial.termino ?? new Date();
    
        this.obs= partial.obs ?? 0;
    
        this.status= partial.status ?? "";
    }
}