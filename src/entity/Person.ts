// src/entity/Person.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.persons)
  user: User;

  @Column()
  userId: number; // Adicione esta coluna para armazenar o ID do usuário

  @Column()
  nome: string;

  @Column({ nullable: true })
  cpf?: string;

  @Column({ nullable: true })
  rg?: string;

  @Column({ nullable: true })
  dataNascimento?: Date;

  @Column({ nullable: true })
  numeroCarteiraTrabalho?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  dataAdmissao?: Date;

  @Column({ nullable: true })
  nomeMae?: string;

  @Column({ nullable: true })
  nomePai?: string;

  @Column({ nullable: true })
  endereco?: string;

  @Column({ nullable: true })
  telefone?: string;

  @Column({ nullable: true })
  estadoCivil?: string;

  @Column({ nullable: true })
  funcao?: string;

  @Column({ nullable: true })
  genero?: string;

  @Column({ nullable: true })
  celular?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
