import { ObjectId } from "mongodb";

export interface DataUser{
    month: string,
    year: string,
    carbonEmission: string
}

export interface EstatisticasData{
    id?: ObjectId | String;
    idUser: ObjectId | String;
    dataUser: DataUser;
}