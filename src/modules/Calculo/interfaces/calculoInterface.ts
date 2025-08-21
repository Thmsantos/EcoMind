import { ObjectId } from 'mongodb';
import { TransporteInterface } from './transporteInterface';

export interface CalculoInterface {
    id?: ObjectId;
    idUser: ObjectId; 
    mes: string;
    consumoEnergia: string;
    consumoGas: string;
    consumoTransporte: TransporteInterface | string;
    consumoCarbono: string;
    balanco: string;
}