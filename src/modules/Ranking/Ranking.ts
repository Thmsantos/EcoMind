import { ObjectId } from "mongodb"

class Ranking {
   
   private id: ObjectId
   private posicao: string
   private usuario: string

    constructor(
        id: ObjectId,
        posicao: string,
        usuario: string
    ) {
        this.id = id;
        this.posicao = posicao;
        this.usuario = usuario
    }

    
    getId(): ObjectId {
        return this.id;
    }

    setId(id: ObjectId) {
        this.id = id;
    }

   /*  getPontos(): number {
        throw new Error("Method not implemented.");
    } */
    

    getPosicao(): string {
        return this.posicao;
    }

    setPosicao(posicao: string){
        this.posicao = posicao
    }

    getUsuario(): string {
        return this.usuario;
    }

    setUsuario(usuario: string){
        this.usuario = usuario
    }
}
export default Ranking;