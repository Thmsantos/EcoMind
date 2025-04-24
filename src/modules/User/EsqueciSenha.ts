import { ObjectId } from "mongodb";

class EsqueciSenha {
  private id: ObjectId;
  private userId: ObjectId;
  private senhasAntigas: string[];
  private senhaAtual: string;

  constructor(userId: ObjectId, senhaAtual: string) {
    this.id = new ObjectId();
    this.userId = userId;
    this.senhasAntigas = [];
    this.senhaAtual = senhaAtual;
  }

  public getId(): ObjectId {
    return this.id;
  }

  public getUserId(): ObjectId {
    return this.userId;
  }

  public getSenhasAntigas(): string[] {
    return this.senhasAntigas;
  }

  public getSenhaAtual(): string {
    return this.senhaAtual;
  }

  public setId(id: ObjectId): void {
    this.id = id;
  }

  public setUserId(userId: ObjectId): void {
    this.userId = userId;
  }

  public setSenhasAntigas(senhasAntigas: string[]): void {
    this.senhasAntigas = senhasAntigas;
  }

  public setSenhaAtual(senhaAtual: string): void {
    this.senhaAtual = senhaAtual;
  }

  public adicionarSenhaAntiga(senha: string): void {
    this.senhasAntigas.push(senha);
  }
}
