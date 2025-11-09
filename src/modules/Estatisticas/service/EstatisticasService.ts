import { InsertOneResult } from "mongodb";
import { EstatisticasData } from "../EstatisticasData";
import EstatisticasRepository from "../repository/EstatisticasRepository"

class EstatisticasService {
    private estatisticasRepostiory: EstatisticasRepository;

    constructor() {
        this.estatisticasRepostiory = new EstatisticasRepository();
    }

    public async createStats(stats: EstatisticasData): Promise<InsertOneResult<EstatisticasData> | null>{
        const createdStats = await this.estatisticasRepostiory.createEstatisticas(stats);

        return createdStats;
    }

    public async searchEstatisticas(pip: any): Promise<EstatisticasData | null> {
        const findedStats = await this.estatisticasRepostiory.searchEstatisticas(pip);

        return findedStats;
    }
}

export default EstatisticasService