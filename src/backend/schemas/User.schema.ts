// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "users"
export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop({ type: Number})
  id: number;

  @Prop({ type: Number })
  id_old_bonsae: number;

  @Prop({ type: Number })
  id_audora: number;

  @Prop({ type: Number})
  profile_id: number;

  @Prop({ type: Boolean})
  active: boolean;

  @Prop({ type: String})
  name: string;

  @Prop({ type: String})
  registration_number: string;

  @Prop({ type: String})
  email: string;

  @Prop({ type: Boolean})
  receive_emails: boolean;

  @Prop({ type: String })
  gmail: string;

  @Prop({ type: String })
  gcalendar_credentials: string;

  @Prop({ type: String })
  approve_api: string;

  @Prop({ type: String })
  approve_msg: string;

  @Prop({ type: String })
  telephone: string;

  @Prop({ type: String})
  password: string;

  @Prop({ type: String })
  cpf: string;

  @Prop({ type: Number })
  period_id: number;

  @Prop({ type: String })
  oab: string;

  @Prop({ type: String })
  oab_uf: string;

  @Prop({ type: String })
  workload_real: string;

  @Prop({ type: String })
  workload_simulated: string;

  @Prop({ type: String })
  observations: string;

  @Prop({ type: String })
  profile_pic: string;

  @Prop({ type: String })
  course: string;

  @Prop({ type: Number })
  course_id: number;

  @Prop({ type: Boolean})
  is_admin: boolean;

  @Prop({ type: String })
  remember_token: string;

  @Prop({ type: String })
  access_token: string;

  @Prop({ type: String })
  browser_agent: string;

  @Prop({ type: Date })
  date_accept: Date;

  @Prop({ type: Date })
  last_login: Date;

  @Prop({ type: Date })
  last_logout: Date;

  @Prop({ type: String })
  logged_time: string;

  @Prop({ type: String })
  all_time_logged: string;

  @Prop({ type: String })
  average_logged_time: string;

  @Prop({ type: Number })
  times_active: number;

  @Prop({ type: String })
  ip: string;

  @Prop({ type: Boolean})
  permission: boolean;

  @Prop({ type: String })
  integration: string;

  @Prop({type:Date})
  created_at: Date;

  @Prop({type:Date})
  updated_at: Date;

  @Prop({type:Date})
  deleted_at: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);