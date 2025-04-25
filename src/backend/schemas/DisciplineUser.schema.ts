// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "discipline_users"
export type DisciplineUserDocument = HydratedDocument<DisciplineUser>;
@Schema({ timestamps: true })
export class DisciplineUser {
  @Prop({ type: Number})
  id: number;

  @Prop({ type: Number})
  discipline_id: number;

  @Prop({ type: Number})
  user_id: number;

  @Prop({ type: Number })
  team_id: number;

  @Prop({ type: Boolean})
  temporary: boolean;

  @Prop({ type: Boolean})
  professor: boolean;

  @Prop({type:Date})
  created_at: Date;

  @Prop({type:Date})
  updated_at: Date;

  @Prop({type:Date})
  deleted_at: Date;
}
export const DisciplineUserSchema = SchemaFactory.createForClass(DisciplineUser);