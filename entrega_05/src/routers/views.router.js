import { Router } from "express";

import { ProductManager } from "../controllers/productManager.js";


const prod = new ProductManager();
const router = Router()

router.get('/', async (req, res) => {

    const products = await prod.getProducts()

    res.render('home', {
        products,
        css: 'home'
    })

})

router.get('/realtimeproducts', async (req, res) => {

    res.render('realTimeProducts',{
        css: 'realTimeProducts'
    })
})


export default router;