import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Server = {
  id: number;
  name: string;
};

class ServerRepository {
  async readAll() {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT *
      FROM server
      ORDER BY name
      `,
    );
    return rows as Server[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT *
      FROM server
      WHERE id = ?
      `,
      [id],
    );
    return rows[0] as Server;
  }
}

export default new ServerRepository();
