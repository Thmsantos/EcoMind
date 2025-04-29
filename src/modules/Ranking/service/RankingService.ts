import { Request, Response } from "express";
import RankingRepository from "../repository/RankingRepository.js";
import { IRanking } from "../interfaces/rankingInterface.js";
import { ObjectId } from "mongodb";
import Ranking from "../Ranking.js"; // Vou assumir que você tem uma classe Ranking

class RankingService {
  private rankingRepository: RankingRepository;

  constructor() {
    this.rankingRepository = new RankingRepository();
  }

  public async criarRanking(req: Request, res: Response): Promise<void> {
    try {
      const { usuario, pontos } = req.body;
        console.log("claudia")
      // Criando novo Ranking com ObjectId gerado
      const ranking = new Ranking(
        new ObjectId(), // id
        usuario,        // usuario
        pontos          // pontos
      );

      const novoRanking: IRanking = {
        id: ranking.getId(),
        usuario: ranking.getUsuario(),
        pontos: pontos
      };

      await this.rankingRepository.criar(novoRanking);
      res.status(201).send({ success: true });
    } catch (error) {
      res.status(500).send({
        error: "Erro ao criar ranking",
        details: (error as Error).message,
      });
    }
  }

  public async atualizarRanking(req: Request, res: Response): Promise<void> {
    try {
      const { id, pontos } = req.body;

      const objectId = new ObjectId(id); // Converte o id para ObjectId corretamente
      const resultado = await this.rankingRepository.atualizar(objectId, pontos);

      if (resultado) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).send({
        error: "Erro ao atualizar ranking",
        details: (error as Error).message,
      });
    }
  }
}

export default RankingService;
