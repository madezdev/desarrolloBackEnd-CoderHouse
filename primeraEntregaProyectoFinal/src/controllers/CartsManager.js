import fs from 'fs';


export class CartManager {

    constructor() {
        this.path = './src/file/cart.json'
    }

    async createCart() {

        try {
            
            
            const cartJSON = await fs.promises.readFile(this.path, "utf-8");
            const cart = JSON.parse(cartJSON);
            let id;
            cart.length === 0 ? (id = 1) : (id = cart[cart.length - 1].id + 1);
    
            const carrito = {
    
                id: id,
                products: []
            }
    
            cart.push(carrito);
            await fs.promises.writeFile(this.path, JSON.stringify(cart))
            return `Carrito creado con ID: ${id}`

        } catch (error) {
            console.log(error);
        }

    }

    async getCartById(id) {

        try {
            
            const cartJSON = await fs.promises.readFile(this.path, "utf-8");
            const carts = JSON.parse(cartJSON);
    
            let Id = parseInt(id);
    
            if (carts.some(cart => cart.id === Id)) {
                return carts.find(cart => cart.id === Id)
            }
            return "Carrito no encontrado"

        } catch (error) {
            console.log(error);
        }

    }

    async addProductCart(idProd, idCart) {

        const cartJSON = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartJSON);

        const listProductsJSON = await fs.promises.readFile('./products.json',"utf-8")
        const listProducts = JSON.parse(listProductsJSON)
        
        const parsedId = parseInt(idProd);
        const parsedIdCart = parseInt(idCart);

        if(!listProducts.find(product => product.id === parsedId)){

            return `El producto no exixte ID: ${idProd}`
        }


        const carrito = carts.find((cart) => cart.id === parsedIdCart);
        const product = carrito.products.find((product) => product.id === parsedId);

        if (product) {
            product.quantity ++;
        } else {
            const addProd = { id: parsedId, quantity: 1 }
            carrito.products.push(addProd);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");
        }

        const cartIndex = carts.findIndex((cart) => cart.id === parsedIdCart);
        carts[cartIndex] = carrito;

        await fs.promises.writeFile(this.path, JSON.stringify(carts));

        return "Producto agregado al carrito";
    }
}

