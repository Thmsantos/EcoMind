import { ObjectId } from "mongodb"

class Ranking {
   private id: ObjectId
   private pontos: number
   private usuario: string

    constructor(
        pontos: number,
        usuario: string
    ) {
        this.id = new ObjectId();
        this.pontos = pontos;
        this.usuario = usuario
    }

    getId(): ObjectId {
        return this.id;
    }

    setId(id: ObjectId) {
        this.id = id;
    } 

    getPontos(): number {
        return this.pontos;
    }

    setPontos(pontos: number){
        this.pontos = pontos
    }

    getUsuario(): string {
        return this.usuario;
    }

    setUsuario(usuario: string){
        this.usuario = usuario
    }
}
export default Ranking;