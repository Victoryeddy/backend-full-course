import express from "express";
import db from "../db.js";
import { handleError } from "../utilities/error.js";
const router = express.Router();

//GET todos for logged in users
router.get("/", (req, res) => {
  const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`);
  const todos = getTodos.all(req.userId);
  res.json({ data: todos });
});

router.post("/", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  try {
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task,completed) VALUES (?, ?, ?)`
    );
    const result = insertTodo.run(req.userId, task, 0);

    res.status(201).json({
      message: "Task Created Successfully",
      id: result.lastInsertRowid,
      task,
      completed: 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Update a todo for logged in users
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTodo = db.prepare(
      `UPDATE todos SET completed = ? WHERE id = ?`
    );
    updatedTodo.run(completed, id);
    res.json({ message: "Todo Completed" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

//Delete a todo for logged in users (We would opt in for a soft delete instead of hard delete, recommended by big organizations)
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  try {
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`);
    deleteTodo.run(id, req.userId);
    res.status(200).json({message: 'Todo Deleted Successfully'})
  } catch (err) {
    handleError(err,res)
  }
});

export default router;
