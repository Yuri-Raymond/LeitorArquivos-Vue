import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class UserDto {
  id: number;

  id_old_bonsae: number;

  id_audora: number;

  profile_id: number;

  active: boolean;

  name: string;

  registration_number: string;

  email: string;

  receive_emails: boolean;

  gmail: string;

  gcalendar_credentials: string;

  approve_api: string;

  approve_msg: string;

  telephone: string;

  password: string;

  cpf: string;

  period_id: number;

  oab: string;

  oab_uf: string;

  workload_real: string;

  workload_simulated: string;

  observations: string;

  profile_pic: string;

  course: string;

  course_id: number;

  is_admin: boolean;

  remember_token: string;

  access_token: string;

  browser_agent: string;

  date_accept: Date;

  last_login: Date;

  last_logout: Date;

  logged_time: string;

  all_time_logged: string;

  average_logged_time: string;

  times_active: number;

  ip: string;

  permission: boolean;

  integration: string;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date;

    constructor(partial: Partial<UserDto> = {}) {     
    this.id= partial.id ?? 0;

    this.id_old_bonsae= partial.id_old_bonsae ?? 0;

    this.id_audora= partial.id_audora ?? 0;

    this.profile_id= partial.profile_id ?? 0;

    this.active= partial.active ?? false;

    this.name= partial.name ?? "";

    this.registration_number= partial.registration_number ?? "";

    this.email= partial.email ?? "";

    this.receive_emails= partial.receive_emails ?? false;

    this.gmail= partial.gmail ?? "";

    this.gcalendar_credentials= partial.gcalendar_credentials ?? "";

    this.approve_api= partial.approve_api ?? "";

    this.approve_msg= partial.approve_msg ?? "";

    this.telephone= partial.telephone ?? "";

    this.password= partial.password ?? "";

    this.cpf= partial.cpf ?? "";

    this.period_id= partial.period_id ?? 0;

    this.oab= partial.oab ?? "";

    this.oab_uf= partial.oab_uf ?? "";

    this.workload_real= partial.workload_real ?? "";

    this.workload_simulated= partial.workload_simulated ?? "";

    this.observations= partial.observations ?? "";

    this.profile_pic= partial.profile_pic ?? "";

    this.course= partial.course ?? "";

    this.course_id= partial.course_id ?? 0;

    this.is_admin= partial.is_admin ?? false;

    this.remember_token= partial.remember_token ?? "";

    this.access_token= partial.access_token ?? "";

    this.browser_agent= partial.browser_agent ?? "";

    this.date_accept= partial.date_accept ?? new Date();

    this.last_login= partial.last_login ?? new Date();

    this.last_logout= partial.last_logout ??  new Date();

    this.logged_time= partial.logged_time ?? "";

    this.all_time_logged= partial.all_time_logged ?? "";

    this.average_logged_time= partial.average_logged_time ?? "";

    this.times_active= partial.times_active ?? 0;

    this.ip= partial.ip ?? "";

    this.permission= partial.permission ?? false;

    this.integration= partial.integration ?? "";

    this.created_at= partial.created_at ??  new Date();

    this.updated_at= partial.updated_at ??  new Date();

    this.deleted_at= partial.deleted_at ??  new Date();   
    }
}