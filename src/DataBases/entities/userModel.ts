import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  Name!: string;
  
  @Column()
  Email!: string;

  @Column()
  ImagePath!: string;

  @Column()
  Password!: string;
}