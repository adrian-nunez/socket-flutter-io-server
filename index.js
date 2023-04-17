//importa el .env
require('dotenv').config();
 
 
//const { errorMonitor } = require("events");
//Se instancia el express
const express = require('express');
const app = express();
 
//se importa la lib del path
const path = require('path');
 
//se crea el servidor node
const httpServer = require("http").createServer(app);
 
 
//se importa el socket.io
module.exports.io = require("socket.io")(httpServer);

require('./sockets/socket');
 

 
//path publico
const publicPath = path.resolve(__dirname, 'public' );
app.use(express.static(publicPath));
 
 
//listen server in port
 httpServer.listen(process.env.PORT, (err)=>{
    if(err)throw new Error(err);
    console.log('Servidor corriendo en puerto!!', process.env.PORT);
 });