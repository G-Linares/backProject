import express from "express";
import pug from "pug";
import productRouter from "./Routes/productRouter.js";

const app = express();
const PORT = process.env.PORT || 8080;

// -------------------PUG-------------

app.set("view engine", "pug");
app.set("views", "./views");

// -------------------PUG-------------

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", productRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
