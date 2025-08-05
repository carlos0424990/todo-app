import { useForm, type SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import api from "../api"
import toast from "react-hot-toast"
import { useLoadingStore } from "../store"

type Inputs = {
    name: String
    email: string
    password: string
}

const Register = () => {
    const navigate=useNavigate()
    const { showLoading, hideLoading } = useLoadingStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            showLoading()
            await api.post('/auth/register', {
                name: data.name,
                email: data.email,
                password: data.password
            })
            toast.success('User created successfully')
            navigate('/login')
        } catch (error: any) {
            let error_message;
            if (error.response)
                error_message = error.response.data.message
            else
                error_message = error.message
            toast.error(error_message)
        }finally{
            hideLoading()
        }
    }

    return <div className="flex items-center justify-center h-screen">
        <div className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-center">Register</h2>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <label className="block">
                    <span className="text-sm font-medium text-gray-700"> Name </span>
                    <input
                        {...register("name", {
                            required: 'Name is required'

                        })}
                        placeholder="Name"
                        type="text"
                        className="placeholder-gray-400 py-2 px-3 mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm focus:outline-1 focus:outline-blue-300"
                    />
                </label>
                <label className="block">
                    <span className="text-sm font-medium text-gray-700"> Email </span>
                    <input
                        {...register("email", {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            }
                        })}
                        placeholder="Email"
                        type="email"
                        className="placeholder-gray-400 py-2 px-3 mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm focus:outline-1 focus:outline-blue-300"
                    />
                </label>
                <label className="block">
                    <span className="text-sm font-medium text-gray-700"> Password </span>
                    <input
                        {...register("password", {
                            required: 'Password is required'
                        })}
                        placeholder="Password"
                        type="password"
                        className="placeholder-gray-400 py-2 px-3 mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm focus:outline-1 focus:outline-blue-300"
                    />
                </label>

                {Object.keys(errors).length > 0 && <div role="alert" className="border-s-4 border-red-700 bg-red-50 px-4 py-2">
                    <ul className="list-disc list-inside">
                        {errors.name && <li className="mt-2 text-sm text-red-700">{errors.name?.message}</li>}
                        {errors.email && <li className="mt-2 text-sm text-red-700">{errors.email?.message}</li>}
                        {errors.password && <li className="mt-2 text-sm text-red-700">{errors.password?.message}</li>}
                    </ul>
                </div>}

                <button className="mt-4 cursor-pointer block w-full rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white">Create Account</button>
                <div className="text-sm text-center mt-5">
                    Already have an account? <Link to='/login' className="text-blue-300">Sign in</Link>
                </div>
            </form>
        </div>
    </div>
}

export default Register