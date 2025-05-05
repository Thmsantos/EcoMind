import { Request, Response } from "express";
import Email from "../Email";
import EmailInterface from "../interfaces/emailInterface.js";
import EmailRepository from "../repository/EmailRepository";

class EmailService {
    private emailRepository: EmailRepository;

    constructor() {
        this.emailRepository = new EmailRepository();
    }

    public async newEmail(req: Request, res: Response): Promise<void> {
        try {
            const {
                userId,
                from,
                to,
                subject,
                text,
                html
            } = req.body;

            const instanceEmail = new Email(
                userId,
                from,
                to,
                subject,
                text,
                html
            );

            const email: EmailInterface = {
                id: instanceEmail.getId(),
                userId: instanceEmail.getUserId(),
                from: instanceEmail.getFrom(),
                to: instanceEmail.getTo(),
                subject: instanceEmail.getSubject(),
                text: instanceEmail.getText(),
                html: instanceEmail.getHtml()
            }

            await this.emailRepository.send(email)
        } catch (error) {
            res.status(500).send({
                error: "Erro ao criar email",
                details: error.message,
            });
        }
    }
}

export default EmailService;