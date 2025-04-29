import { ObjectId } from 'mongodb';
import { TransporteInterface } from './interfaces/transporteInterface.js';

class Calculo {
    private id: ObjectId;
    private idUser: ObjectId; 
    private mes: string;
    private consumoEnergia: string;
    private consumoGas: string;
    private consumoTransporte: TransporteInterface;
    private consumoCarbono: string;
    private balanco: string;

    constructor( 
        idUser: ObjectId,
        mes: string,
        consumoEnergia: string,
        consumoGas: string,
        consumoTransporte: TransporteInterface,
        consumoCarbono: string,
        balanco: string
    ) {
        this.id = new ObjectId();
        this.idUser = idUser;
        this.mes = mes;
        this.consumoEnergia = consumoEnergia;
        this.consumoGas = consumoGas;
        this.consumoTransporte = consumoTransporte;
        this.consumoCarbono = consumoCarbono;
        this.balanco = balanco
    }

    
    getId(): ObjectId {
        return this.id;
    }

    setId(id: ObjectId) {
        this.id = id;
    }

    getidUser(): ObjectId {
        return this.idUser;
    }

    setidUser(idUser: ObjectId) {
        this.idUser = idUser;
    }

    getMes(): string {
        return this.mes;
    }

    setMes(mes: string) {
        this.mes = mes;
    }

    getconsumoEnergia(): string {
        return this.consumoEnergia;
    }

    setconsumoEnergia(consumoEnergia: string) {
        this.consumoEnergia = consumoEnergia;
    }

    getconsumoGas(): string {
        return this.consumoGas;
    }

    setconsumoGas(consumoGas: string) {
        this.consumoGas = consumoGas;
    }

    getconsumoTransporte(): TransporteInterface {
        return this.consumoTransporte;
    }

    setconsumoTransporte(consumoTransporte: TransporteInterface) {
        this.consumoTransporte = consumoTransporte;
    }

    getconsumoCarbono(): string {
        return this.consumoCarbono;
    }

    setconsumoCarbono(consumoCarbono: string) {
        this.consumoCarbono = consumoCarbono;
    }

    getBalanco(): string {
        return this.balanco
    }

    setBalanco( balanco: string){
        this.balanco = this.balanco;
    }
}

export default Calculo;