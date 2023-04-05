import ProductManager from "./manager/productManager.js";


const product = new ProductManager();

async function ejecutar () {
    
    const objeto2 = {
        title:'Teglado HP',
        description:'Español',
        price:965,
        thumbnail:'url',
        code:'HP630',
        stock:14,
    }

    // await product.addProduct(objeto4)
    // const newProd = await product.getProducts()
    // console.log(newProd);
    // const prodById = await product.getProductById(3);
    // const deleteProd = await product.deleteProduct(2)
    const updateProduct = await product.updateProduct(2, objeto2)
    console.log(updateProduct); 

}

ejecutar()
