import axios from 'axios';
const headers = { "Content-Type": "application/json" };

export const fetchTodos = async () => {
    try {
        const res = await axios({
            url: 'api/fetch',
            method: 'GET',
            headers,
        })

        return res;
    } catch(e) {
        console.error(`An error occured fetching todos: ${e}`);
    }
}

export const createTodo = async (data) => {
    try {
        await axios({
            url: 'api/create',
            method: 'POST',
            data: { ...data, status: "ongoing" },
            headers,
        });

        return 'Success';
    } catch(e) {
        console.error(`An error occured fetching todos: ${e}`);
    }
}

export const updateTodo = async (data) => {
    try {
        await axios({
            url: 'api/update',
            method: 'PUT',
            data,
            headers,
        })

        return 'Success';
    } catch(e) {
        console.error(`An error occured fetching todos: ${e}`);
    }
}

export const deleteTodo = async (data) => {
    try {
        await axios({
            url: 'api/delete',
            method: 'DELETE',
            data,
            headers,
        })

        return 'Success';
    } catch(e) {
        console.error(`An error occured fetching todos: ${e}`);
    }
}