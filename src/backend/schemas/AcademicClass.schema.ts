// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "academic_classes"
export type AcademicClassDocument = HydratedDocument<AcademicClass>;
@Schema({ timestamps: true })
export class AcademicClass extends Document{
  @Prop({ type: Number})
  id: number;

  @Prop({ type: Number})
  school_period_id: number;

  @Prop({ type: String})
  name: string;

  @Prop({ type: String })
  code: string;

  @Prop({ type: Date })
  start_date: Date;

  @Prop({ type: Date })
  end_date: Date;

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  course: string;

  @Prop({ type: Boolean})
  active: boolean;

  @Prop({ type: Boolean })
  is_exceptional: boolean;

  @Prop({ type: String })
  period: string;

  @Prop({ type: Number })
  campus_id: number;

  @Prop({ type: String })
  integration: string;

  @Prop({type:Date})
  created_at: Date;

  @Prop({type:Date})
  updated_at: Date;

  @Prop({type:Date})
  deleted_at: Date;

  constructor(id: number, school_period_id: number, name: string, code: string, start_date: Date, end_date: Date, category: string, course: string, active: boolean, is_exceptional: boolean, period: string, campus_id: number, integration: string, created_at: Date, updated_at: Date, deleted_at: Date){
    super();

    this.id= id;

    this.school_period_id= school_period_id;

    this.name= name;

    this.code= code;

    this.start_date= start_date;

    this.end_date= end_date;

    this.category= category;

    this.course= course;

    this.active= active;

    this.is_exceptional= is_exceptional;

    this.period= period;

    this.campus_id= campus_id;

    this.integration= integration;

    this.created_at= created_at;

    this.updated_at= updated_at;

    this.deleted_at= deleted_at;
  }
}
export const AcademicClassSchema = SchemaFactory.createForClass(AcademicClass);
