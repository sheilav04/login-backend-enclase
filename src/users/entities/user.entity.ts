import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    email: string

    @Column('text')
    password: string

    @Column('text')
    rol: string

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt?: Date
}
