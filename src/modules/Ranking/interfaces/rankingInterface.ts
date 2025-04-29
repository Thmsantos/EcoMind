import { ObjectId } from "mongodb";

export interface IRanking {
    id?: ObjectId;
    usuario: string;
    pontos: number;
}
