import type { Request, RequestHandler } from "express";
import charactersRepository from "./charactersRepository";

interface AuthRequest extends Request {
  userId?: number;
}

const browse: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    if (!req.userId) {
      res.send(401);
      return;
    }

    const character = await charactersRepository.readAll(req.userId);
    res.json(character);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const character = await charactersRepository.read(id);

    if (!character || character.user_id !== req.userId) {
      res.sendStatus(404);
      return;
    }
    res.json(character);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const { name, class_id, level, server_id } = req.body;

    if (!req.userId) {
      res.sendStatus(401);
      return;
    }
    const id = await charactersRepository.create({
      name,
      class_id,
      level,
      server_id,
      user_id: req.userId,
    });
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const { id, name, class_id, level, server_id } = req.body;
    if (!req.userId) {
      res.sendStatus(401);
      return;
    }
    await charactersRepository.update({
      id,
      name,
      class_id,
      level,
      server_id,
      user_id: req.userId,
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);

    if (!req.userId) {
      res.sendStatus(401);
      return;
    }

    const affectedRows = await charactersRepository.delete(id, req.userId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, update, remove };
