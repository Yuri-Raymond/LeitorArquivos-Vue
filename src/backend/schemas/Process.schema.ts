// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ProcessDocument = HydratedDocument<Process>;
@Schema({ timestamps: true })
export class Process {
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
}
export const ProcessSchema = SchemaFactory.createForClass(Process);