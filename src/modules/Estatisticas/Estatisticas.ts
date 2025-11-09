import { ObjectId } from "mongodb";
import { DataUser } from "./EstatisticasData";

class Estatisticas {
    private id: ObjectId;
    private idUser: ObjectId;
    private dataUser: DataUser;

    constructor(
        idUser: ObjectId,
        dataUser: DataUser
    ){
        this.id = new ObjectId();
        this.idUser = idUser;
        this.dataUser = dataUser;
    }

    public getId(): ObjectId {
        return this.id;
    }

    public setId(id: ObjectId): void {
        this.id = id;
    }

    public getIdUser(): ObjectId {
        return this.idUser;
    }

    public setIdUser(idUser: ObjectId): void {
        this.idUser = idUser;
    }

    public getDataUser(): DataUser {
        return this.dataUser;
    }

    public setDataUser(dataUser: DataUser): void {
        this.dataUser = dataUser;
    }
}

export default Estatisticas;