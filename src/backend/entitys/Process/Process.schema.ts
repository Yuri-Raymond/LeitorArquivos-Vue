// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ProcessDocument = HydratedDocument<Process>;


@Schema({ collection: 'Process' })
export class Process extends Document{
  @Prop({ type: String, unique: true})
  id: String;

  @Prop({ type: String})
  periodoInicio: String;

  @Prop({ type: String})
  periodoTermino: String;

  @Prop({ type: Date})
  inicio: Date;

  @Prop({ type: Date})
  termino: Date;

  @Prop({ type: String})
  BondId: String;

  @Prop({ type: String})
  ClassId: String;

  @Prop({ type: String})
  DisciplineId: String;

  @Prop({ type: String})
  UserId: String;

  constructor(id: String, periodoInicio:String, periodoTermino:String, inicio:Date, termino:Date, BondId: String, ClassId: String, DisciplineId: String, UserId: String){
    super();

    this.id= id;

    this.periodoInicio= periodoInicio;

    this.periodoTermino= periodoTermino;

    this.inicio= inicio;

    this.termino= termino;

    this.BondId= BondId;

    this.ClassId= ClassId;

    this.DisciplineId= DisciplineId;

    this.UserId= UserId;
  }
}
export const ProcessSchema = SchemaFactory.createForClass(Process);