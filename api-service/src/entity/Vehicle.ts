import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { DateResolver } from "graphql-scalars";
import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

@ObjectType()
@Entity()
export class Vehicle extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: "First name is required." })
  @Length(2, 30, { message: "First name must be between 2 and 30 characters." })
  @Matches(/^[A-Za-z\s]+$/, {
    message: "First name must contain only letters and spaces.",
  })
  first_name!: string;

  @Field()
  @Column()
  @IsNotEmpty({ message: "Last name is required." })
  @Length(2, 30, { message: "Last name must be between 2 and 30 characters." })
  @Matches(/^[A-Za-z\s]+$/, {
    message: "Last name must contain only letters and spaces.",
  })
  last_name!: string;

  @Field()
  @Column()
  @IsNotEmpty({ message: "Email is required." })
  @IsEmail({}, { message: "Email must be valid." })
  email!: string;

  @Field()
  @Column()
  @IsNotEmpty({ message: "Car make is required." })
  car_make!: string;

  @Field()
  @Column()
  @IsNotEmpty({ message: "Car model is required." })
  car_model!: string;

  @Field()
  @Column()
  @Matches(/^[A-HJ-NPR-Z0-9]{12}$/, {
    message: "VIN must be exactly 12 characters. Letters I, O, Q not allowed.",
  })
  vin!: string;

  @Field(() => DateResolver, { nullable: true })
  @Column({ type: "date", nullable: true })
  @IsNotEmpty({ message: "Manufactured date is required." })
  manufactured_date!: Date;

  @Field()
  @Column()
  age_of_vehicle!: number;
}
