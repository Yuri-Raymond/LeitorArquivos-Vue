import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined} from 'class-validator';

export abstract class UserDto {
  nome: String;

  matricula: String;

  email: string;

  curso: String;

  tipo: string;

  nascimento: Date;

  cadastro: Date;

  contato: string;

  status: string;

    constructor(partial: Partial<UserDto> = {}) {     
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