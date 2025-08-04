import { useEffect, useState } from "react"
import type { Todo } from "../types"
import NewTask from '../components/NewTask'
import TaskItem from '../components/TaskItem'
import api from "../api"
import toast from "react-hot-toast"
import { useAuthStore, useLoadingStore } from "../store"

const Todos = () => {
    const {user,logout}=useAuthStore()
    const [todos, setTodos] = useState<Todo[]>([])
    const { showLoading, hideLoading } = useLoadingStore();
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            showLoading()
            const res = await api.get('/todos')
            setTodos((res.data as Todo[]).sort((a:Todo, b:Todo) => a.id - b.id))
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

    const handleNewTask = (todo: Todo) => {
        setTodos((prev) => [...prev, todo])
    }
    const handleLogout=()=>{
        logout()
    }

    return <>
        <div className="p-4 max-w-xl mx-auto">
            <div className="mb-3 text-lg">
                Hi {user?.name}!
            </div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">My Tasks</h2>
                <button onClick={handleLogout} className="text-blue-500 cursor-pointer">Logout</button>
            </div>
            <div>
                <NewTask onNewTask={handleNewTask} />
            </div>
            <ul className="mt-4 space-y-2">
                {todos.map((todo) => (
                    <TaskItem key={String(todo.id)} data={todo} onDelete={loadData} />
                ))}
            </ul>
        </div>
    </>
}

export default Todos