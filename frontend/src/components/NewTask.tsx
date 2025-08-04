import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useLoadingStore } from "../store";
import api from "../api";
import toast from "react-hot-toast";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import type { Todo } from "../types";

type Inputs = {
    title: string
    description?: string
}

interface Props{
    onNewTask:(todo:Todo)=>void;
}

const NewTask:React.FC<Props>  = ({onNewTask}) => {
    const [showForm, setShowForm] = useState(false)
    const { showLoading, hideLoading } = useLoadingStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            showLoading()
            const res = await api.post('/todos', {
                title: data.title,
                description: data.description
            })
            onNewTask(res.data)
            handleClose()
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

    const handleClose=()=>{
        setShowForm(false)
        reset()
    }



    return <>
        <button onClick={() => setShowForm(true)} className="mt-4 cursor-pointer rounded-sm border border-green-600 bg-green-600 px-6 py-2 text-sm font-medium text-white">New task</button>
        <Dialog open={showForm} onClose={() => handleClose()} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
                <DialogPanel className="space-y-3 bg-white block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6">
                    <div className="flex itemr-center justify-between">
                        <DialogTitle className="font-bold">New Task</DialogTitle>
                        <button onClick={()=>handleClose()} className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700"> Title </span>
                            <input
                                {...register("title", {
                                    required: 'Title is required'

                                })}
                                placeholder="Title"
                                type="text"
                                className="placeholder-gray-400 py-2 px-3 mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm focus:outline-1 focus:outline-blue-300"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700"> Description </span>
                            <input
                                {...register("description")}
                                placeholder="Description"
                                type="text"
                                className="placeholder-gray-400 py-2 px-3 mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm focus:outline-1 focus:outline-blue-300"
                            />
                        </label>

                        {Object.keys(errors).length > 0 && <div role="alert" className="border-s-4 border-red-700 bg-red-50 px-4 py-2">
                            <ul className="list-disc list-inside">
                                {errors.title && <li className="mt-2 text-sm text-red-700">{errors.title?.message}</li>}
                            </ul>
                        </div>}
                        <div className="flex gap-4">
                            <button className="block w-full mt-4 cursor-pointer rounded-sm border border-green-600 bg-green-600 px-6 py-2 text-sm font-medium text-white" type='submit'>Save</button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    </>
}

export default NewTask