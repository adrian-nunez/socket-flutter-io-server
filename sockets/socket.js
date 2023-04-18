const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Metallica' ) );
bands.addBand( new Band( 'PT' ) );
bands.addBand( new Band( 'Rush' ) );



//mensajes io de socket.io
io.on("connection", client => { 
    console.log('Cliente conectado :D'); 

    client.emit( 'active-bands', bands.getBands() );
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado :(');
     });

     client.on('mensaje', (payload)=> {
        console.log("Mensaje!!!", payload);
        io.emit( 'mensaje', {admin: 'Nuevo mensaje'});
     });

     client.on('emitir-mensaje', (payload)=> {
        io.emit( 'nuevo-mensaje', payload); // emite a todos
        client.broadcast.emit( 'nuevo-mensaje', payload); // emite a todos menos el emisor
     });

     client.on('emitir-flutter', (payload)=> {
        console.log("Mensaje!!!", payload);
     });

     client.on('vote-band', function( payload )
     {
         bands.voteBand(payload.id);
         io.emit('active-bands', bands.getBands());
     });
     
     client.on('add-band', function( payload )
     {
         bands.addBand(new Band(payload.name));
         io.emit('active-bands', bands.getBands());
     });

     client.on('delete-band', function( payload )
     {
         bands.deleteBand(payload.id);
         io.emit('active-bands', bands.getBands());
     });

 });