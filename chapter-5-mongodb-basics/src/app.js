import express from "express";

import connectToDB from "./database/db.js";
import books from "./routes/books.route.js";

const app = express();

app.use(express.json());

app.use("/books", books);

connectToDB();

export default app;
