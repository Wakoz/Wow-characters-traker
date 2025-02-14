import Joi from "joi";
import type { Request, Response, NextFunction } from "express";

const authSchema = {
  register: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email invalide",
      "any.required": "Email requis",
    }),
    password: Joi.string().min(12).required().messages({
      "string.min": "Mot de passe de 12 caractères minimum",
      "any.required": "Mot de passe requis",
    }),
  }),
  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email invalide",
      "any.required": "Email requis",
    }),
    password: Joi.string().min(12).required().messages({
      "any.required": "Mot de passe requis",
    }),
  }),
};

const validateAuth = (type: "register" | "login") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationSchema = authSchema[type];
      await validationSchema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        const errors = error.details.map((detail) => ({
          field: detail.path[0],
          message: detail.message,
        }));
        res.status(400).json({ errors });
      }
      return next(error);
    }
  };
};

export default validateAuth;
