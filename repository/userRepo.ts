import DB from "../db/database.ts";
import {User} from "../model/user.ts";

const userCollection = DB.collection<User>("users");

export const saveUser = async (user: User) => {
    return await userCollection.insertOne(user);
}

export const selectUserByPhone = async (phone: any) => {
    return await userCollection.findOne({
        phone: phone,
    });
}