import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import productRouter from "./Routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/api/productos", productRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
