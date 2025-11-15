import { ObjectId } from 'mongodb';
class Calculo {
    private id: ObjectId;
    private idUser: ObjectId; 
    private month: string;
    private year: string;
    private energyEmission: string;
    private gasEmission: string;
    private vehicleEmission: string;
    private carbonEmission: string;

    constructor( 
        idUser: ObjectId,
        month: string,
        energyEmission: string,
        gasEmission: string,
        year: string,
        vehicleEmission: string,
        carbonEmission: string,
    ) {
        this.id = new ObjectId();
        this.idUser = idUser;
        this.month = month;
        this.year = year;
        this.energyEmission = energyEmission;
        this.gasEmission = gasEmission;
        this.vehicleEmission = vehicleEmission;
        this.carbonEmission = carbonEmission;
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

    getMonth(): string {
        return this.month;
    }

    setMonth(month: string) {
        this.month = month;
    }

    getYear(): string {
        return this.year;
    }

    setYear(year: string){
        this.year = year
    }

    getEnergyEmission(): string {
        return this.energyEmission;
    }

    setEnergyEmission(energyEmission: string) {
        this.energyEmission = energyEmission;
    }

    getGasEmission(): string {
        return this.gasEmission;
    }

    setGasEmission(gasEmission: string) {
        this.gasEmission = gasEmission;
    }

    getVehicleEmission(): string {
        return this.vehicleEmission;
    }

    setVehicleEmission(vehicleEmission: string) {
        this.vehicleEmission = vehicleEmission;
    }

    getCarbonEmission(): string {
        return this.carbonEmission;
    }

    setCarbonEmission(carbonEmission: string) {
        this.carbonEmission = carbonEmission;
    }
}

export default Calculo;