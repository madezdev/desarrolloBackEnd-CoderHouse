import  express  from "express";
import handlebars from 'express-handlebars';
import { Server as WebSocketServer } from "socket.io";
import http from 'http';

import Socktes from './sockets.js'
import __dirname from "./utiles.js";

import viewsRouter from './routers/views.router.js'
import productRouter from './routers/productRoutes.js'
import cartRoute from './routers/cartRoutes.js'

const app = express();
const server = http.createServer(app);
const io  = new WebSocketServer(server);


const PORT = process.env.PORT||8080;

server.listen(PORT, () =>{
    console.log('Server on PORT:', PORT);
})


app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Handlebars
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');


//Routes
app.use('/api/products', productRouter);
app.use('/api/cart', cartRoute);
app.use('/', viewsRouter)


Socktes(io)