import { Request, Response, NextFunction } from "express";

// 404 Handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
};

// General Error Handler
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack || err.message || err);
  res.status(500).json({ error: "Internal server error" });
};
