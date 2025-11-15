import { ObjectId } from 'mongodb';

class User {
    private id: ObjectId; 
    private user: string;
    private name: string;
    private email: string;
    private senha: string;
    private status: boolean;
    private avatar: string;

    constructor( 
        user: string,
        name: string,
        email: string,
        senha: string,
        status: boolean,
        avatar: string
    ) {
        this.id = new ObjectId();
        this.user = user;
        this.name = name;
        this.email = email;
        this.senha = senha;
        this.status = status;
        this.avatar = avatar;
    }

    
    getId(): ObjectId {
        return this.id;
    }

    setId(id: ObjectId) {
        this.id = id;
    }

    getUser(): string {
        return this.user;
    }

    setUser(user: string) {
        this.user = user;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
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

    getAvatar(): string {
        return this.avatar;
    }

    setAvatar(avatar: string) {
        avatar = avatar;
    }
}

export default User;