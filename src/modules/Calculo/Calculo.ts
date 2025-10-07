import { ObjectId } from 'mongodb';
class Calculo {
    private id: ObjectId;
    private idUser: ObjectId; 
    private mes: string;
    private ano: string;
    private consumoEnergia: string;
    private consumoGas: string;
    private consumoTransporte: string;
    private consumoCarbono: string;
    private balanco: string;

    constructor( 
        idUser: ObjectId,
        mes: string,
        consumoEnergia: string,
        consumoGas: string,
        ano: string,
        consumoTransporte: string,
        consumoCarbono: string,
        balanco: string
    ) {
        this.id = new ObjectId();
        this.idUser = idUser;
        this.mes = mes;
        this.ano = ano;
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

    getAno(): string {
        return this.ano;
    }

    setAno(ano: string){
        this.ano = ano
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

    getconsumoTransporte(): string {
        return this.consumoTransporte;
    }

    setconsumoTransporte(consumoTransporte: string) {
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

    setBalanco(balanco: string){
        this.balanco = balanco;
    }
}

export default Calculo;