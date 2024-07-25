import fs from "fs";

class ProductManagger {
   
    static id = 0;
    
    constructor (path) {
        this.arregloDeProductos = [];
        this.path = path;
    };

    async guardarEnArchivo (data){
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
    }

    async leerDesdeArchivo (){
        const datos = await fs.promises.readFile(this.path, "utf-8");
        console.log ("----------Contenido del archivo sin parsear-----------")
        console.log (datos);
        //const respuesta = await JSON.parse(datos);
        //return respuesta
        return datos
    }

    async getProducts () {
        const productos = this.leerDesdeArchivo();
        return productos
        //return this.arregloDeProductos;
    };

    async addProduct (title, description, price, thumbnail, code, stock) {    
        
        if (this.arregloDeProductos.some(elem => elem.code == code)){
        // No se por que pero DEBO ACORDARME QUE: Si escribo la linea 27 de la siguiente manera:
        // if (this.arregloDeProductos.some((elem)=> {elem.code == product.code})){ NO FUNCIONA!!!!
        // el mmetodo de arreglo some me da siempre undefined
        // No se supone que son lo mismo pero una está simplificada su escritura y nada mas???
            console.log("El código del elemento está repetido. No se agregará al arreglo de productos.")
        } else {
            ProductManagger.id++;
            const product = {
                id: ProductManagger.id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }

            this.arregloDeProductos.push(product);
            await this.guardarEnArchivo (this.arregloDeProductos);
            //await fs.promises.writeFile(this.path, JSON.stringify(this.arregloDeProductos, null, 2));
        }
        //return this.arregloDeProductos;
    };

    getProductById (id) {
        const productoBuscado = this.arregloDeProductos.find(elem=>elem.id == id)
        if (productoBuscado){
            return productoBuscado;
        } else {
            console.log ("No se encontró ningún producto con la ID especificada.")
        }
    };

    updateProduct (idProductoPorActualizar, campo, valor) {
        productoPorActualizar = this.arregloDeProductos.find(elem => elem.id == idProductoPorActualizar)
        productoPorActualizar.campo = valor;
    };

    deleteProduct (idProductoParaBorrar) {
        const indiceProductoParaBorrar = this.arregloDeProductos.findIndex(elem=>elem.id == idProductoParaBorrar)

        return this.arregloDeProductos.splice(indiceProductoParaBorrar,1);
    }
}

const managerDeProductos = new ProductManagger ("./Data/productos.json");

//console.log(managerDeProductos.getProducts());

const testearGetProducts = async () => {
    let listaDeProductos = await managerDeProductos.getProducts();
    return console.log (listaDeProductos)
}



managerDeProductos.addProduct("Comandante Cobra", "Personaje de la serie GI Joe, comandante de las fuerzas del mal.", 8500, "Path de la foto Cobra.", "11111", 50);

managerDeProductos.addProduct("Destro", "Personaje de la serie GI Joe, segundo al mando en las fuerzas del mal.", 6500, "Path de la foto Destro.", "11112", 35);

managerDeProductos.addProduct("Destro", "Personaje de la serie GI Joe, segundo al mando en las fuerzas del mal.", 6500, "Path de la foto Destro.", "11112", 35);

managerDeProductos.addProduct("Ninja Blanco", "Personaje de la serie Rambo.", 7500, "Path de la foto Ninja.", "11113", 27);

testearGetProducts ();

// console.log(managerDeProductos.getProductById(3));

// managerDeProductos.deleteProduct(2);

// console.log(managerDeProductos.getProducts());

