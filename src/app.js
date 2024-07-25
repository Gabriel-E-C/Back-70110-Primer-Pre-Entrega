import express from "express";
import cartRouter from "./routes/carts.routes.js";

const app = express();
const PUERTO = 8080;

app.use(express.json());

app.use("/api/carts", cartRouter);

app.listen(PUERTO, ()=>{
    console.log (`Servidor escuchando en puerto: ${PUERTO}`);
})

