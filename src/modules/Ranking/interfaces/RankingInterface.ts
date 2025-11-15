import { ObjectId } from "mongodb";

export interface RankingInterface {
    id?: ObjectId;
    user: string;
    pontos: number;
}
