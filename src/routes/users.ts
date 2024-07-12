// ./src/routes/users.ts
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import authMiddleware from "../middleware/auth-middleware";
import User from "../models/User";

dotenv.config();

const secret = process.env.JWT_SECRET || "Backup Secret";
const router = express.Router();

interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      username,
      password: hashedPassword
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).send("Invalid username or password.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid username or password.");

    const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: "1h" });
    res.send({ token });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

router.patch("/change-password", authMiddleware, async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findByPk(req.user!.id);
    if (!user) return res.status(404).send("User not found.");

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) return res.status(400).send("Invalid current password.");

    if (newPassword !== confirmPassword) return res.status(400).send("New passwords do not match.");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send("Password updated successfully.");
  } catch (error) {
    res.status(500).send("Error updating password");
  }
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const deletedUser = await User.destroy({ where: { id: userId } });

    if (deletedUser === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

export default router;
