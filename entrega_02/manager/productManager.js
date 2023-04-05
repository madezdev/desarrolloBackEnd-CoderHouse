
import fs from 'fs';

export default class ProductManager{
    constructor(){
        this.path = './file/products.json';
    }

    async addProduct(objeto){

        try {
            //Verificacion si hay un dato incompleto
            if(!objeto.title||!objeto.description||!objeto.price||!objeto.thumbnail||!objeto.code){
                console.log('Datos incompletos');
                return
            }
            //Verificacion de codigo de producto ya ingresado
            const products = await this.getProducts();
            products.forEach(prod => {
                
                if(prod.code === objeto.code){
                    console.log(`Producto existente, code: ${prod.code}`);      
                }   
            });
            //Se verifica el ultimo id y se le asigna el consecutivo
            let id;
            products.length === 0 ? (id = 1) : (id = products[products.length - 1].id + 1);
            const newProducto = { ...objeto, id };
            products.push(newProducto);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
            console.log(`Producto agregado, Codigo: ${objeto.code}`);
            return newProducto.id;           
            
        } catch (error) {
            console.log(error);
        }

    }
            
            
    async getProducts(){

        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        }
      return [];
    }

    async getProductById(id){

        try {
            
            const read = await fs.promises.readFile(this.path,'utf-8');
            const data = JSON.parse(read);
    
            const productsById = data.find( prod =>  prod.id === id)
    
            if (!productsById) {
                return null
            }
    
            return productsById;

        } catch (error) {
            console.log(error);
        }


    }

    async updateProduct(id, objeto){

        try {

            const read = await fs.promises.readFile(this.path,'utf-8');
            const data = JSON.parse(read);
    
            const newList = data.filter( prod => prod.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newList, null, 2), "utf-8");
            const newProducto = { ...objeto, id };
            data.push(newProducto);
            data.sort( (a, b ) => a.id - b.id)
    
            return data
            
        } catch (error) {
            console.log(error);
        }

    }

    async deleteProduct(id){

        try {
            const read = await fs.promises.readFile(this.path,'utf-8');
            const data = JSON.parse(read);
    
            const newList = data.filter( prod => prod.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newList, null, 2), "utf-8");
            return newList;
            
        } catch (error) {
            console.log(error);
        }

    }
}
