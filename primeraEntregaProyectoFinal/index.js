import express from "express";

import productRouter from "./src/routes/ProductRoutes.js";
import cartRoute from "./src/routes/CartRoutes.js";

const app = express()
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

//Routes
app.use('/api/products', productRouter);
app.use('/api/cart', cartRoute);

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})