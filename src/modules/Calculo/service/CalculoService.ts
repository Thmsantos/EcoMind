import CalculoRepository from "../repository/CalculoRepository.ts";
import type { CalculoInterface } from "../interfaces/CalculoInterface.ts";
import { InsertOneResult, ObjectId } from "mongodb";
import RankingService from "../../Ranking/service/RankingService.ts";
import UserService from '../../User/service/UserService.ts';
import EstatisticasService from '../../Estatisticas/service/EstatisticasService.ts';

class CalculoService {
  private calculoRepository: CalculoRepository;
  private rankingService: RankingService;
  private userService: UserService;
  private estatisticasService: EstatisticasService;

  constructor(
    userService: UserService,
    rankingService: RankingService
  ) {
    this.calculoRepository = new CalculoRepository();
    this.rankingService = rankingService;
    this.userService = userService;
    this.estatisticasService = new EstatisticasService();
  }

  public async createCalculo(calc: CalculoInterface, idUser: string): Promise<InsertOneResult<CalculoInterface> | null> {
    const calcData: CalculoInterface = {
      idUser: new ObjectId(idUser),
      month: calc.month,
      year: calc.year,
      gasEmission: calc.gasEmission,
      energyEmissiom: calc.energyEmissiom,
      vehicleEmission: calc.vehicleEmission,
      carbonEmission: calc.carbonEmission,
    };

    await this.estatisticasService.createStats({
      idUser: idUser,
      dataUser: {
        month: calc.month,
        year: calc.year,
        carbonEmission: calc.carbonEmission
      }
    });

    const createdCalculo = await this.calculoRepository.createCalculo(calcData);

    await this.createOrUpdateRanking(calc.carbonEmission, new ObjectId(idUser));

    return createdCalculo;
  }

  private async createOrUpdateRanking(emission: string, idUser: ObjectId) {
    const searchedUser = await this.userService.searchUser([
      { $match: { idUser: new ObjectId(idUser) } }
    ]);

    if (!searchedUser) return;

    const currentPoints = await this.fetchPoints(idUser);
    const emissionValue = Number(emission);
    const earnedPoints = emissionValue <= 166 ? 7 : emissionValue <= 356 ? 2 : 0;
    if (earnedPoints === 0) return;

    const totalPoints = Number(currentPoints ?? 0) + earnedPoints;

    await (
      currentPoints != null
        ? this.rankingService.updateRanking(searchedUser.user, totalPoints)
        : this.rankingService.createRanking(searchedUser.user, totalPoints)
    );
  }

  private async fetchPoints(idUser: ObjectId): Promise<Number | null> {
    const pipeline = [{ $match: { idUser: new ObjectId(idUser) } }]

    const result = await this.rankingService.getRanking(pipeline);
    return result ? result.pontos : null;
  }
}

export default CalculoService;
