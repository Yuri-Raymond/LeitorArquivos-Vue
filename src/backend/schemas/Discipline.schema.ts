// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "disciplines"
export type DisciplineDocument = HydratedDocument<Discipline>;
@Schema({ timestamps: true })
export class Discipline {
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
}
export const DisciplineSchema = SchemaFactory.createForClass(Discipline);