// src/entity/Person.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string; // Nome completo

  @Column({nullable: true})
  cpf?: string; // CPF (Cadastro de Pessoa Física) (opcional)

  @Column({nullable: true})
  rg?: string; // RG (Registro Geral) (opcional)

  @Column({nullable: true})
  dataNascimento?: Date; // Data de nascimento (opcional)

  @Column({nullable: true})
  numeroCarteiraTrabalho?: string; // Número da carteira de trabalho (opcional)

  @Column({nullable: true})
  email?: string; // E-mail (deve ser único) (opcional)

  @Column({nullable: true})
  dataAdmissao?: Date; // Data da admissão (opcional)

  @Column({nullable: true})
  nomeMae?: string; // Nome da mãe (opcional)
 
  @Column({nullable: true})
  nomePai?: string; // Nome do pai (opcional)

  @Column({nullable: true})
  endereco?: string; // Endereço (opcional) 

  @Column({nullable: true})
  telefone?: string; // Telefone (opcional)

  @Column({nullable: true})
  estadoCivil?: string; // Estado civil (opcional)

  @Column({nullable: true})
  funcao?: string; // Função no trabalho (opcional)

  @Column({nullable: true})
  genero?: string; // Gênero (opcional)

  @Column({nullable: true})
  celular?: string; // Celular (opcional)

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // Data de criação do registro

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // Data da última atualização
}
