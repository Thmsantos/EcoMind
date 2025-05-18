import { ObjectId } from "mongodb";

export interface EsqueciSenhaInterface {
    id?: ObjectId;
    usuario:  string;
    codigo?: number;
    senhaAtual: string;
    createdAt?: Date;
}
