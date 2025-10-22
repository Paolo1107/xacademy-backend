import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../db/models/User";

export async function login(req: Request, res: Response) {

    const { email, password } = req.body as { email?: string; password?: string };

    console.log("LOGIN body:", req.body);

    // validamos minimamente
    if (!email || !password) {
        return res.status(400).json({ message: "email y password son requeridos" });
    }

    // Buscamos un usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // comparamos contrasenas hasheadas
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generamos el token (JWT)
    const token = jwt.sign(
        { sub: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET ?? "change-me",
        { expiresIn: "2h" }
    );

    return res.json({ token });

}