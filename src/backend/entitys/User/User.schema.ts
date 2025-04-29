// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "users"
export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User extends Document{
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

  
  constructor(id: number,

    id_old_bonsae: number,

    id_audora: number,

    profile_id: number,

    active: boolean,

    name: string,

    registration_number: string,

    email: string,

    receive_emails: boolean,

    gmail: string,

    gcalendar_credentials: string,

    approve_api: string,

    approve_msg: string,

    telephone: string,

    password: string,

    cpf: string,

    period_id: number,

    oab: string,

    oab_uf: string,

    workload_real: string,

    workload_simulated: string,

    observations: string,

    profile_pic: string,

    course: string,

    course_id: number,

    is_admin: boolean,

    remember_token: string,

    access_token: string,

    browser_agent: string,

    date_accept: Date,

    last_login: Date,

    last_logout: Date,

    logged_time: string,

    all_time_logged: string,

    average_logged_time: string,

    times_active: number,

    ip: string,

    permission: boolean,

    integration: string,

    created_at: Date,

    updated_at: Date,

    deleted_at: Date){
    super();
    
    this.id= id;

    this.id_old_bonsae= id_old_bonsae;

    this.id_audora= id_audora;

    this.profile_id= profile_id;

    this.active= active;

    this.name= name;

    this.registration_number= registration_number;

    this.email= email;

    this.receive_emails= receive_emails;

    this.gmail= gmail;

    this.gcalendar_credentials= gcalendar_credentials;

    this.approve_api= approve_api;

    this.approve_msg= approve_msg;

    this.telephone= telephone;

    this.password= password;

    this.cpf= cpf;

    this.period_id= period_id;

    this.oab= oab;

    this.oab_uf= oab_uf;

    this.workload_real= workload_real;

    this.workload_simulated= workload_simulated;

    this.observations= observations;

    this.profile_pic= profile_pic;

    this.course= course;

    this.course_id= course_id;

    this.is_admin= is_admin;

    this.remember_token= remember_token;

    this.access_token= access_token;

    this.browser_agent= browser_agent;

    this.date_accept= date_accept;

    this.last_login= last_login;

    this.last_logout= last_logout;

    this.logged_time= logged_time;

    this.all_time_logged= all_time_logged;

    this.average_logged_time= average_logged_time;

    this.times_active= times_active;

    this.ip= ip;

    this.permission= permission;

    this.integration= integration;

    this.created_at= created_at;

    this.updated_at= updated_at;

    this.deleted_at= deleted_at;
    
  }
    

}
export const UserSchema = SchemaFactory.createForClass(User);