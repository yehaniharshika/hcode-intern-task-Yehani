import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { User } from "../entity/User";

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return User.find();
    }

    @Query(() => User, { nullable: true })
    async user(@Arg("id", () => ID) id: number): Promise<User | undefined> {
        const user = await User.findOne({ where: { id } });
        return user ?? undefined; // if user is null, return undefined
    }

    @Mutation(() => User)
    async createUser(
        @Arg("email") email: string,
        @Arg("password") password: string,
    ): Promise<User> {
        const user = User.create({ email, password });
        return user.save();
    }

    @Mutation(() => User, { nullable: true })
    async updateUser(
        @Arg("id", () => ID) id: number,
        @Arg("email", { nullable: true }) email?: string,
        @Arg("password", { nullable: true }) password?: string
    ): Promise<User | undefined> {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return undefined; // user not found, return undefined
        }
        Object.assign(user, { email, password });
        return user.save();
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id", () => ID) id: number): Promise<boolean> {
        await User.delete(id);
        return true;
    }
}
