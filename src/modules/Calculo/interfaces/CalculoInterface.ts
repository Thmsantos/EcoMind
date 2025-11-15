import { ObjectId } from 'mongodb';

export interface CalculoInterface {
    id?: ObjectId;
    idUser: ObjectId; 
    month: string;
    year: string;
    energyEmissiom: string;
    gasEmission: string;
    vehicleEmission:  string;
    carbonEmission: string;
}