import Email from "../Email.ts";
import type { EmailInterface } from "../interfaces/EmailInterface.ts";
import EmailRepository from "../repository/emailRepository.ts";
// import { transporter } from "../../../config/mailer/mailer.ts";
import "dotenv/config";

class EmailService {
  private emailRepository: EmailRepository;

  constructor() {
    this.emailRepository = new EmailRepository();
  }
/* 
  public async newEmail(
    usuario: string,
    to: string,
    subject: string,
    text: string,
    html: string
  ): Promise<void> {
    try {
      const from = String(process.env.SMTP_USER);
      const instanceEmail = new Email(usuario, from, to, subject, text, html);

      const email: EmailInterface = {
        usuario: instanceEmail.getUsuario(),
        from: instanceEmail.getFrom(),
        to: instanceEmail.getTo(),
        subject: instanceEmail.getSubject(),
        text: instanceEmail.getText(),
        html: instanceEmail.getHtml(),
      };

      await this.emailRepository.create(email);
    } catch (error: any) {
      throw new Error(`Erro ao criar e-mail ${error.message}`);
    }
  } */

  public async esqueciSenha(
    to: string,
    text: string,
    usuario: string
  ): Promise<void> {
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

      // await this.newEmail(usuario, to, subject, text, html);
      // await transporter.sendMail(mailOptions);
    } catch (error: any) {
      throw new Error(`Erro ao enviar e-mail de recuperação: ${error.message}`);
    }
  }
}

export default EmailService;
