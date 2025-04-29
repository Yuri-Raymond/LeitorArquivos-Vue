// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "disciplines"
export type DisciplineDocument = HydratedDocument<Discipline>;


@Schema({collection: 'Discipline' })
export class Discipline extends Document{
  @Prop({ type: Number})
  id: number;

  @Prop({ type: Number})
  school_period_id: number;

  @Prop({ type: Number})
  academic_class_id: number;

  @Prop({ type: String})
  name: string;

  @Prop({ type: String})
  code: string;

  @Prop({ type: String })
  shift: string;

  @Prop({ type: Boolean})
  active: boolean;

  @Prop({ type: Boolean})
  is_exceptional: boolean;

  @Prop({ type: String })
  integration: string;

  @Prop({type:Date})
  created_at: Date;

  @Prop({type:Date})
  updated_at: Date;

  @Prop({type:Date})
  deleted_at: Date;

  constructor(id: number, school_period_id: number, academic_class_id: number, name: string, code: string, shift: string, active: boolean, is_exceptional: boolean, integration: string, created_at: Date, updated_at: Date, deleted_at: Date){
    super();

    this.id= id;

    this.school_period_id= school_period_id;

    this.academic_class_id= academic_class_id;

    this.name= name;

    this.code= code;

    this.shift= shift;

    this.active= active;

    this.is_exceptional= is_exceptional;

    this.integration= integration;

    this.created_at= created_at;

    this.updated_at= updated_at;

    this.deleted_at= deleted_at;
  }
}
export const DisciplineSchema = SchemaFactory.createForClass(Discipline);