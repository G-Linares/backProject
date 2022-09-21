import express from "express";
import handlebars from "express-handlebars";
import productRouter from "./Router/productRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;

// -------------------handlebars-------------

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs"
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

// -------------------handlebars-------------

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", productRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
