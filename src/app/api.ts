import { ITask } from "@/app/types/tasks"

let baseUrl : any

if(process.env.NODE_ENV === 'development') {
    baseUrl = process.env.DOMAIN_URL_LOCAL
} else {
    baseUrl = process.env.DOMAIN_URL_PROD
}

export const getAllTodos = async () => {
    const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' })
    const todos = await res.json()
    return todos
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
    const newTodo = await res.json()
    return newTodo
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
    const updatedTodo = await res.json()
    return updatedTodo
}

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`,
        {
            method: 'DELETE',
        })
}