import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Character = {
  id: number;
  name: string;
  class_id: number;
  race_id: number;
  class_name?: string;
  race_name?: string;
  level: number;
  server_id: number;
  server_name?: string;
  user_id: number;
  faction?: 'Alliance' | 'Horde' | 'Neutre';
};

class CharacterRepository {
  async create(character: Omit<Character, "id" | "class_name" | "race_name" | "server_name">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [classRows] = await connection.execute<Rows>(
        `SELECT id 
        FROM class 
        WHERE id = ?
        `,
        [character.class_id],
      );

      const [serverRows] = await connection.execute<Rows>(
        `SELECT id 
        FROM server 
        WHERE id = ?
        `,
        [character.server_id],
      );

      const [raceRows] = await connection.execute<Rows>(
        `SELECT id 
        FROM race 
        WHERE id = ?
        `,
        [character.race_id],
      );

      if (!classRows[0] || !serverRows[0] || !raceRows[0]) {
        throw new Error("Invalid class_id, race_id or server_id");
      }

      const [result] = await connection.execute<Result>(
        `INSERT INTO \`character\` 
          (name, class_id, race_id, level, server_id, user_id) 
        VALUES 
          (?, ?, ?, ?, ?, ?)
        `,
        [
          character.name,
          character.class_id,
          character.race_id,
          character.level,
          character.server_id,
          character.user_id,
        ],
      );

      await connection.commit();
      return result.insertId;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async read(id: number) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT c.*, cl.name as class_name, s.name as server_name, r.name as race_name, r.faction
      FROM \`character\` c 
      INNER JOIN class cl ON c.class_id = cl.id 
      INNER JOIN server s ON c.server_id = s.id
      INNER JOIN race r ON c.race_id = r.id
      WHERE c.id = ?
      `,
      [id],
    );
    return rows[0] as Character;
  }

  async readAll(userID: number) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT c.*, cl.name as class_name, s.name as server_name, r.name as race_name, r.faction
      FROM \`character\` c 
      INNER JOIN class cl ON c.class_id = cl.id 
      INNER JOIN server s ON c.server_id = s.id
      INNER JOIN race r ON c.race_id = r.id
      WHERE c.user_id = ?
      `,
      [userID],
    );
    return rows as Character[];
  }

  async update(character: Character) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [classRows] = await connection.execute<Rows>(
        `SELECT id 
        FROM class 
        WHERE id = ?
        `,
        [character.class_id],
      );

      const [serverRows] = await connection.execute<Rows>(
        `SELECT id 
        FROM server 
        WHERE id = ?
        `,
        [character.server_id],
      );

      const [raceRows] = await connection.execute<Rows>(
        `SELECT id 
        FROM race 
        WHERE id = ?
        `,
        [character.race_id],
      );

      if (!classRows[0] || !serverRows[0] || !raceRows[0]) {
        throw new Error("Invalid class_id, race_id or server_id");
      }

      await connection.execute(
        `UPDATE \`character\` 
        SET name = ?, class_id = ?, race_id = ?, level = ?, server_id = ? 
        WHERE id = ? AND user_id = ?
        `,
        [
          character.name,
          character.class_id,
          character.race_id,
          character.level,
          character.server_id,
          character.id,
          character.user_id,
        ],
      );

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async delete(id: number, userID: number) {
    const [result] = await databaseClient.execute<Result>(
      `DELETE 
      FROM \`character\` 
      WHERE id = ? AND user_id = ?
      `,
      [id, userID],
    );
    return result.affectedRows;
  }
}

export default new CharacterRepository();