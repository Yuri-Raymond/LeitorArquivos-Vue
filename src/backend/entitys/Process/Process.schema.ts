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
  BondId: String;

  @Prop({ type: String})
  ClassId: String;

  @Prop({ type: String})
  DisciplineId: String;

  @Prop({ type: String})
  UserId: String;

  constructor(id: String, BondId: String, ClassId: String, DisciplineId: String, UserId: String){
    super();

    this.id= id;

    this.BondId= BondId;

    this.ClassId= ClassId;

    this.DisciplineId= DisciplineId;

    this.UserId= UserId;
  }
}
export const ProcessSchema = SchemaFactory.createForClass(Process);