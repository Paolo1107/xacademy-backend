import { body, param } from "express-validator";

export const createMyPlayerValidator = [
  body("long_name").isString().trim().notEmpty(),
  body("player_positions").isString().trim().notEmpty(),
  body("club_name").optional().isString().trim(),
  body("nationality_name").optional().isString().trim(),

  body("overall_rating").isInt({ min: 0, max: 100 }),
  body("pace").isInt({ min: 0, max: 100 }),
  body("shooting").isInt({ min: 0, max: 100 }),
  body("passing").isInt({ min: 0, max: 100 }),
  body("dribbling").isInt({ min: 0, max: 100 }),
  body("defending").isInt({ min: 0, max: 100 }),
  body("physic").isInt({ min: 0, max: 100 }),

  body("gender").isIn(["male","female"]),
  body("fifa_version").isString().trim().notEmpty()
];

export const updateMyPlayerValidator = [
  param("id").isInt({ min: 1 }),

  body("long_name").optional().isString().trim().notEmpty(),
  body("player_positions").optional().isString().trim().notEmpty(),
  body("club_name").optional().isString().trim(),
  body("nationality_name").optional().isString().trim(),

  body("overall_rating").optional().isInt({ min: 0, max: 100 }),
  body("pace").optional().isInt({ min: 0, max: 100 }),
  body("shooting").optional().isInt({ min: 0, max: 100 }),
  body("passing").optional().isInt({ min: 0, max: 100 }),
  body("dribbling").optional().isInt({ min: 0, max: 100 }),
  body("defending").optional().isInt({ min: 0, max: 100 }),
  body("physic").optional().isInt({ min: 0, max: 100 }),

  body("gender").optional().isIn(["male","female"]),
  body("fifa_version").optional().isString().trim().notEmpty()
];
