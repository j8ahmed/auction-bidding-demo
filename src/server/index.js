let express = require('express');
let socket = require('socket.io');

//App setup

let app = express();


//create a server

let server = app.listen(4000, () => {
    console.log("listening to requests on port");
});

//Static Files
app.use(express.static('../'));


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
