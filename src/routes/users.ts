import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import authMiddleware from "../middleware/auth-middleware";

dotenv.config();

const secret = process.env.JWT_SECRET || "Backup Secret";

const router = express.Router();
const userDataPath = path.join(__dirname, "../data/users.json");

interface User {
  id: number;
  username: string;
  password: string;
}

interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}

const readUserData = (): { users: User[] } => {
  const data = fs.readFileSync(userDataPath, "utf8");
  return JSON.parse(data);
};

const writeUserData = (data: { users: User[] }): void => {
  fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2), "utf8");
};

router.post("/register", async (req: Request, res: Response) => {
  const data = readUserData();
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser: User = {
    id: data.users.length + 1,
    username,
    password: hashedPassword
  };
  data.users.push(newUser);
  writeUserData(data);
  res.status(201).send("User registered successfully");
});

router.post("/login", async (req: Request, res: Response) => {
  const data = readUserData();
  const { username, password } = req.body;
  const user = data.users.find((u) => u.username === username);
  if (!user) return res.status(400).send("Invalid username or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid username or password.");

  const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: "1h" });
  res.send({ token });
});

router.patch("/change-password", authMiddleware, async (req: AuthRequest, res: Response) => {
  const data = readUserData();
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const user = data.users.find((u) => u.id === req.user!.id);
  if (!user) return res.status(404).send("User not found.");

  const validPassword = await bcrypt.compare(currentPassword, user.password);
  if (!validPassword) return res.status(400).send("Invalid current password.");

  if (newPassword !== confirmPassword) return res.status(400).send("New passwords do not match.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  writeUserData(data);

  res.status(200).send("Password updated successfully.");
});

router.delete("/:id", authMiddleware, (req: Request, res: Response) => {
  const data = readUserData();
  const userId = parseInt(req.params.id);

  const userIndex = data.users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  const deletedUser = data.users.splice(userIndex, 1);
  writeUserData(data);

  res.status(200).send(deletedUser);
});

router.get("/", authMiddleware, (req: Request, res: Response) => {
  const data = readUserData();
  res.status(200).send(data.users);
});

export default router;
