

class ProductManager {
    constructor(){

        this.products = [];
    }

    getProducts = () => {

        return this.products;
    }

    getProductById = (id) => {

        const item = this.products.filter( prod => prod.id === id )

        return item
    }

    addProduct = ({ title, description, price, thumbnail, code, stock }) =>{

        if(!title||!description||!price||!thumbnail||!code||!stock){
            
            console.log('incomplete data');
            return null;
        }

        for (let i = 0; i< this.products.length; i++) {
          
            if (this.products[i].code === code) {
                console.log(`Codigo repetido ${code} no se puede agregar el producto ${title}`);
                return
            }
           
        }

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if( this.products.length === 0){
            product.id = 1;
        }else{
            
            const lastProduct = this.products[this.products.length - 1];
            product.id = lastProduct.id + 1;

        }

        this.products.push(product);

    }

}

const carne = new ProductManager();

const testProduct = {
    title: 'Carne',
    description: 'Novillo',
    price:1500,
    thumbnail:'no aplica',
    code: 'AA20',
    stock:100,
}

const testProduct2 = {
    title: 'Pollo',
    description: 'Pechuga',
    price:500,
    thumbnail:'no aplica',
    code: 'AA20',
    stock:100,
}

carne.addProduct(testProduct)
carne.addProduct(testProduct2)

console.log(carne.getProducts());
// console.log(carne.getProductById(2));