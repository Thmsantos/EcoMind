import express from 'express';
type Request = express.Request;
type Response = express.Response;
import CalculoRepository from "../repository/CalculoRepository.ts";
import type { CalculoInterface } from "../interfaces/CalculoInterface.ts";
import { ObjectId } from "mongodb";
// import Calculo from "../Calculo.ts";
import RankingService from "../../Ranking/service/RankingService.ts";

class CalculoService {
  private calculoRepository: CalculoRepository;
  private rankingService: RankingService;

  constructor() {
    this.calculoRepository = new CalculoRepository();
    this.rankingService = new RankingService();
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
      const carbono = Number(consumoCarbono);
      const balanco = String(await this.searchBalanço(mes, userId, carbono));
  
      const calculoData: CalculoInterface = {
        idUser: userId,
        mes,
        ano,
        consumoGas,
        consumoEnergia,
        consumoTransporte,
        consumoCarbono,
        balanco,
      };
  
      await this.calculoRepository.createCalculo(calculoData);
      res.status(201).send({ success: true });
    } catch (error) {
      res.status(500).send({
        error: "Erro ao criar cálculo",
        details: (error as Error).message,
      });
    }
  }

  // private createRanking(emissao: string, idUser: ObjectId, mes: string, ano: string){
  //   const lastEmissao = this.searchEmissao(mes, idUser, ano);
  //   const points = this.calcPoints(lastEmissao, 0); 

  // }

  // private calcPoints(lastEmissao, currentEmissao){
    
  // }

  // private async fetchPoints(idUser: ObjectId){
  
  // }

  private async searchEmissao(mes: string, idUser: ObjectId, ano: string){
    const beforeMonth = await this.calcMonth(mes);

    const pipeline = [
      {
        $match: {
          idUser: new ObjectId(idUser),
          mes: beforeMonth,
          ano
        }
      }
    ];
  
    const result = await this.calculoRepository.searchCalculo(pipeline);

    if(result){
      return result.consumoCarbono;
    }

    return null;
  }

  private async searchBalanço(mes: string, idUser: ObjectId, emissão: number) {
    const beforeMonth = await this.calcMonth(mes);
    const pipeline = [
      {
        $match: {
          idUser: new ObjectId(idUser),
          mes: beforeMonth
        }
      }
    ];
  
    const result = await this.calculoRepository.searchCalculo(pipeline);
    if (result) {
      if (emissão > Number(result.consumoCarbono)) {
        return "negativo";
      } else if (emissão < Number(result.consumoCarbono)) {
        return "positivo";
      } else {
        return "idem";
      }
    }
  
    return "sem histórico";
  }

  private async calcMonth(mes: string) {
    const mesLower = mes.toLowerCase();
    const index = this.months.indexOf(mesLower);
  
    if (index < 0) {
      throw new Error(`Mês inválido: ${mes}`);
    }

    const previousIndex = (index - 1 + this.months.length) % this.months.length;
  
    const mesAnterior = this.months[previousIndex];
  
    return mesAnterior;
  }

  private months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ]

}

export default CalculoService;
