import { ObjectId } from "mongodb";

class EsqueciSenha {
  private id: ObjectId;

  private userId: ObjectId;

  private senhasAntigas: string[];

  private codigo: number;
  
  private senhaAtual: string;

  private createdAt: Date;

  constructor(userId: ObjectId, senhaAtual: string, codigo: number) {
    this.id = new ObjectId();
    this.userId = userId;
    this.codigo = codigo;
    this.senhasAntigas = [];
    this.senhaAtual = senhaAtual;
    this.createdAt = new Date();
  }

  public getId(): ObjectId {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUserId(): ObjectId {
    return this.userId;
  }

  public getCodigo(): number {
    return this.codigo;
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

  public setCreatedAt(date: Date): void {
    this.createdAt = date;
  }

  public setCodigo(codigo: number): void {
    this.codigo = codigo
  }

  public setUserId(userId: ObjectId): void {
    this.userId = userId;
  }

  public setSenhasAntigas(senhaAntiga: string): void {
    this.senhasAntigas.push(senhaAntiga);
  }

  public setSenhaAtual(senhaAtual: string): void {
    this.senhaAtual = senhaAtual;
  }

  public adicionarSenhaAntiga(senha: string): void {
    this.senhasAntigas.push(senha);
  }
}

export default EsqueciSenha;