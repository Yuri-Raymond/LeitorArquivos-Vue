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
  BondMtr: String;

  @Prop({ type: String})
  ClassCode: String;

  @Prop({ type: String})
  DisciplineCode: String;

  @Prop({ type: Number})
  UserMtr: Number;

  @Prop({ type: Date})
  DataInicio: Date;

  @Prop({ type: Date})
  DataTermino: Date;

  @Prop({ type: String})
  periodoInicio: String;

  @Prop({ type: String})
  periodoTermino: String;

  @Prop({ type: String})
  StatusEnvio: String;

  @Prop({ type: String})
  Acoes: String;

  @Prop({ type: String})
  UserId: String;

  constructor(id: String, BondMtr: String, ClassCode: String, DisciplineCode: String, UserMtr: Number, DataInicio: Date, DataTermino: Date, StatusEnvio: String,
    Acoes: String){
    super();

    this.id= id;

    this.BondMtr= BondMtr;

    this.ClassCode= ClassCode;

    this.DisciplineCode= DisciplineCode;

    this.UserMtr= UserMtr;

    this.DataInicio= DataInicio;

    this.DataTermino= DataTermino;

    this.StatusEnvio= StatusEnvio;

    this.Acoes= Acoes;
  }
}
export const ProcessSchema = SchemaFactory.createForClass(Process);