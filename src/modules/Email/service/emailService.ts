import { Request, Response } from "express";
import Email from "../Email";
import EmailInterface from "../interfaces/emailInterface.js";
import EmailRepository from "../repository/EmailRepository";
import { transporter } from "../../../config/mailer";
import 'dotenv/config'

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
            } = req.body;

            const subject = "subject";
            const text = "text";
            const html = "html";

            const instanceEmail = new Email(
                userId,
                from,
                to,
                subject,
                text,
                html
            );

            const email: EmailInterface = {
                userId: instanceEmail.getUserId(),
                from: instanceEmail.getFrom(),
                to: instanceEmail.getTo(),
                subject: instanceEmail.getSubject(),
                text: instanceEmail.getText(),
                html: instanceEmail.getHtml()
            }

            await this.emailRepository.create(email)
        } catch (error) {
            res.status(500).send({
                error: "Erro ao criar email",
                details: error.message,
            });
        }
    }

    public async esqueciSenha(to: string, text: Number, res: Response): Promise<void> {
        try {
            const subject = "subject";
            const text = "text";
            const html = "<p>Este é um e-mail de teste enviado utilizando o Nodemailer.</p>";

            const mailOptions = {
                from: String(process.env.SMTP_USER),
                to: to,
                subject: subject,
                text: text,
                html: html,
            };

            await transporter.sendMail
        } catch (error) {
            res.status(500).send({
                error: "Erro ao criar email",
                details: error.message,
            });
        }
    }
}

export default EmailService;