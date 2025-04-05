import {users} from "@prisma/client";
import {User} from "../types/domain/todo-list-api";

export const makeUser = (user: users): User => {
    const {id, username, email} = user;
    return {id, username, email};
};