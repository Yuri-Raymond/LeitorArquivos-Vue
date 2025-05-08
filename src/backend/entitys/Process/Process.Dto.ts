import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsDefined} from 'class-validator';

export abstract class ProcessDto {
    @IsString()
    id: String;

    @IsString()
    idAcademicClass: String;

    @IsString()
    idDiscipline: String;

    @IsString()
    idDisciplineUser: String;

    @IsString()
    idSchoolPeriod: String;

    @IsString()
    idUser: String;

    constructor(partial: Partial<ProcessDto> = {}) {
    this.id= partial.id ?? "";

    this.idAcademicClass= partial.idAcademicClass ?? "";

    this.idDiscipline= partial.idDiscipline ?? "";

    this.idDisciplineUser= partial.idDisciplineUser ?? "";

    this.idSchoolPeriod= partial.idSchoolPeriod ?? "";

    this.idUser= partial.idUser ?? "";
    }
}