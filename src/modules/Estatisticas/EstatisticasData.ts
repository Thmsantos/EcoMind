import { ObjectId } from "mongodb";

export interface DataUser{
    mes: string,
    ano: string,
    emissao: string
}

export interface EstatisticasData{
    id?: ObjectId | String;
    idUser: ObjectId | String;
    dataUser: DataUser;
}