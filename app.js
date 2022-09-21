import express from "express";
import productRouter from "./Router/productRouter.js";
import expressLayouts from "express-ejs-layouts";

const app = express();
const PORT = process.env.PORT || 8080;

// -------------------EJS-------------
app.use(expressLayouts);
app.set("view engine", "ejs");
// -------------------EJS-------------

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", productRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
