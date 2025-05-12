// Importando os módulos necessários
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

// Schema para a tabela "discipline_users"
export type ClassDocument = HydratedDocument<Class>;


@Schema({ collection: 'Class' })
export class Class extends Document{
  @Prop({ type: String})
  codigo: String;

  @Prop({ type: String})
  turma: String;

  @Prop({ type: String })
  disciplina: String;

  @Prop({ type: String})
  turno: String;

  @Prop({ type: Number})
  capacidade: Number;

  @Prop({type:Date})
  inicio: Date;

  @Prop({type:Date})
  termino: Date;

  @Prop({type:String})
  professor: String;

  @Prop({type:String})
  status: String;

  constructor( codigo: String,turma: String, disciplina: String, turno: String, capacidade: Number, inicio: Date, termino: Date, professor: String, status: String){
    super();

    this.codigo= codigo;

    this.turma= turma;

    this.disciplina= disciplina;

    this.turno= turno;

    this.capacidade= capacidade;

    this.inicio= inicio;

    this.termino= termino;

    this.professor= professor;

    this.status= status;
    
  }
}
export const ClassSchema = SchemaFactory.createForClass(Class);