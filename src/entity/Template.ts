// src/entity/Person.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Template {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.persons)
    user: User;

    @Column()
    descricao: string;

    @Column()
    nome: string;

    @Column()
    tipo: string;

    @Column()
    tamanho: number;

    @Column()
    userId: number; // Adicione esta coluna para armazenar o ID do usuário

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}