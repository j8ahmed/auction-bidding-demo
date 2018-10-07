const express = require('express');
const socket = require('socket.io');

//App Setup
const app = express();
const port = process.env.PORT || 3000;


// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//create a server

let server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

//Static Files
app.use(express.static( __dirname ));


//Socket setup
let io = socket(server);

io.on('connection', (socket) =>{
    console.log(socket.id);

    //listen to bids from the bidder
    socket.on('bid', (data) => {
        /*send the data sent from one client to all the other client connect through other sockets*/ 
        io.emit('bid', data);
    });

    //listen to the starting price from the Auction Clerk
    socket.on('auctionStart', (data) => {
        socket.broadcast.emit('auctionStart', data);
    });
});
