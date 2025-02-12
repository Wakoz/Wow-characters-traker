import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type ClassWow = {
  id: number;
  name: string;
};
class ClassRepository {
  async readAll() {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT *
    FROM class
    ORDER BY name
   `,
    );
    return rows as ClassWow[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT *
    FROM class
    WHERE id = ?
   `,
      [id],
    );
    return rows[0] as ClassWow;
  }
}

export default new ClassRepository();
