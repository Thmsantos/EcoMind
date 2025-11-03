import RankingRepository from "../repository/RankingRepository.ts";
import type { RankingInterface } from "../interfaces/RankingInterface.ts";
import Ranking from "../Ranking.ts";
import { InsertOneResult, UpdateResult } from "mongodb";

class RankingService {
  private rankingRepository: RankingRepository;

  constructor() {
    this.rankingRepository = new RankingRepository();
  }

  public async criarRanking(user: string, pontos: number): Promise<InsertOneResult<RankingInterface> | null> {
    const ranking = new Ranking(
      pontos,
      user
    );

    const novoRanking: RankingInterface = {
      usuario: ranking.getUsuario(),
      pontos: pontos
    };

    const result = await this.rankingRepository.create(novoRanking);

    return result;
  }

  public async atualizarRanking(usuario: string, pontos: number): Promise<UpdateResult<RankingInterface> | null> {
    const resultado = await this.rankingRepository.update(usuario, pontos);

    return resultado;
  }

  public async getRanking(pip: any): Promise<RankingInterface | null> {
    const result = await this.rankingRepository.search(pip);

    return result;
  }
}

export default RankingService;
