import { ObjectId } from "mongodb";

export interface RankingInterface {
    id: ObjectId,
    posicao: string,
    usuario: string,
}