// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsDateString, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ProcessDocument = HydratedDocument<Process>;


@Schema({ collection: 'Process' })
export class Process extends Document{
  @Prop({ type: String})
  id: String;

  @Prop({ type: String})
  BondId: String;

  @Prop({ type: String})
  ClassId: String;

  @Prop({ type: String})
  DisciplineId: String;

  @Prop({ type: Number})
  UserMtr: Number;

  @Prop({ type: Date})
  DataInicio: Date;

  @Prop({ type: Date})
  DataTermino: Date;

  @Prop({ type: String})
  StatusEnvio: String;

  @Prop({ type: String})
  Acoes: String;

  constructor(id: String, BondId: String, ClassId: String, DisciplineId: String, UserMtr: Number, DataInicio: Date, DataTermino: Date, StatusEnvio: String,
    Acoes: String){
    super();

    this.id= id;

    this.BondId= BondId;

    this.ClassId= ClassId;

    this.DisciplineId= DisciplineId;

    this.UserMtr= UserMtr;

    this.DataInicio= DataInicio;

    this.DataTermino= DataTermino;

    this.StatusEnvio= StatusEnvio;

    this.Acoes= Acoes;
  }
}
export const ProcessSchema = SchemaFactory.createForClass(Process);