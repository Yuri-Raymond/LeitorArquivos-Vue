import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined, IsDateString, Matches} from 'class-validator';

export abstract class UserDto {
  @IsString()
  nome: String;

  @Matches(/^\d{6,12}$/, { message: 'Matrícula deve conter entre 6 e 12 dígitos numéricos.' })
  @IsNumber()
  matricula: Number;

  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'E-mail deve estar em um formato válido.' })
  @IsString()
  email: String;

  @IsString()
  curso: String;

  @IsString()
  tipo: String;

  @IsDateString()
  nascimento: Date;

  @IsDateString()
  cadastro: Date;

  @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Contato deve ser um número de telefone válido ou um e-mail válido.' })
  @IsString()
  contato: String;

  @IsString()
  status: String;

  constructor(partial: Partial<UserDto> = {}) {
    this.nome= partial.nome ?? "";

    this.matricula= partial.matricula ?? 0;

    this.email= partial.email ?? "";

    this.curso= partial.curso ?? "";

    this.tipo= partial.tipo ?? "";

    this.nascimento= partial.nascimento ?? new Date();

    this.cadastro= partial.cadastro ?? new Date();

    this.contato= partial.contato ?? "";

    this.status= partial.status ?? "";    
  }
}