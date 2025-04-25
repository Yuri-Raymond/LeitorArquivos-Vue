// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "academic_classes"
export type AcademicClassDocument = HydratedDocument<AcademicClass>;
@Schema({ timestamps: true })
export class AcademicClass {
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
}
export const AcademicClassSchema = SchemaFactory.createForClass(AcademicClass);
