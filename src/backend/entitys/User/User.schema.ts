// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "users"
export type UserDocument = HydratedDocument<User>;


@Schema({ collection: 'User' })
export class User extends Document{
  @Prop({ type: String})
  nome: String;

  @Prop({ type: String })
  matricula: String;

  @Prop({ type: String})
  email: string;

  @Prop({ type: String})
  curso: String;

  @Prop({ type: String })
  tipo: string;

  @Prop({ type: Date })
  nascimento: Date;

  @Prop({ type: Date })
  cadastro: Date;

  @Prop({ type: String })
  contato: string;

  @Prop({ type: String })
  status: string;
  
  constructor(nome: String, matricula: String, email: string, curso: String, tipo: string, nascimento: Date, cadastro: Date, contato: string, status: string,){
    super();
    
    this.nome= nome;

    this.matricula= matricula;

    this.email= email;

    this.curso= curso;

    this.tipo= tipo;

    this.nascimento= nascimento;

    this.cadastro= cadastro;

    this.contato= contato;

    this.status= status; 
  }
}
export const UserSchema = SchemaFactory.createForClass(User);