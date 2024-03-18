'use client'

import React, { FormEventHandler, useState } from 'react'
import { ITask } from '@/app/types/tasks'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Modal from '@/app/components/Modal'
import { useRouter } from 'next/navigation'
import { editTodo, deleteTodo } from '@/app/api'

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await editTodo({
            id: task.id,
            text: taskToEdit
        })
        setTaskToEdit("")
        setOpenModalEdit(false)
        router.refresh()
    }

    const handleSubmitDeleteTodo = async (id: string) => {
        await deleteTodo(id)
        router.refresh()
    }

    return (
        <tr key={task.id}>
            <th className='w-full'>{task.text}</th>
            <td className='flex gap-5'>
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor='pointer' className='text-blue-500' size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={(e) => handleSubmitEditTodo(e)}>
                        <h3 className='font-bold text-lg mb-3'>Edit task</h3>
                        <div className='flex'>
                            <input
                                type='text'
                                value={taskToEdit}
                                onChange={(e) => setTaskToEdit(e.target.value)}
                                placeholder='Type here'
                                className='input input-bordered w-full mr-2'
                            />
                            <button type='submit' className='btn'>
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor='pointer' className='text-red-500' size={25} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className='text-lg'>Are you sure you want to delete the task?</h3>
                    <button
                        onClick={() => handleSubmitDeleteTodo(task.id)}
                        className='btn'
                    >
                        Yes
                    </button>
                </Modal>
            </td>
        </tr>
    )
}

export default Task