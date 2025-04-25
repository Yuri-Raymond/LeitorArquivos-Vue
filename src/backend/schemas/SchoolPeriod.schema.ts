// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "school_periods"
export type SchoolPeriodDocument = HydratedDocument<SchoolPeriod>;
@Schema({ timestamps: true })
export class SchoolPeriod {
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
}
export const SchoolPeriodSchema = SchemaFactory.createForClass(SchoolPeriod);