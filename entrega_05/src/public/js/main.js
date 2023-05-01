const productForm = document.querySelector("#productForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const code = document.querySelector("#code");
const stock = document.querySelector("#stock");
const products = document.querySelector('#products');

productForm.addEventListener("submit", (e) => {
    e.preventDefault();


    if (savedId) {
        updateproduct(savedId, title.value, description.value, price.value, code.value, stock.value);
    } else {
        saveproduct(title.value, description.value, price.value, code.value, stock.value);
    }

    title.value = "";
    description.value = "";
    price.value = "";
    code.value = "";
    stock.value= "";

    title.focus();
});
