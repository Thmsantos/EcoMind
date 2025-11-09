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

  constructor() {
    this.calculoRepository = new CalculoRepository();
    this.rankingService = new RankingService();
    this.userService = new UserService();
    this.estatisticasService = new EstatisticasService();
  }

  public async createCalculo(calculo: CalculoInterface, idUser: string): Promise<InsertOneResult<CalculoInterface> | null> {
    const calculoData: CalculoInterface = {
      idUser: new ObjectId(idUser),
      mes: calculo.mes,
      ano: calculo.ano,
      consumoGas: calculo.consumoGas,
      consumoEnergia: calculo.consumoEnergia,
      consumoTransporte: calculo.consumoEnergia,
      consumoCarbono: calculo.consumoCarbono,
    };


    await this.estatisticasService.createStats({
      idUser: idUser,
      dataUser: {
        mes: calculo.mes,
        ano: calculo.ano,
        emissao: calculo.consumoCarbono
      }
    });

    const createdCalculo = await this.calculoRepository.createCalculo(calculoData);

    await this.createOrUpdateRanking(calculo.consumoCarbono, new ObjectId(idUser));

    return createdCalculo;
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

    await (
      currentPoints != null
        ? this.rankingService.atualizarRanking(user.usuario, totalPoints)
        : this.rankingService.criarRanking(user.usuario, totalPoints)
    );
  }


  private async fetchPoints(idUser: ObjectId): Promise<Number | null> {
    const pipeline = [{
      $match: {
        idUser: new ObjectId(idUser),
      }
    }]

    const result = await this.rankingService.getRanking(pipeline);
    return result ? result.pontos : null;
  }
}

export default CalculoService;
