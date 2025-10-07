import { ObjectId } from "mongodb";

export interface EmailInterface {
    id?: ObjectId
    usuario: string
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string
}

