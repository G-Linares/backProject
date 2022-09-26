import express from "express";
import { ping } from "../Controllers/carritoRouter.js";

const carritoRouter = express.Router();

carritoRouter.get("/ping", ping);

export default carritoRouter;
