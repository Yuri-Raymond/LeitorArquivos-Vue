import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class SchoolPeriodDto {
    
    id: number;

    name: string;

    school_period: string;

    start_date: Date;

    final_date: Date;

    created_at: Date;

    updated_at: Date;

    deleted_at: Date;

    constructor(partial: Partial<SchoolPeriodDto> = {}) { 
    this.id= partial.id ?? 0;

    this.name= partial.name ?? "";

    this.school_period= partial.school_period ?? "";

    this.start_date= partial.start_date ?? new Date();

    this.final_date= partial.final_date ?? new Date();

    this.created_at= partial.created_at ?? new Date();

    this.updated_at= partial.updated_at ?? new Date();

    this.deleted_at= partial.deleted_at ?? new Date();
    }
}