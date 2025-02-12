import type { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: number;
}

const verifyToken: RequestHandler = (req: AuthRequest, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.sendStatus(401);
      return;
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.sendStatus(500);
      return;
    }
    const decoded = jwt.verify(token, jwtSecret) as {
      userId: number;
    };

    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

export default verifyToken;
