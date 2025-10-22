// src/modules/auth/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.header("Authorization");
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "change-me");

    // Aseguramos que es un objeto (JwtPayload) y contiene al menos 'sub'
    if (typeof decoded === "object" && decoded !== null && "sub" in decoded) {
      const payload = decoded as JwtPayload & { email?: string; role?: string };

      // sub puede venir como string; lo convertimos a number si corresponde
      const subRaw = payload.sub;
      const sub =
        typeof subRaw === "string" ? Number.parseInt(subRaw, 10) : Number(subRaw);

      if (!Number.isFinite(sub)) {
        return res.status(401).json({ message: "Token inválido" });
      }

      const email = (payload.email ?? "") as string;
      const role = (payload.role ?? "user") as "admin" | "user";

      // ahora sí, colocamos el user en el request (tipado en express.d.ts)
      req.user = { sub, email, role };
      return next();
    }

    return res.status(401).json({ message: "Token inválido" });
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
