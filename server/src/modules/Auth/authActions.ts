import type { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepository from "./authRepository";

const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await authRepository.create({
      email,
      password: hashedPassword,
    });

    const user = await authRepository.findByEmail(email);
    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authRepository.findByEmail(email);

    if (user == null || !(await bcrypt.compare(password, user.password))) {
      res.sendStatus(401);
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    next(err);
  }
};

export default { register, login };
