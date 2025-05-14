import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("Erro não tratado:", err);

  if (err instanceof Error) {
    res.status(500).json({ error: "Erro interno do servidor", message: err.message });
  } else {
    res.status(500).json({ error: "Erro desconhecido" });
  }
}