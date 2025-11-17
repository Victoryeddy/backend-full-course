import express from "express";
import bcrypt from "bcryptjs"; //Creates encoding for ensuring security of the application.
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js"

const router = express.Router();

router.post("/register", async(req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }
  //hashed password
  const hashedPassword = bcrypt.hashSync(password, 8);
  //   console.log({ username, password, hashedPassword });
  try {
     
    const user = await prisma.user.create({
      data: {
        username,
        hashedPassword
      }
    })

    const defaultTodo = `Hello :) Add your first todo!`;
    
    await prisma.todo.create({
      data: {
        task: defaultTodo,
        userId: user.id
      }
    })

    const token = jwt.sign(
      { id: user.id },
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

router.post("/login", async(req, res) => {
  const {username, password} = req.body;
  try {
    const user = await prisma.user.findUnique({
      where : {
       username: username
      }
    })
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
    res.sendStatus(503);
  }
});

export default router;
