let express = require('express');
let socket = require('socket.io');

//App setup

let app = express();


//create a server

let server = app.listen(4000, () => {
    console.log("listening to requests on port 4000");
});

//Static Files
app.use(express.static('../'));


//Socket setup
let io = socket(server);

io.on('connection', (socket) =>{
    console.log("Made a socket connection \n", socket.id);

    //listen to bids from the bidder
    socket.on('bid', (data) => {
        console.log(data.id);
        /*send the data sent from one client to all the other client connect through other sockets*/ 
        io.emit('bid', data);
        console.log("sent info!!!");
    });

    //listen to the starting price from the Auction Clerk
    socket.on('auctionStart', (data) => {
        socket.broadcast.emit('auctionStart', data);
        console.log('sent to all the sockets');
    });
});