import { v4 as uuid } from "uuid";
import { ProductManager } from "./controllers/productManager.js";


const prod = new ProductManager()
let products = [];

export default (io) => {
    io.on("connection", (socket) => {
        // console.log(socket.handshake.url);
        console.log("nuevo socket connectado:", socket.id);

        // Envia todos los mensajes al cliente
        socket.emit("server:loadproducts", products);

        socket.on("client:newproduct", (newproduct) => {
            const product = { ...newproduct, id: uuid() };
            products.push(product);
            io.emit("server:newproduct", product);
            prod.addProduct(product)
        });

        socket.on("client:deleteproduct", (productId) => {
            console.log(productId);
            prod.deleteProduct(productId)
            products = products.filter((product) => product.id !== productId);
            io.emit("server:loadproducts", products);
        });

        socket.on("client:getproduct", (productId) => {
            const product = products.find((product) => product.id === productId);
            socket.emit("server:selectedproduct", product);
        });

        socket.on("client:updateproduct", (updatedproduct) => {
            products = products.map((product) => {
                if (product.id === updatedproduct.id) {
                    product.title = updatedproduct.title;
                    product.description = updatedproduct.description;
                }
                return product;
            });
            io.emit("server:loadproducts", products);
        });

        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        });
    });
};