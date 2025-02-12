import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  password: string;
};
class AuthRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.execute<Result>(
      "insert into user (email, password) values (?, ?)",
      [user.email, user.password],
    );
    return result.insertId;
  }

  async findByEmail(email: string) {
    const [rows] = await databaseClient.execute<Rows>(
      "select * from user where email = ?",
      [email],
    );
    return rows[0] as User;
  }
}

export default new AuthRepository();
