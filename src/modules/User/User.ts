import { ObjectId } from 'mongodb';
import { CalculoInterface } from '../Calculo/interfaces/calculoInterface';

class User {
    private id: ObjectId; 
    private usuario: string;
    private nome: string;
    private email: string;
    private senha: string;
    private status: boolean;
    private calculos: CalculoInterface[];

    constructor( 
        usuario: string,
        nome: string,
        email: string,
        senha: string,
        status: boolean,
        calculos: CalculoInterface[]
    ) {
        this.id = new ObjectId();
        this.usuario = usuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.status = status;
        this.calculos = calculos;
    }

    
    getId(): ObjectId {
        return this.id;
    }

    setId(id: ObjectId) {
        this.id = id;
    }

    getUsuario(): string {
        return this.usuario;
    }

    setUsuario(usuario: string) {
        this.usuario = usuario;
    }

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string) {
        this.nome = nome;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }

    getSenha(): string {
        return this.senha;
    }

    setSenha(senha: string) {
        this.senha = senha;
    }

    getStatus(): boolean {
        return this.status;
    }

    setStatus(status: boolean) {
        this.status = status;
    }

    getCalculos(): CalculoInterface[] {
        return this.calculos;
    }

    setCalculos(calculos: CalculoInterface[]) {
        this.calculos = calculos;
    }
}

export default User;