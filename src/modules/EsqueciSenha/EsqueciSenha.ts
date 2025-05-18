import { ObjectId } from "mongodb";

class EsqueciSenha {
  private id: ObjectId;

  private usuario: string;

  private codigo: number;
  
  private senhaAtual: string;

  private createdAt: Date;

  constructor(usuario: string, senhaAtual: string, codigo: number) {
    this.id = new ObjectId();
    this.usuario = usuario;
    this.codigo = codigo;
    this.senhaAtual = senhaAtual;
    this.createdAt = new Date();
  }

  public getId(): ObjectId {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUsuario(): string {
    return this.usuario;
  }

  public getCodigo(): number {
    return this.codigo;
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

  public setUsuario(usuario: string): void {
    this.usuario = usuario;
  }

  public setSenhaAtual(senhaAtual: string): void {
    this.senhaAtual = senhaAtual;
  }
}

export default EsqueciSenha;