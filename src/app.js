import Express from "express";
import productRouter from "./routes/product.routes.js";
import cartsRouter from "./routes/cart.routes.js";

const app = Express();
const PUERTO = 8080;

app.use(Express.json());
app.use(Express.urlencoded({extended: true}));

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

app.listen(PUERTO,() => {
    console.log (`El servidor está escuchando en el puerto: ${PUERTO}`)
});