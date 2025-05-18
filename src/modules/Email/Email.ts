import { ObjectId } from "mongodb";

class Email {
  private id: ObjectId
  private usuario: string;
  private from: string;
  private to: string;
  private subject: string;
  private text: string;
  private html: string;

  constructor(
    usuario: string,
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
  ) {
      this.id = new ObjectId,
      this.usuario = usuario;
      this.from = from,
      this.subject = subject,
      this.to = to,
      this.text = text,
      this.html = html
  }

  public getId(): ObjectId {
    return this.id;
  }

  public getUsuario(): string {
    return this.usuario;
  }

  public getFrom(): string {
    return this.from;
  }

  public getTo(): string {
    return this.to;
  }

  public getSubject(): string {
    return this.subject;
  }

  public getText(): string {
    return this.text;
  }

  public getHtml(): string {
    return this.html;
  }

  public setUsuario(usuario: string): void {
    this.usuario = usuario;
  }

  public setFrom(from: string): void {
    this.from = from;
  }

  public setHtml(html: string): void {
    this.html = html;
  }

  public setTo(to: string): void {
    this.to = to;
  }

  public setSubject(subject: string): void {
    this.subject = subject;
  }

  public setText(text: string): void {
    this.text = text;
  }
}

export default Email;