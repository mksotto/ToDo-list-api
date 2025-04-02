import {tasks} from "@prisma/client";

export const makeTask = (task: tasks) => {
    const {id, name, description, deadline, completed} = task;
    return {id, name, description, deadline, completed};
};