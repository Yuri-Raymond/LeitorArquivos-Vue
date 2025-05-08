import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsDefined} from 'class-validator';

export abstract class ProcessDto {
    @IsString()
    id: String;

    @IsString()
    BondId: String;

    @IsString()
    ClassId: String;

    @IsString()
    DisciplineId: String;

    @IsString()
    UserId: String;

    constructor(partial: Partial<ProcessDto> = {}) {
    this.id= partial.id ?? "";

    this.BondId= partial.BondId ?? "";

    this.ClassId= partial.ClassId ?? "";

    this.DisciplineId= partial.DisciplineId ?? "";

    this.UserId= partial.UserId ?? "";

    }
}