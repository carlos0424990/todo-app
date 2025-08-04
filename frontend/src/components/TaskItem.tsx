import { useState } from "react"
import type { Todo } from "../types"
import clsx from "clsx"
import toast from "react-hot-toast"
import api from "../api"
import { useLoadingStore } from "../store"
import EditTask from "./EditTask"

interface Props {
    data: Todo
    onDelete: () => void
}

const TaskItem: React.FC<Props> = ({ data, onDelete }) => {
    const [open, setOpen] = useState(false)
    const [todo, setTodo] = useState(data)
    const { showLoading, hideLoading } = useLoadingStore();

    const handleClick = () => {
        setOpen(p => !p)
    }
    const handleDelete = async (e: any) => {
        e.stopPropagation()
        try {
            showLoading()
            await api.delete('/todos?todo_id=' + data.id)
            onDelete()
        } catch (error: any) {
            let error_message;
            if (error.response)
                error_message = error.response.data.message
            else
                error_message = error.message
            toast.error(error_message)
        } finally {
            hideLoading()
        }
    }
    const handleCheck = async (e: any) => {
        e.stopPropagation()
        try {
            setTodo(p => ({ ...p, completed: !p.completed }))
            await api.post('/todos/completed', {
                todo_id: data.id
            })
        } catch (error: any) {

        }
    }

    const handleEdit = (changed_todo: Todo) => {
        setTodo(changed_todo)
    }

    return <>
        <li className="cursor-pointer block rounded-sm border border-gray-300 shadow-sm px-5 py-3">
            <div onClick={handleClick} className="flex items-center justify-between flex-wrap">
                <div className="flex items-center space-x-3">
                    <input onClick={handleCheck} type="checkbox" checked={todo.completed} className=" size-4" />
                    <span className={todo.completed ? "line-through" : ""}>
                        {todo.title}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={clsx("size-5", { "rotate-180": open })}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <div className="flex items-center space-x-2 flex-wrap">
                    <EditTask data={todo} onChange={handleEdit} />
                    <button onClick={handleDelete} className="text-sm text-red-600 cursor-pointer hover:underline">Delete</button>
                </div>
            </div>
            {open && <div className="mt-3 text-gray-700">
                {todo.description}
            </div>}
        </li>
    </>
}

export default TaskItem