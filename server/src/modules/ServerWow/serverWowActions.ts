import type { RequestHandler } from "express";
import serverWowRepository from "./serverWowRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const servers = await serverWowRepository.readAll();
    res.json(servers);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const server = await serverWowRepository.read(id);

    if (!server) {
      res.sendStatus(404);
      return;
    }
    res.json(server);
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
