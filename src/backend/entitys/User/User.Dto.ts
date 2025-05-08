import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class UserDto {
  @IsString()
  id: String;
  
  @IsString()
  nome: String;

  @IsString()
  matricula: String;

  @IsString()
  email: String;

  @IsString()
  curso: String;

  @IsString()
  tipo: String;

  @IsString()
  nascimento: Date;

  @IsDate()
  cadastro: Date;

  @IsDate()
  contato: String;

  @IsString()
  status: String;

  constructor(partial: Partial<UserDto> = {}) {     
    this.id= partial.id ?? "";
    
    this.nome= partial.nome ?? "";

    this.matricula= partial.matricula ?? "";

    this.email= partial.email ?? "";

    this.curso= partial.curso ?? "";

    this.tipo= partial.tipo ?? "";

    this.nascimento= partial.nascimento ?? new Date();

    this.cadastro= partial.cadastro ?? new Date();

    this.contato= partial.contato ?? "";

    this.status= partial.status ?? "";    
  }
}