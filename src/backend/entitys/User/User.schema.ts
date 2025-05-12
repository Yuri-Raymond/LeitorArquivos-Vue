// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "users"
export type UserDocument = HydratedDocument<User>;


@Schema({ collection: 'User' })
export class User extends Document{
  @Prop({ type: String })
  matricula: String;
  
  @Prop({ type: String})
  nome: String;

  @Prop({ type: String})
  email: String;

  @Prop({ type: String})
  curso: String;

  @Prop({ type: String })
  tipo: String;

  @Prop({ type: Date })
  nascimento: Date;

  @Prop({ type: Date })
  cadastro: Date;

  @Prop({ type: String })
  contato: String;

  @Prop({ type: String })
  status: String;
  
  constructor(matricula: String, nome: String, email: String, curso: String, tipo: String, nascimento: Date, cadastro: Date, contato: String, status: String,){
    super();
    
    this.matricula= matricula;

    this.nome= nome;
    
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