import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Vehicle extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  first_name!: string;

  @Field()
  @Column()
  last_name!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  car_make!: string;

  @Field()
  @Column()
  car_model!: string;

  @Field()
  @Column()
  vin!: string;

  @Field()
  @Column({ type: "date", nullable: true })
  manufactured_date!: Date;

  @Field()
  @Column()
  age_of_vehicle!: number;
}
