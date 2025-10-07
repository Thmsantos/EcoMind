import { ObjectId } from 'mongodb';

export interface CalculoInterface {
    id?: ObjectId;
    idUser: ObjectId; 
    mes: string;
    ano: string;
    consumoEnergia: string;
    consumoGas: string;
    consumoTransporte:  string;
    consumoCarbono: string;
    balanco: string;
}