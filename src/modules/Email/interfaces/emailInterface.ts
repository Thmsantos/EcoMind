import { ObjectId } from "mongodb";

interface emailInterface {
    id?: ObjectId
    userId: ObjectId
    from: string;
    to: string;
    subject: string;
    text: string;
}

export default emailInterface;