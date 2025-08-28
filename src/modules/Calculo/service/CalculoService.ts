import { Request, Response } from "express";
import CalculoRepository from "../repository/CalculoRepository.js";
import { CalculoInterface } from "../interfaces/calculoInterface.js";
import { ObjectId } from "mongodb";
import Calculo from "../Calculo.js";

class CalculoService {
  private calculoRepository: CalculoRepository;

  constructor() {
    this.calculoRepository = new CalculoRepository();
  }

  public async createCalculo(req: Request, res: Response): Promise<void> {
    try {
      const { idUser } = req.params;
      const { mes, consumoGas, consumoEnergia, consumoTransporte, consumoCarbono } = req.body;

      const balanco = String(await this.searchBalanço(mes, new ObjectId(idUser), Number(consumoCarbono)));
      const calculo = new Calculo(
        new ObjectId(idUser),
        mes,
        consumoEnergia,
        consumoGas,
        consumoTransporte,
        consumoCarbono,
        balanco
      );

      const calculoData: CalculoInterface = {
        idUser: calculo.getidUser(),
        mes: calculo.getMes(),
        consumoCarbono: calculo.getconsumoCarbono(),
        consumoEnergia: calculo.getconsumoEnergia(),
        consumoGas: calculo.getconsumoGas(),
        consumoTransporte: calculo.getconsumoTransporte(),
        balanco: calculo.getBalanco(),
      };

      await this.calculoRepository.createCalculo(calculoData);
      res.status(201).send({ success: true });
    } catch (error) {
      res.status(500).send({
        error: "Erro ao criar calculo",
        details: error.message,
      });
    }
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
