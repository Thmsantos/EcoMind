import { ObjectId } from "mongodb"

export interface UserInterface{
    _id?: ObjectId
    user: string
    name: string
    email: string
    senha?: string
    status: boolean
    avatar: string;
}