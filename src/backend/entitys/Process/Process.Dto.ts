import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class ProcessDto {
    id: number;

    idAcademicClass: number;

    idDiscipline: number;

    idDisciplineUser: number;

    idSchoolPeriod: number;

    idUser: number;

    constructor(partial: Partial<ProcessDto> = {}) {
    this.id= partial.id ?? 0;

    this.idAcademicClass= partial.idAcademicClass ?? 0;

    this.idDiscipline= partial.idDiscipline ?? 0;

    this.idDisciplineUser= partial.idDisciplineUser ?? 0;

    this.idSchoolPeriod= partial.idSchoolPeriod ?? 0;

    this.idUser= partial.idUser ?? 0;
    }
}