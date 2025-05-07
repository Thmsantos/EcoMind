import { Request, Response } from "express";
import RankingRepository from "../repository/RankingRepository.js";
import { IRanking } from "../interfaces/rankingInterface.js";
import { ObjectId } from "mongodb";
import Ranking from "../Ranking.js";

class RankingService {
  private rankingRepository: RankingRepository;

  constructor() {
    this.rankingRepository = new RankingRepository();
  }

  public async criarRanking(req: Request, res: Response): Promise<void> {
    try {
      const { usuario, pontos } = req.body;

      const ranking = new Ranking(
        usuario,
        pontos
      );

      const novoRanking: IRanking = {
        usuario: ranking.getUsuario(),
        pontos: pontos
      };

      await this.rankingRepository.create(novoRanking);
      res.status(201).send({ success: true });
    } catch (error) {
      res.status(500).send({
        error: "Erro ao criar usuário",
        details: error.message,
      });
    }
  }

  public async atualizarRanking(req: Request, res: Response): Promise<void> {
    try {
      const { id, pontos } = req.body;

      const objectId = new ObjectId(String(id));
      const resultado = await this.rankingRepository.update(objectId, pontos);

      if (resultado) {
        res.status(200).json({ success: true });
        return;
      }

      res.status(404).json({ message: "Usuário não encontrado" });
    } catch (error) {
      res.status(500).send({
        error: "Erro ao criar usuário",
        details: error.message,
      });
    }
  }

  public async getRanking(res: Response): Promise<void> {
    try {
      const resultado = await this.rankingRepository.search();
      res.status(200).json({ resultado });
    } catch (error) {
      res.status(500).send({
        error: "Erro ao buscar dados do Ranking",
        details: error.message,
      });
    }
  }

  public async getRankingByUser(req: Request, res: Response): Promise<void> {
    try {
      const { usuario } = req.body;
      const resultado = await this.rankingRepository.searchByUser(usuario);

      if (resultado) {
        res.status(200).json({ resultado })
      } else {
        res.status(404).json({ message: "Usuário não encontrado!" })
      }
    } catch (error) {
      res.status(500).send({
        error: "Erro ao buscar ranking do usuário",
        details: error.message,
      });
    }
  }
}

export default RankingService;
