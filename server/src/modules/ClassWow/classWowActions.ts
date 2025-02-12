import type { RequestHandler } from "express";
import classWowRepository from "./classWowRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const classes = await classWowRepository.readAll();
    res.json(classes);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const wowClass = await classWowRepository.read(id);

    if (!wowClass) {
      res.sendStatus(404);
      return;
    }
    res.json(wowClass);
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
