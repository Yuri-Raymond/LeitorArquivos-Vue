import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class DisciplineDto {
    id: number;

    school_period_id: number;

    academic_class_id: number;

    name: string;

    code: string;

    shift: string;

    active: boolean;

    is_exceptional: boolean;

    integration: string;

    created_at: Date;

    updated_at: Date;

    deleted_at: Date;

    constructor(partial: Partial<DisciplineDto> = {}) {

    this.id= partial.id ?? 0;

    this.school_period_id= partial.school_period_id ?? 0;

    this.academic_class_id= partial.academic_class_id ?? 0;

    this.name= partial.name ?? "";

    this.code= partial.code ?? "";

    this.shift= partial.shift ?? "";

    this.active= partial.active ?? false;

    this.is_exceptional= partial.is_exceptional ?? false;

    this.integration= partial.integration ?? "";

    this.created_at= partial.created_at ?? new Date();

    this.updated_at= partial.updated_at ?? new Date();

    this.deleted_at= partial.deleted_at ?? new Date();
    }
}