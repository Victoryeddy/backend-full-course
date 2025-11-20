import express from "express";

import connectToDB from "./database/db.js";
import books from "./routes/books.route.js";
import users from "./routes/user.route.js";
import uploads from "./routes/upload.route.js"
import authMiddleWare from "./middleware/auth.middleware.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parses form data into json object

app.use("/books", books);

app.use("/users", users);

app.use('/upload', authMiddleWare, uploads);

connectToDB();

export default app;
