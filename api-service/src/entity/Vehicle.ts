import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Vehicle extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column()
  car_make!: string;

  @Column()
  car_model!: string;

  @Column()
  vin!: string;

  @Column({ type: 'datetime', nullable: true })
  manufactured_date!: Date;

  @Column()
  age_of_vehicle!: number;
}
