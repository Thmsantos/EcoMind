import { ObjectId } from "mongodb";

interface emailInterface {
    id?: ObjectId
    usuario: string
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string
}

export default emailInterface;