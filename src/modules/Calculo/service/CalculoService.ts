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
      const { mes, consumoGas, consumoEnergia, consumoTransporte, consumoCarbono, balanco } = req.body;

      const calculo = new Calculo(
        new ObjectId(String(idUser)),
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

}

export default CalculoService;
