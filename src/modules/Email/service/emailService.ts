import Email from "../Email.js";
import EmailInterface from "../interfaces/emailInterface.js";
import EmailRepository from "../repository/EmailRepository.js";
import { transporter } from "../../../config/mailer/mailer.js";
import "dotenv/config";
import { ObjectId } from "mongodb";

class EmailService {
  private emailRepository: EmailRepository;

  constructor() {
    this.emailRepository = new EmailRepository();
  }

  public async newEmail(userId: ObjectId, to: string, subject: string, text: string, html: string): Promise<void> {
    try {

      const from = String(process.env.SMTP_USER);
      const instanceEmail = new Email(userId, from, to, subject, text, html);

      const email: EmailInterface = {
        userId: instanceEmail.getUserId(),
        from: instanceEmail.getFrom(),
        to: instanceEmail.getTo(),
        subject: instanceEmail.getSubject(),
        text: instanceEmail.getText(),
        html: instanceEmail.getHtml(),
      };

      await this.emailRepository.create(email);
    } catch (error) {
      throw new Error(`Erro ao criar e-mail ${error.message}`);
    }
  }

  public async esqueciSenha(to: string, text: string, userId: ObjectId): Promise<void> {
    try {
      const subject = "Recuperação de senha";
      const html = `<p>Seu código de verificação é: <strong>${text}</strong></p>`;

      const mailOptions = {
        from: String(process.env.SMTP_USER),
        to: to,
        subject: subject,
        text: String(text),
        html: html,
      };

      await this.newEmail(userId, to, subject, text, html);
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Erro ao enviar e-mail de recuperação: ${error.message}`);
    }
  }
}

export default EmailService;
