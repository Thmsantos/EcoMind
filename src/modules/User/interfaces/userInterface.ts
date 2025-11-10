import { ObjectId } from "mongodb"
import type { CalculoInterface } from "../../Calculo/interfaces/CalculoInterface.ts"

export interface UserInterface{
    _id?: ObjectId
    usuario: string
    nome: string
    email: string
    senha: string
    status: boolean
    calculos: CalculoInterface[]
}