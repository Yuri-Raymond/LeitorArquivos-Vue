// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Schema para a tabela "academic_classes"
@Schema({ timestamps: true })
export class AcademicClass extends Document {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: Number, required: true })
  school_period_id: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: Date, required: true })
  start_date: Date;

  @Prop({ type: Date, required: true })
  end_date: Date;

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  course: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: Boolean, default: false })
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

// Schema para a tabela "disciplines"
@Schema({ timestamps: true })
export class Discipline extends Document {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: Number, required: true })
  school_period_id: number;

  @Prop({ type: Number, required: true })
  academic_class_id: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String })
  shift: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: Boolean, default: false })
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

// Schema para a tabela "discipline_users"
@Schema({ timestamps: true })
export class DisciplineUser extends Document {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: Number, required: true })
  discipline_id: number;

  @Prop({ type: Number, required: true })
  user_id: number;

  @Prop({ type: Number })
  team_id: number;

  @Prop({ type: Boolean, default: false })
  temporary: boolean;

  @Prop({ type: Boolean, default: false })
  professor: boolean;

  @Prop({type:Date})
  created_at: Date;

  @Prop({type:Date})
  updated_at: Date;

  @Prop({type:Date})
  deleted_at: Date;
}
export const DisciplineUserSchema = SchemaFactory.createForClass(DisciplineUser);

// Schema para a tabela "school_periods"
@Schema({ timestamps: true })
export class SchoolPeriod extends Document {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  school_period: string;

  @Prop({ type: Date, required: true })
  start_date: Date;

  @Prop({ type: Date, required: true })
  final_date: Date;

  @Prop({type:Date})
  created_at: Date;

  @Prop({type:Date})
  updated_at: Date;

  @Prop({type:Date})
  deleted_at: Date;
}
export const SchoolPeriodSchema = SchemaFactory.createForClass(SchoolPeriod);

// Schema para a tabela "users"
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: Number })
  id_old_bonsae: number;

  @Prop({ type: Number })
  id_audora: number;

  @Prop({ type: Number, required: true })
  profile_id: number;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  registration_number: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: Boolean, default: false })
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

  @Prop({ type: String, required: true })
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

  @Prop({ type: Boolean, default: false })
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

  @Prop({ type: Boolean, default: false })
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
