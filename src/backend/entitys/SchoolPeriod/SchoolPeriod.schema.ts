// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "school_periods"
export type SchoolPeriodDocument = HydratedDocument<SchoolPeriod>;


@Schema({ collection: 'SchoolPeriod' })
export class SchoolPeriod extends Document{
  @Prop({ type: Number})
  id: number;

  @Prop({ type: String})
  name: string;

  @Prop({ type: String })
  school_period: string;

  @Prop({ type: Date})
  start_date: Date;

  @Prop({ type: Date})
  final_date: Date;

  @Prop({type:Date})
  created_at: Date;

  @Prop({type:Date})
  updated_at: Date;

  @Prop({type:Date})
  deleted_at: Date;

  constructor(id: number, name: string, school_period: string, start_date: Date, final_date: Date, created_at: Date, updated_at: Date, deleted_at: Date){
    super();
    this.id= id;

    this.name= name;

    this.school_period= school_period;

    this.start_date= start_date;

    this.final_date= final_date;

    this.created_at= created_at;

    this.updated_at= updated_at;

    this.deleted_at= deleted_at;
  }
}
export const SchoolPeriodSchema = SchemaFactory.createForClass(SchoolPeriod);