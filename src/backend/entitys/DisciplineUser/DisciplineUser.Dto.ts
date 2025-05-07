import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class DisciplineUserDto {
    id: number;

    discipline_id: number;

    user_id: number;  

    team_id: number;   

    temporary: boolean;

    professor: boolean;

    created_at: Date;

    updated_at: Date;

    deleted_at: Date;

    constructor(partial: Partial<DisciplineUserDto> = {}) {
    this.id= partial.id ?? 0;

    this.discipline_id= partial.discipline_id ?? 0;

    this.user_id= partial.user_id ?? 0;

    this.team_id= partial.team_id ?? 0;

    this.temporary= partial.temporary ?? false;

    this.professor= partial.professor ?? false;

    this.created_at= partial.created_at ?? new Date();

    this.updated_at= partial.updated_at ?? new Date();

    this.deleted_at= partial.deleted_at ?? new Date();
    }
}