import { ObjectId } from "mongodb"
import { CalculoInterface } from "../../Calculo/interfaces/calculoInterface"

export interface UserInterface{
    id: ObjectId
    usuario: string
    nome: string
    email: string
    senha: string
    status: boolean
    calculos: CalculoInterface[]
}