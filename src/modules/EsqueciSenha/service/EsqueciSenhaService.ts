import express from 'express';
type Request = express.Request;
type Response = express.Response;
import EsqueciSenhaRepository from "../repository/EsqueciSenhaRepository.ts";
import EsqueciSenha from "../EsqueciSenha.ts";
import type { EsqueciSenhaInterface } from "../interfaces/esqueciSenhaInterface.ts";
import UserRepository from "../../User/repository/UserRepository.ts";
import 'dotenv/config';
import EmailService from "../../Email/service/emailService.ts";
import { ObjectId } from "mongodb";

class EsqueciSenhaService {
    private esqueciSenhaRepository: EsqueciSenhaRepository;
    private userRepository: UserRepository;
    private emailService: EmailService;

    constructor() {
        this.esqueciSenhaRepository = new EsqueciSenhaRepository();
        this.userRepository = new UserRepository();
        this.emailService = new EmailService();
    }

    public async esqueciSenha(req: Request, res: Response): Promise<void> {
        try {
            const { usuario } = req.body;

            if (!usuario) {
                res.status(400).send({ error: "usuario invalido." });
                return;
            }

            const codigo = (Math.random() * 90000 + 10000) | 0;
            const user = await this.userRepository.search(usuario);

            if (!user) {
                res.status(404).send({ error: "Usuário não encontrado." });
                return;
            }

            const isExistsEsqueciSenha = await this.esqueciSenhaRepository.search(usuario);

            if (!isExistsEsqueciSenha) {
                const instanceEsqueciSenha = new EsqueciSenha(
                    usuario,
                    user.senha,
                    codigo
                );

                const esqueciSenha: EsqueciSenhaInterface = {
                    usuario: instanceEsqueciSenha.getUsuario(),
                    codigo: instanceEsqueciSenha.getCodigo(),
                    senhaAtual: instanceEsqueciSenha.getSenhaAtual(),
                    createdAt: instanceEsqueciSenha.getCreatedAt()
                };

                await this.esqueciSenhaRepository.create(esqueciSenha);
            } else {
                isExistsEsqueciSenha.codigo = codigo;
                isExistsEsqueciSenha.createdAt = new Date();

                await this.esqueciSenhaRepository.update(usuario, isExistsEsqueciSenha);
            }

            await this.emailService.esqueciSenha(user.email, String(codigo), usuario);

            res.status(200).send({ message: "Código de recuperação enviado por e-mail." });

        } catch (error: unknown) {
            console.error("Erro em esqueciSenha:", error);
            res.status(500).send({
                error: "Erro ao criar esqueci senha",
                details: (error as Error)?.message ?? String(error),
            });
        }
    }

    public async verificarCodigo(req: Request, res: Response): Promise<void> {
        try {
            const { codigo, senha, userId, usuario } = req.body;

            if (!codigo || !senha || !userId || !ObjectId.isValid(userId)) {
                res.status(400).send({ error: "Dados inválidos ou incompletos." });
                return;
            }

            const esqueciSenha = await this.esqueciSenhaRepository.search(usuario);
            const user = await this.userRepository.search(usuario);

            if (!esqueciSenha || !user) {
                res.status(404).send({ error: "Usuário ou código não encontrado" });
                return;
            }

            const timeCreated = esqueciSenha.createdAt;
            const timeNow = new Date();
            const difference = Math.floor((timeNow.getTime() - timeCreated!.getTime()) / 60000);

            if (difference > 2) {
                const { codigo, createdAt, ...esqueciSenhaSemCodigo } = esqueciSenha;
                await this.esqueciSenhaRepository.update(String(userId), esqueciSenhaSemCodigo);

                res.status(410).send({ error: "Código expirado" });
                return;
            }

            if (codigo === esqueciSenha.codigo) {
                user.senha = senha;
                await this.userRepository.updateUser(new ObjectId(String(userId)), user);

                res.status(200).json({ message: 'Senha atualizada com sucesso.' });
            } else {
                res.status(410).send({ error: "Código inválido." });
            }

        } catch (error: unknown) {
            console.error("Erro em verificarCodigo:", error);
            res.status(500).send({
                error: "Erro ao verificar código",
                details: (error as Error)?.message ?? String(error),
            });
        }
    }
}

export default EsqueciSenhaService;
