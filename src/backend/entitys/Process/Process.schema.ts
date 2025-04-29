// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ProcessDocument = HydratedDocument<Process>;


@Schema({ collection: 'Process' })
export class Process extends Document{
  @Prop({ type: Number})
  id: number;

  @Prop({ type: Number})
  idAcademicClass: number;

  @Prop({ type: Number})
  idDiscipline: number;

  @Prop({ type: Number})
  idDisciplineUser: number;

  @Prop({ type: Number})
  idSchoolPeriod: number;

  @Prop({ type: Number})
  idUser: number;

  constructor(id: number, idAcademicClass: number, idDiscipline: number, idDisciplineUser: number, idSchoolPeriod: number, idUser: number){
    super();

    this.id= id;

    this.idAcademicClass= idAcademicClass;

    this.idDiscipline= idDiscipline;

    this.idDisciplineUser= idDisciplineUser;

    this.idSchoolPeriod= idSchoolPeriod;

    this.idUser= idUser;
  }
}
export const ProcessSchema = SchemaFactory.createForClass(Process);