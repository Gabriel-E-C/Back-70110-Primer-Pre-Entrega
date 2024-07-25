import express from "express";
import CartManager from "./cart-manager.js";
const router = express.Router();

const cartManager = new CartManager ("./src/Data/carts.json");

//Ruta post que crea un carro nuevo 
router.post ("/", async (req, res) => {
    const nuevoCarrito = await CartManager.nuevoCarrito();
    res.json (nuevoCarrito)
})

module.exports = router;