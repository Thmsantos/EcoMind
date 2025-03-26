import { ObjectId } from 'mongodb';
import { TransporteInterface } from './interfaces/transporteInterface';

class Calculo{
    id: ObjectId;
    idUser: ObjectId;
    mes: string;
    consumoEnergia: string;
    consumoGas: string;
    consumoTransporte: TransporteInterface;
    consumoCarbono: string;
    balanco: string;

    constructor(
        id: ObjectId,
        idUser: ObjectId,
        mes: string,
        consumoEnergia: string,
        consumoGas: string,
        consumoTransporte: TransporteInterface,
        consumoCarbono: string,
        balanco: string
    ) {
        this.id = id;
        this.idUser = idUser;
        this.mes = mes;
        this.consumoEnergia = consumoEnergia;
        this.consumoGas = consumoGas;
        this.consumoTransporte = consumoTransporte;
        this.consumoCarbono = consumoCarbono;
        this.balanco = balanco;
    }

    getId(): ObjectId {
        return this.id;
    }

    setId(id: ObjectId): void {
        this.id = id;
    }

    getIdUser(): ObjectId {
        return this.idUser;
    }

    setIdUser(idUser: ObjectId): void {
        this.idUser = idUser;
    }

    getMes(): string {
        return this.mes;
    }

    setMes(mes: string): void {
        this.mes = mes;
    }

    getConsumoEnergia(): string {
        return this.consumoEnergia;
    }

    setConsumoEnergia(consumoEnergia: string): void {
        this.consumoEnergia = consumoEnergia;
    }

    getConsumoGas(): string {
        return this.consumoGas;
    }

    setConsumoGas(consumoGas: string): void {
        this.consumoGas = consumoGas;
    }

    getConsumoTransporte(): TransporteInterface {
        return this.consumoTransporte;
    }

    setConsumoTransporte(consumoTransporte: TransporteInterface): void {
        this.consumoTransporte = consumoTransporte;
    }

    getConsumoCarbono(): string {
        return this.consumoCarbono;
    }

    setConsumoCarbono(consumoCarbono: string): void {
        this.consumoCarbono = consumoCarbono;
    }

    getBalanco(): string {
        return this.balanco;
    }

    setBalanco(balanco: string): void {
        this.balanco = balanco;
    }
}