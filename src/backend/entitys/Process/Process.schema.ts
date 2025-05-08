// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ProcessDocument = HydratedDocument<Process>;


@Schema({ collection: 'Process' })
export class Process extends Document{
  @Prop({ type: String})
  id: String;

  @Prop({ type: String})
  BondID: String;

  @Prop({ type: String})
  ClassId: String;

  @Prop({ type: String})
  Discipline: String;

  @Prop({ type: String})
  UserId: String;

  constructor(id: String, BondID: String, ClassId: String, Discipline: String, UserId: String){
    super();

    this.id= id;

    this.BondID= BondID;

    this.ClassId= ClassId;

    this.Discipline= Discipline;

    this.UserId= UserId;
  }
}
export const ProcessSchema = SchemaFactory.createForClass(Process);