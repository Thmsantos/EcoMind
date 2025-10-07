import express from 'express';
type Request = express.Request;
type Response = express.Response;
import RankingRepository from "../repository/RankingRepository.ts";
import type { RankingInterface } from "../interfaces/RankingInterface.ts";
import { ObjectId } from "mongodb";
import Ranking from "../Ranking.ts";

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

      const novoRanking: RankingInterface = {
        usuario: ranking.getUsuario(),
        pontos: pontos
      };

      await this.rankingRepository.create(novoRanking);
      res.status(201).send({ success: true });
    } catch (error: any) {
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
    } catch (error: any) {
      res.status(500).send({
        error: "Erro ao criar usuário",
        details: error.message,
      });
    }
  }

  public async getRanking(id: ObjectId): Promise<void> {
    try {
      const resultado = await this.rankingRepository.search();
    } catch (error) {
      throw Error('Error in fetch ranking')
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
    } catch (error: any) {
      res.status(500).send({
        error: "Erro ao buscar ranking do usuário",
        details: error.message,
      });
    }
  }
}

export default RankingService;
