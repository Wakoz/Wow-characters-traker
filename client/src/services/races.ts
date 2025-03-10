// src/services/races.ts
import { ENDPOINTS } from "./config";
import { getToken } from "./auth";
import type { WowRace } from "../types";

export const getAllRaces = async (): Promise<WowRace[]> => {
  const token = getToken();
  const response = await fetch(ENDPOINTS.RACES.BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Impossible de charger les races");

  return response.json();
};

export const getRaceById = async (id: number): Promise<WowRace> => {
  const token = getToken();
  const response = await fetch(`${ENDPOINTS.RACES.BASE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Impossible de charger la race");

  return response.json();
};

export const getRacesByFaction = async (faction: 'Alliance' | 'Horde' | 'Neutre'): Promise<WowRace[]> => {
  const races = await getAllRaces();
  return races.filter(race => race.faction === faction);
};

export const getAllFactions = () => {
  return ['Alliance', 'Horde', 'Neutre'] as const;
};