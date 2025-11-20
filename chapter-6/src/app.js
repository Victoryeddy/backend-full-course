import express from "express";

import connectToDB from "./database/db.js";
import ProductRoutes from "./routes/product.route.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parses form data into json object

app.use("/products", ProductRoutes);


connectToDB();

export default app;
