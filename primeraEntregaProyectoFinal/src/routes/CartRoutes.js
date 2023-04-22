import { Router } from "express";
import { CartManager } from "../controllers/CartsManager.js";

const cart = new CartManager();
const cartRoute = Router();


cartRoute.post('/', async (req, res) => {

    const newCart = await cart.createCart();
    res.send(newCart)
      
})

cartRoute.get('/cid:id', async (req, res) => {

    const id = parseInt(req.params.id);
    const resultado = await cart.getCartById(id);
    res.send(resultado)

})

cartRoute.post('/cid:cid/product/pid:pid', async (req,res) => {

    const idCart = parseInt(req.params.cid);
    const idProd = parseInt(req.params.pid);

    const addProd = await cart.addProductCart(idProd, idCart)
    res.send(addProd)
})

export default cartRoute;