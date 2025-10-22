import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: { sub: number; email: string; role: "admin" | "user" };
  }
}

export {};
