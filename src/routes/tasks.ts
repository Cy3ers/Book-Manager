// ./src/routes/tasks.ts
import express, { Request, Response } from "express";
import authMiddleware from "../middleware/auth-middleware";
import Task from "../models/Task";

const router = express.Router();

interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}

router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  const { title, description, status, priority } = req.body;
  const userId = req.user!.id;

  try {
    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      userId
    });
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send("Error creating task");
  }
});

router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id; // Use non-null assertion operator if user is guaranteed to exist

  try {
    const tasks = await Task.findAll({ where: { userId } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

router.put("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  const { title, description, status, priority } = req.body;
  const taskId = parseInt(req.params.id);
  const userId = req.user!.id;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).send("Task not found.");

    if (task.userId !== userId) return res.status(403).send("Unauthorized access to task.");

    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    await task.save();

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send("Error updating task");
  }
});

router.delete("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  const taskId = parseInt(req.params.id);
  const userId = req.user!.id;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).send("Task not found.");

    if (task.userId !== userId) return res.status(403).send("Unauthorized access to task.");

    await task.destroy();
    res.status(200).send("Task deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting task");
  }
});

export default router;
