import { ObjectId } from "mongodb"

class Ranking {
   private id: ObjectId
   private pontos: number
   private user: string

    constructor(
        pontos: number,
        user: string
    ) {
        this.id = new ObjectId();
        this.pontos = pontos;
        this.user = user
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

    getUser(): string {
        return this.user;
    }

    setUser(user: string){
        this.user = user
    }
}
export default Ranking;