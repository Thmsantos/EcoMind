import { ObjectId } from "mongodb";

export interface EsqueciSenhaInterface {
    id?: ObjectId;
    userId: ObjectId | String;
    codigo?: number;
    senhaAtual: string;
    createdAt?: Date;
}
