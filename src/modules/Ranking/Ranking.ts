import { ObjectId } from "mongodb"

class Ranking {
    id: ObjectId
    posicao: string
    usuario: string

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

    getPosicao(): string {
        return this.posicao;
    }

    setPosicao(posicao: string){
        this.posicao = posicao
    }

    getUsuario(usuario: string){
        return this.usuario
    }

    setUsuario(usuario: string){
        this.usuario = usuario
    }
}