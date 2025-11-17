import express from "express";
import { handleError } from "../utilities/error.js";
import prisma from "../prismaClient.js"

const router = express.Router();

//GET todos for logged in users
router.get("/", async(req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId
    }
  })
  res.json({ data: todos });
});

router.post("/", async (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  try {
    const todo = await prisma.todo.create({
      data: {
        task,
        userId: req.userId
      }
    })

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Update a todo for logged in users
router.put("/:id", async(req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
        userId: req.userId
      },
      data: {
        completed: !!completed
      }
    })
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

//Delete a todo for logged in users (We would opt in for a soft delete instead of hard delete, recommended by big organizations)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
    
  try {
     await prisma.todo.delete({
      where: {
        id: parseInt(id),
        userId: req.userId
      }
     })
    res.status(200).json({message: 'Todo Deleted Successfully'})
  } catch (err) {
    handleError(err,res)
  }
});

export default router;
