const socket = io.connect();

const saveproduct = (title, description, price, code, stock) => {

    socket.emit('client:newproduct', {
        title,
        description,
        price,
        code,
        stock,
    })
};

socket.on('server:newproduct', data => {
    products.innerHTML += 'Nuevo producto'
})


const deleteproduct = (id) => {
    socket.emit("client:deleteproduct", id);
};

const updateproduct = (id, title, description, price, code, stock) => {
    socket.emit("client:updateproduct", {
        id,
        title,
        description,
        price,
        code,
        stock,
    });
};


socket.on("server:loadproducts", renderproducts);

socket.on("server:newproduct", appendproduct);

socket.on("server:selectedproduct", (product) => {
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const price = document.getElementById("price");
    const code = document.getElementById("code");
    const stoct = document.getElementById("stock");

    title.value = product.title;
    description.value = product.description;
    price.value = product.price;
    code.value = product.code;
    stoct.value = product.value;

    savedId = product.id;
});