import { ObjectId } from "mongodb";

class Email {
  private id: ObjectId
  private userId: ObjectId
  private from: string;
  private to: string;
  private subject: string;
  private text: string;
  private html: string;

  constructor(
    userId: ObjectId,
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string
  ) {
    this.id = new ObjectId,
      this.userId = userId
    this.from = from,
      this.subject = subject,
      this.to = to,
      this.text = text,
      this.html = html
  }

  public getId(): ObjectId {
    return this.id;
  }

  public getUserId(): ObjectId {
    return this.userId;
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

  public setUserId(userId: ObjectId): void {
    this.userId = userId;
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