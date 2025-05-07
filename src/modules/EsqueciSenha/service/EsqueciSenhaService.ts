import { Request, Response } from "express";
import EmailRepository from "../../Email/repository/EmailRepository.js";
import EsqueciSenhaRepository from "../repository/EsqueciSenhaRepository.js"
import EsqueciSenha from "../EsqueciSenha.js";
import { EsqueciSenhaInterface } from "../interfaces/esqueciSenhaInterface.js";
import UserRepository from "../../User/repository/UserRepository.js"
import 'dotenv/config'
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
import { transporter } from "../../../config/mailer.js";

class EsqueciSenhaService {
    private emailRepository: EmailRepository;

    private esqueciSenhaRepository: EsqueciSenhaRepository;

    private userRepository: UserRepository;

    constructor() {
        this.emailRepository = new EmailRepository();
        this.esqueciSenhaRepository = new EsqueciSenhaRepository();
        this.userRepository = new UserRepository();
    }

    public async esqueciSenha(req: Request, res: Response): Promise<void> {
        try {
            const codigo = (Math.random() * 90000 + 10000) | 0;

            const {
                userId,
            } = req.body;

            const user = await this.userRepository.search(new ObjectId(String(userId)));
            const isExistsEsqueciSenha = await this.esqueciSenhaRepository.search(new ObjectId(String(userId)));

            if (!isExistsEsqueciSenha) {
                const instanceEsqueciSenha = new EsqueciSenha(
                    userId,
                    user.senha,
                    codigo
                );

                instanceEsqueciSenha.setSenhasAntigas(user.senha);

                const esqueciSenha: EsqueciSenhaInterface = {
                    userId: instanceEsqueciSenha.getUserId(),
                    codigo: instanceEsqueciSenha.getCodigo(),
                    senhasAntigas: instanceEsqueciSenha.getSenhasAntigas(),
                    senhaAtual: instanceEsqueciSenha.getSenhaAtual(),
                    createdAt: instanceEsqueciSenha.getCreatedAt()
                }

                await this.esqueciSenhaRepository.create(esqueciSenha);
            } else {
                isExistsEsqueciSenha.codigo = codigo;
                isExistsEsqueciSenha.createdAt = new Date();

                await this.esqueciSenhaRepository.update(new ObjectId(String(userId)), isExistsEsqueciSenha)
            }

            const mailOptions = {
                from: String(process.env.SMTP_USER),
                to: user.email,
                subject: 'Teste de Envio de E-mail',
                text: 'Este é um e-mail de teste enviado utilizando o Nodemailer.',
                html: '<p>Este é um e-mail de teste enviado utilizando o Nodemailer.</p>',
            };

            const t = await transporter.sendMail(mailOptions)
            console.log("Preview URL: " + nodemailer.getTestMessageUrl(t));

            const newEmail = {
                userId: new ObjectId(String(userId)),
                from: mailOptions.from,
                to: mailOptions.to,
                subject: mailOptions.subject,
                text: mailOptions.text,
                html: mailOptions.html
            }

            await this.emailRepository.send(newEmail)

            res.status(200).send(nodemailer.getTestMessageUrl(t))
        } catch (error: unknown) {
            res.status(500).send({
                error: "Erro ao criar esqueci senha",
                details: (error as Error)?.message ?? String(error),
            });
        }
    }

    public async verificarCodigo(req: Request, res: Response): Promise<void> {
        try {
            const { codigo, senha, userId } = req.body;

            const esqueciSenha = await this.esqueciSenhaRepository.search(new ObjectId(String(userId)));
            const user = await this.userRepository.search(new ObjectId(String(userId)));
            
            if (!esqueciSenha || !user) {
                res.status(404).send({ error: "Usuário ou código não encontrado" });
            } else {


                const timeCreated = esqueciSenha!.createdAt;
                const timeNow = new Date();
                const difference = Math.floor((timeNow.getTime() - timeCreated!.getTime()) / 60000);

                if (difference > 2) {
                    const { codigo, createdAt, ...esqueciSenhaSemCodigo
                    } = esqueciSenha;

                    await this.esqueciSenhaRepository.update(esqueciSenha!.id!, esqueciSenhaSemCodigo);
                    res.status(410).send({
                        error: "Código expirado",
                    })
                }

                if (codigo === esqueciSenha!.codigo) {
                    const verifySenha = this.verificarSenhaAntiga(senha, esqueciSenha!);

                    if (!verifySenha) {
                        user.senha = senha;
                        await this.userRepository.updateUser(new ObjectId(String(userId)), user)
                    }

                    res.status(410).send({
                        error: "Senha já utilizada",
                    })
                }

                res.status(410).send({
                    error: `código inválido, status`,
                })
            }
        } catch (error: unknown) {
            res.status(500).send({
                error: "Erro ao verificar codigo",
                details: (error as Error)?.message ?? String(error),
            });
        }
    }

    private async verificarSenhaAntiga(senha: string, esqueciSenha: EsqueciSenhaInterface): Promise<boolean> {
        const isNew = esqueciSenha.senhasAntigas!.includes(senha);
        return isNew;
    }
}

export default EsqueciSenhaService;