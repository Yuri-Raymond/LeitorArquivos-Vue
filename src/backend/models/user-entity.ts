import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class User {
  @ObjectIdColumn()
  id!: ObjectId;  // Usando o operador '!' para garantir que o valor será atribuído

  @Column()
  name!: string;  // Usando o operador '!' para garantir que o valor será atribuído

  @Column()
  email!: string;  // Usando o operador '!' para garantir que o valor será atribuído

  @Column({ default: 'user' })
  role: string = 'user';  // Inicialização direta com valor padrão

  @Column({ nullable: true })
  age?: number;  // O campo age é opcional

  // Adicione mais campos conforme necessário
}
