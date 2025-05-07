import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class AcademicClassDto {
   // @IsUUID('4', { message: 'ID deve ser um UUID válido' })
   @IsNumber({}, {message: "O ID deve ser um número"}) 
   @IsNotEmpty()
   @IsDefined()
    id: number;

    @IsNumber({}, {message: "O Período Escolar deve ser um número"}) 
    @IsNotEmpty()
    school_period_id: number;

    @IsString({message: "O Nome deve ser uma String"})
    name: string;

    @IsString({message: "O Código deve ser uma String"})
    code: string;

    @IsDate()
    start_date: Date;

    @IsDate()
    end_date: Date;

    @IsString({message: "A Categoria deve ser uma String"})
    @IsNotEmpty()
    category: string;

    @IsString({message: "O Curso deve ser uma String"})
    course: string;

    active: boolean;

    is_exceptional: boolean;

    @IsString({message: "O Período deve ser uma String"})
    period: string;

    @IsNumber({}, {message: "O Campus_Id deve ser um número"}) 
    campus_id: number;

    @IsString({message: "A integração deve ser uma String"})
    integration: string;

    @IsDate()
    created_at: Date;

    @IsDate()
    updated_at: Date;

    @IsDate()
    deleted_at: Date;

    constructor(partial: Partial<AcademicClassDto> = {}) {
        this.id= partial.id ?? 0;

        this.school_period_id= partial.school_period_id ?? 0;

        this.name= partial.name ?? '';

        this.code= partial.code ?? '';

        this.start_date= partial.start_date ?? new Date();

        this.end_date= partial.end_date ?? new Date();

        this.category= partial.category ?? '';

        this.course= partial.course ?? '';

        this.active= partial.active ?? false;

        this.is_exceptional= partial.is_exceptional ?? false;

        this.period= partial.period ?? '';

        this.campus_id= partial.campus_id ?? 0;

        this.integration= partial.integration ?? '';

        this.created_at= partial.created_at ?? new Date();

        this.updated_at= partial.updated_at ?? new Date();

        this.deleted_at= partial.deleted_at ?? new Date();
    }
}


