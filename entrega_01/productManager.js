

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
