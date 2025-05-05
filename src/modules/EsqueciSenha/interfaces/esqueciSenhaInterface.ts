import { ObjectId } from "mongodb";

export interface EsqueciSenhaInterface {
    id?: ObjectId;
    userId: ObjectId;
    senhasAntigas?: string[];
    codigo?: number;
    senhaAtual: string;
    createdAt?: Date;
}
