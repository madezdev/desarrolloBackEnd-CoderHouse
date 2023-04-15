import  express  from "express";
import ProductManager from "./manager/productManager.js";


const app = express();
const PORT = 8080;
const products = new ProductManager();


app.get('/products', async (req, res) => {

    const prod = await products.getProducts();

    res.send({ Productos: prod})
})

app.get('/products/limit=:limit', async (req, res) => {

    const  limit  = parseInt( req.params.limit);

    const resultado = await products.getProducts();
    const prodLimt = resultado.slice(0,limit)

    res.send( prodLimt)
})


app.get('/products/pid:id', async (req, res) => {

    const id = parseInt(req.params.id) ;
    console.log(id);
    
    const resultado = await products.getProductById(id)

    if(resultado){
        res.send({Producto: resultado})
    }else{
        res.send(`El producto con el id: ${req.params.id} no se encontro`)
    }

})

app.get('*', (req, res) => {

    res.send('404|Pagina no encontrada')
} )


const server = app.listen(PORT, () => console.log(`Listen on port: ${PORT}`))

server.on('error', error => console.log(`Error en servidor ${error}`))


