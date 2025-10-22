import { param, query } from "express-validator";

export const listPlayersValidator = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("page debe ser >= 1"),

    query("pageSize")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("pageSize 1..100"),

    query("gender")
        .optional()
        .isIn(["male", "female"])
        .withMessage("gender inválido"),

    query("version")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 10 }),

    query("name")
        .optional()
        .isString()
        .trim(),

    query("club")
        .optional()
        .isString()
        .trim(),

    query("position").
        optional()
        .isString()
        .trim()
];

export const getPlayerValidator = [
    param("id").isInt({ min: 1 }).withMessage("id debe ser numérico >= 1"),
    query("gender")
        .optional()
        .isIn(["male", "female"]).withMessage("gender inválido"),
    query("version").optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 10 })

]
