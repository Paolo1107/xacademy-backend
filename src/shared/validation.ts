import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Middleware que maneja errores de validación de express-validator
export function handlevalidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();

}