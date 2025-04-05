import {tasks} from "@prisma/client";
import {Task} from "../types/domain/todo-list-api";

export const makeTask = (task: tasks): Task => {
    const {id, name, description, deadline, completed} = task;
    return {id, name, description, deadline: deadline?.toISOString() || null, completed};
};