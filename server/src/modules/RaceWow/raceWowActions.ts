// src/modules/RaceWow/raceWowActions.ts
import type { RequestHandler } from "express";
import raceWowRepository from "./raceWowRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const races = await raceWowRepository.readAll();
    res.json(races);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const race = await raceWowRepository.read(id);

    if (!race) {
      res.sendStatus(404);
      return;
    }
    res.json(race);
  } catch (err) {
    next(err);
  }
};

export default { browse, read };