import express from 'express';
type Request = express.Request;
type Response = express.Response;
import CalculoRepository from "../repository/CalculoRepository.ts";
import type { CalculoInterface } from "../interfaces/CalculoInterface.ts";
import { ObjectId } from "mongodb";
// import Calculo from "../Calculo.ts";
import RankingService from "../../Ranking/service/RankingService.ts";
import UserService from '../../User/service/UserService.ts';

class CalculoService {
  private calculoRepository: CalculoRepository;
  private rankingService: RankingService;
  private userService: UserService;

  constructor() {
    this.calculoRepository = new CalculoRepository();
    this.rankingService = new RankingService();
    this.userService = new UserService();
  }

  public async createCalculo(req: Request, res: Response): Promise<void> {
    try {
      const { idUser } = req.params;
      const {
        mes,
        ano,
        consumoGas,
        consumoEnergia,
        consumoTransporte,
        consumoCarbono,
      } = req.body;

      const userId = new ObjectId(idUser);

      const calculoData: CalculoInterface = {
        idUser: userId,
        mes,
        ano,
        consumoGas,
        consumoEnergia,
        consumoTransporte,
        consumoCarbono,
      };

      await this.calculoRepository.createCalculo(calculoData);
      await this.createOrUpdateRanking(consumoCarbono, userId);
      res.status(201).send({ success: true });
    } catch (error) {
      res.status(500).send({
        error: "Erro ao criar cálculo",
        details: (error as Error).message,
      });
    }
  }

  private async createOrUpdateRanking(emissao: string, idUser: ObjectId) {
    const user = await this.userService.searchUser([
      { $match: { idUser: new ObjectId(idUser) } }
    ]);

    if (!user) return;

    const currentPoints = await this.fetchPoints(idUser);
    const emissionValue = Number(emissao);
    const earnedPoints = emissionValue <= 166 ? 7 : emissionValue <= 356 ? 2 : 0;
    if (earnedPoints === 0) return;

    const totalPoints = Number(currentPoints ?? 0) + earnedPoints;

    if (currentPoints != null) {
      await this.rankingService.atualizarRanking(user.usuario, totalPoints);
    } else {
      await this.rankingService.criarRanking(user.usuario, totalPoints);
    }
  }


  private async fetchPoints(idUser: ObjectId): Promise<Number | null> {
    const pipeline = [
      {
        $match: {
          idUser: new ObjectId(idUser),
        }
      }
    ]

    const result = await this.rankingService.getRanking(pipeline);

    return result ? result.pontos : null;
  }
}

export default CalculoService;
