// src/entity/Pessoa.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string; // Nome completo

  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string; // CPF (Cadastro de Pessoa Física)

  @Column({ type: 'varchar', length: 20, unique: true })
  rg: string; // RG (Registro Geral)

  @Column({ type: 'date' })
  dataNascimento: Date; // Data de nascimento

  @Column({ type: 'varchar', length: 20, unique: true })
  numeroCarteiraTrabalho?: string; // Número da carteira de trabalho(opcional)

  @Column({ type: 'varchar', length: 100, unique: true })
  email?: string; // E-mail (deve ser único)(opcional)

  @Column({ type: 'date' })
  dataAdmissao?: Date; // Data da admissão(opcional)

  @Column({ type: 'varchar', length: 50, nullable: true })
  nomeMae?: string; // Nome da mãe (opcional)

  @Column({ type: 'varchar', length: 50, nullable: true })
  nomePai?: string; // Nome do pai (opcional)

  @Column({ type: 'varchar', length: 100, nullable: true })
  endereco?: string; // Endereço (opcional)

  @Column({ type: 'varchar', length: 15, nullable: true })
  telefone?: string; // Telefone (opcional)

  @Column({ type: 'varchar', length: 20, nullable: true })
  estadoCivil?: string; // Estado civil (opcional)

  @Column({ type: 'varchar', length: 50, nullable: true })
  funcao?: string; // Função no trabalho (opcional)

  @Column({ type: 'varchar', length: 10, nullable: true })
  genero?: string; // Gênero (opcional)

  @Column({ type: 'varchar', length: 15, nullable: true })
  celular?: string; // Celular (opcional)

  @CreateDateColumn({ type: 'timestamp' })
  criadoEm: Date; // Data de criação do registro

  @UpdateDateColumn({ type: 'timestamp' })
  atualizadoEm: Date; // Data da última atualização
}
