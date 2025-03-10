// src/modules/RaceWow/raceWowRepository.ts
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

export type WowRace = {
  id: number;
  name: string;
  faction: 'Alliance' | 'Horde' | 'Neutre';
};

class RaceRepository {
  async readAll() {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT *
      FROM race
      ORDER BY faction, name
      `,
    );
    return rows as WowRace[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT *
      FROM race
      WHERE id = ?
      `,
      [id],
    );
    return rows[0] as WowRace;
  }
}

export default new RaceRepository();