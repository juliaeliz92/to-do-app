import React from 'react'
import { ITask } from '@/app/types/tasks'
import Task from './Task'

interface TodoListProps {
    tasks: ITask[]
}

const ToDoList: React.FC<TodoListProps> = ({tasks}) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Tasks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task,) => 
                        <Task task={task} key={task.id}/>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ToDoList