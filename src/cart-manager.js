import fs from "fs";

class CartManager {
    static id;
    
    constructor (path){
        const arregloDeCarritos = [];
        CartManager.id = 0;
        this.path = path;
    } 

    async cargarCarritos (){
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.arregloDeCarritos = JSON.parse(data);

    }

    async guardarCarritos (){
        await fs.promises.writeFile(this.path, JSON.stringify(this.arregloDeCarritos, null, 2));
    }

    async addCart(){
        CartManager.id++
        
        const newCart = {
            id: CartManager.id,
            products: []
        }

        this.arregloDeCarritos.push (newCart);

        await this.guardarCarritos();
        return newCart;
    }

    async getCarritoById (cartId) {
        const cart = this.arregloDeCarritos.find( carrito => carrito.id == cartId);

        if (!cart){
            return console.log("No existe el carrito buscado.");
        }

        return cart;
    }

    async addProductsToCart (cartId, productId, quantity = 1){
        const cart = this.getCarritoById(cartId);
        const prodExists = cart.products.find(prod => productId == prod.product);

        if (prodExists){
            prodExists.quantity += quantity;
        } else {
            carrito.products.push ({producto:productId, quantity});
        }
        await this.guardarCarritos();
        return cart;
    }
}