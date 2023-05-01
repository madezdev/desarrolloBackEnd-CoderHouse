const productsList = document.querySelector("#products");

let savedId = "";

const productUI = (product) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${product.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${product.id}">delete</button>
              <button class="btn btn-secondary update" data-id="${product.id}">update</button>
          </div>
      </div>
      <p>${product.description}</p>
      <p>Precio:$ ${product.price}</p>
      <p>Codigo del producto: ${product.code}</p>
      <p>Stock: ${product.stock}</p>
  </div>
`;
    const btnDelete = div.querySelector(".delete");
    const btnUpdate = div.querySelector(".update");

    btnDelete.addEventListener("click", () => deleteproduct(btnDelete.dataset.id));

    btnUpdate.addEventListener("click", () => {
        socket.emit("client:getproduct", btnUpdate.dataset.id);
    });

    return div;
};

const renderproducts = (products) => {
    savedId = "";
    productsList.innerHTML = "";
    console.log(products);
    products.forEach((product) => {
        productsList.append(productUI(product));
    });
};

const appendproduct = (product) => {
    productsList.append(productUI(product));
};