// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "discipline_users"
export type DisciplineUserDocument = HydratedDocument<DisciplineUser>;


@Schema({ collection: 'DisciplineUser' })
export class DisciplineUser extends Document{
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

  constructor(id: number, discipline_id: number, user_id: number, team_id: number, temporary: boolean, professor: boolean, created_at: Date, updated_at: Date, deleted_at: Date){
    super();

    this.id= id;

    this.discipline_id= discipline_id;

    this.user_id= user_id;


    this.team_id= team_id;

    this.temporary= temporary;

    this.professor= professor;

    this.created_at= created_at;

    this.updated_at= updated_at;

    this.deleted_at= deleted_at;
  }
}
export const DisciplineUserSchema = SchemaFactory.createForClass(DisciplineUser);