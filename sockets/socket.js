const {io} = require('../index')

//mensajes io de socket.io
io.on("connection", client => { 
    console.log('Cliente conectado :D'); 
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado :(');
     });

     client.on('mensaje', (payload)=> {
        console.log("Mensaje!!!", payload);
        io.emit( 'mensaje', {admin: 'Nuevo mensaje'});
     });

     
 });