
import fs from 'fs'

export class ProductManager {
    constructor() {
        this.path = './products.json';
    }

    async addProduct(objeto) {

        try {
            //Verificacion si hay un dato incompleto
            if (!objeto.title || !objeto.description || objeto.category ||!objeto.price || !objeto.code || objeto.status) {
                console.log('Datos incompletos');
                return
            }
            //Verificacion de codigo de producto ya ingresado
            const products = await this.getProducts();
            products.forEach(prod => {

                if (prod.code === objeto.code) {
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
            return "Producto creado";

        } catch (error) {
            console.log(error);
        }

    }


    async getProducts() {

        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        }
        return [];
    }

    async getProductById(id) {

        try {

            const read = await fs.promises.readFile(this.path, 'utf-8');
            const data = JSON.parse(read);
            const productsById = data.find(prod => prod.id === id)

            if (!productsById) {
                return null
            }

            return productsById;

        } catch (error) {
            console.log(error);
        }

    }

    async updateProduct(id, { title, description, category, price, thumbnail, code, stock, status }) {

        try {

            const prodsJSON = await fs.promises.readFile(this.path, 'utf-8')
            const data = JSON.parse(prodsJSON)
            if (data.some(prod => prod.id === parseInt(id))) {
                let index = data.findIndex(prod => prod.id === parseInt(id))
                data[index].title = title
                data[index].description = description
                data[index].category = category
                data[index].price = price
                data[index].thumbnail = thumbnail
                data[index].code = code
                data[index].stock = stock
                data[index].status = status
                await fs.promises.writeFile(this.path, JSON.stringify(data))
                console.log(`Producto actualizado, codigo: ${code}`);
                return "Producto actualizado"
            }
            console.log(`Id no encontrado ${id}`);
            return "Producto no encontrado"
            
        } catch (error) {
            console.log(error);
        }

    }

    async deleteProduct(id) {

        try {
            const read = await fs.promises.readFile(this.path, 'utf-8');
            const data = JSON.parse(read);

            if (data.some(prod => prod.id === parseInt(id))) {
                const prodsFiltrados = data.filter(prod => prod.id !== parseInt(id))
                await fs.promises.writeFile(this.path, JSON.stringify(prodsFiltrados))
                console.log(`Producto eliminado, ID: ${id}`);
                return "Producto eliminado"
            }
            console.log(`ID no encontrado: ${id}`);
            return "Producto no encontrado"


        } catch (error) {
            console.log(error);
        }
    }


}