export interface User{
    id: Number
    name: String
    email: String
}

export interface Todo{
    id:number
    user_id:Number
    title:string
    description:string
    completed:boolean
    created_at:Date
}