import express from "express";
import { getUser } from "./userController.js";

const app = express();

app.get("/users/:id", getUser);

export default app;