'use client'

import React, { FormEventHandler, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { addTodo } from '@/app/api'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const AddTask = () => {
	const router = useRouter()
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [newTaskValue, setNewTaskValue] = useState<string>('')

	const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		await addTodo({
			id: uuidv4(),
			text: newTaskValue
		})
		setNewTaskValue("")
		setModalOpen(false)
		router.refresh()
	}

	return (
		<div >
			<button onClick={() => setModalOpen(true)} className='btn btn-primary w-full'>
				Add New Task <AiOutlinePlus className='ml-2' size={18} />
			</button>
			<Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
				<form onSubmit={(e) => handleSubmitNewTodo(e)}>
					<h3 className='font-bold text-lg mb-3'>Add new task</h3>
					<div className='flex'>
						<input
							type='text'
							value={newTaskValue}
							onChange={(e) => setNewTaskValue(e.target.value)}
							placeholder='Type here'
							className='input input-bordered w-full mr-2'
						/>
						<button type='submit' className='btn'>
							Submit
						</button>
					</div>
				</form>
			</Modal>
		</div>
	)
}

export default AddTask