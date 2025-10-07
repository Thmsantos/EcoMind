import { ObjectId } from "mongodb";

export interface RankingInterface {
    id?: ObjectId;
    usuario: string;
    pontos: number;
}
