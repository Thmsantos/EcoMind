import { Request, Response } from "express";
import EmailRepository from "../../Email/repository/EmailRepository.js";
import EsqueciSenhaRepository from "../repository/EsqueciSenhaRepository.js"
import EsqueciSenha from "../EsqueciSenha.js";
import { EsqueciSenhaInterface } from "../interfaces/esqueciSenhaInterface.js";
import UserRepository from "../../User/repository/UserRepository.js"
import 'dotenv/config'
import EmailService from "../../Email/service/emailService.js"
import { ObjectId } from "mongodb";

class EsqueciSenhaService {
    private emailRepository: EmailRepository;

    private esqueciSenhaRepository: EsqueciSenhaRepository;

    private userRepository: UserRepository;

    private emailService: EmailService;

    constructor() {
        this.emailRepository = new EmailRepository();
        this.esqueciSenhaRepository = new EsqueciSenhaRepository();
        this.userRepository = new UserRepository();
        this.emailService = new EmailService()
    }

    public async esqueciSenha(req: Request, res: Response): Promise<void> {
        try {
            const codigo = (Math.random() * 90000 + 10000) | 0;

            const {
                userId,
            } = req.body;

            const user = await this.userRepository.search(new ObjectId(String(userId)));
            const isExistsEsqueciSenha = await this.esqueciSenhaRepository.search(String(userId));

            if (!isExistsEsqueciSenha) {
                const instanceEsqueciSenha = new EsqueciSenha(
                    userId,
                    user.senha,
                    codigo
                );

                const esqueciSenha: EsqueciSenhaInterface = {
                    userId: instanceEsqueciSenha.getUserId(),
                    codigo: instanceEsqueciSenha.getCodigo(),
                    senhaAtual: instanceEsqueciSenha.getSenhaAtual(),
                    createdAt: instanceEsqueciSenha.getCreatedAt()
                }

                await this.esqueciSenhaRepository.create(esqueciSenha);
            } else {
                isExistsEsqueciSenha.codigo = codigo;
                isExistsEsqueciSenha.createdAt = new Date();

                await this.esqueciSenhaRepository.update(String(userId), isExistsEsqueciSenha)
            }

            await this.emailService.esqueciSenha(user.email, String(codigo), new ObjectId(String(userId)));
            res.status(200).send({ message: "Código de recuperação enviado por e-mail." });
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

            const esqueciSenha = await this.esqueciSenhaRepository.search(String(userId));
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

                    await this.esqueciSenhaRepository.update(String(esqueciSenha!.userId!), esqueciSenhaSemCodigo);
                    res.status(410).send({
                        error: "Código expirado",
                    })
                }

                if (codigo === esqueciSenha!.codigo) {
                    user.senha = senha;
                    await this.userRepository.updateUser(new ObjectId(String(userId)), user)
                    res.status(200).json({ message: 'senha atualizada' })
                } else {
                    res.status(410).send({
                        error: `código inválido`,
                    })
                }
            }
        } catch (error: unknown) {
            res.status(500).send({
                error: "Erro ao verificar codigo",
                details: (error as Error)?.message ?? String(error),
            });
        }
    }
}

export default EsqueciSenhaService;