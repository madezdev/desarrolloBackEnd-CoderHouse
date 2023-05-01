import { Router } from "express";
import { ProductManager } from "../controllers/productManager.js";

const productManager = new ProductManager();
const productRouter = Router();


productRouter.get("/", async (req, res) => {
    
    try {
        const products = await productManager.getProducts()
        res.send(products)
    } catch (error) {
        res.send(error)
    }
})

productRouter.get("/limit=:limit", async (req, res) => {

    try {
        const limit = parseInt(req.params.limit);
    
        const resultado = await products.getProducts();
        const prodLimt = resultado.slice(0, limit)
    
        res.send(prodLimt)
    } catch (error) {
        console.log(error);
    }
})

productRouter.get("/pid:id", async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        console.log(id);
    
        const resultado = await productManager.getProductById(id)
    
        if (resultado) {
            res.send({ Producto: resultado })
        } else {
            res.send(`El producto con el id: ${req.params.id} no se encontro`)
        }
    } catch (error) {
        console.log(error);
    }
})

productRouter.post("/", async (req, res) => {

    try {
        const { title, description, price, thumbnail, code, stock } = req.body
        await productManager.addProduct({ title, description, price, thumbnail, code, stock })
        res.send("Producto creado")
    } catch (error) {
        console.log(error);
    }

})


productRouter.put("/pid:id", async (req, res) => {

    try {
        const id = req.params.id
        const { title, description, price, thumbnail, code, stock } = req.body
        const mensaje = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock })
    
        res.send(mensaje)
    } catch (error) {
        console.log(error);
    }
})

productRouter.delete("/pid:id", async (req, res) => {

    try {
        const id = req.params.id
        const mensaje = await productManager.deleteProduct(id)
        res.send(mensaje)
    } catch (error) {
        console.log(error);
    }
})


export default productRouter

