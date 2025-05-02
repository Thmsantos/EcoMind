import { Request, Response } from "express";
import Email from "../Email";
import emailInterface from "../interfaces/emailInterface";
import EmailRepository from "../repository/emailRepository";

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
                text
            } = req.body;

            const instanceEmail = new Email(
                userId,
                from,
                to,
                subject,
                text
            );

            const email: emailInterface = {
                id: instanceEmail.getId(),
                userId: instanceEmail.getUserId(),
                from: instanceEmail.getFrom(),
                to: instanceEmail.getTo(),
                subject: instanceEmail.getSubject(),
                text: instanceEmail.getText()
            }

            await this.emailRepository.create(email)
        } catch (error) {
            res.status(500).send({
                error: "Erro ao criar email",
                details: error.message,
            });
        }
    }
}

export default EmailService;