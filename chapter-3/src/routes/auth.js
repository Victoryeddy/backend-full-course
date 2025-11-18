import express from "express";
import bcrypt from "bcryptjs"; //Creates encoding for ensuring security of the application.
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }
  //hashed password
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const insertUser = db.prepare(
      `INSERT INTO users (username, password) VALUES (?, ?)`
    );
    const result = insertUser.run(username, hashedPassword);

    const defaultTodo = `Hello :) Add your first todo!`;
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task, completed) VALUES (?, ?, ?)`
    );
    insertTodo.run(result.lastInsertRowid, defaultTodo, 0);
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      token,
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

router.post("/login", (req, res) => {
  const {username, password} = req.body;
  try {
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username);
    if(!user) {
     return res.status(404).json({message: 'User not Found'})
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if(!passwordMatch) return res.status(401).json({message: 'Invalid Password'});
    if(passwordMatch){
      const token = jwt.sign({id: user.id},  process.env.JWT_SECRET,
        { expiresIn: "24h" })  
      return res.status(200).json({message: 'Login Successful', token: token, user: {name: user.username}});
    } 
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;
