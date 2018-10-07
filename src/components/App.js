import React, { Component } from 'react';
import Auctioneer from './Auctioneer.js';
import Bidder from './Bidder.js';
import LogIn from './LogIn.js';
import '../App.css';
/*Make Connection to the web socket at the backend
By making a socket for the frontend and connecting
to the backend socket*/
let socket = io.connect('https://still-ridge-99433.herokuapp.com/');

class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let view = this.props.role === 'bidder' ?
        <Bidder
            id={this.props.id}
            item={this.props.auctionItem}
            price={this.props.auctionItemPrice}
            updatePrice={this.props.updateAuctionItemPrice}
            socket = {socket}
        /> : this.props.role === 'auctioneer' ?
        <Auctioneer
            id={this.props.id}
            item={this.props.auctionItem}
            price={this.props.auctionItemPrice}
            updatePrice={this.props.updateAuctionItemPrice}
            updateItemName={this.props.updateAuctionItemName}
            socket = {socket}
        />:
        <LogIn
            role={this.props.role}
            login={this.props.login}
        />;

        return (
            <div>
                {view}
            </div>
        )
        
    }
}

//Listen for Events
socket.on('bid', (data) => {

    //Declare the elements we are going to alter with the new data from the server.
    let bidWindow = document.getElementById("bid-window");
    let auctionWindow = document.getElementById("auction-window");
    let feedback = document.getElementById('feedback');
    let priceHolder = document.getElementById('current-price');
    let bidButtons = document.getElementsByClassName('bid-button');
    let bids = document.getElementsByClassName('bid');
    let price = data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );
    
    //Dealing with the Bidders
    if(bidWindow){
        bidWindow.innerHTML += 
        '<div class="bid">' +
                '<h3>'+ data.item +'</h3>' +
                '<h4>$ <span class="price" value='+data.price+'>'+ price +'</span> - <span class="id" value='+data.id+'>'+data.id +'</span></h4>' +
        '</div>';
    
        //Move the scrollbar to keep up with the most recent bid
        bidWindow.scrollTop += 110;

        //Provide updated price to the bidder to bid again
        priceHolder.value = Math.abs(Math.round( (data.price) * 100) / 100);
        priceHolder.innerHTML = '$'+ priceHolder.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );

        //Provide Feedback for the Bidders when they are outbid
        let newBidId = bids[bids.length - 1].getElementsByClassName('id')[0].innerHTML;
        let bidderId = document.getElementById('bidder-id').innerHTML;
        if(bidderId != newBidId){
            feedback.innerHTML = '<p>You have been out bid by <em>'+ data.id +'</em>. Bid now to acquire the auction item.</p>'
        }else{
            feedback.innerHTML = '<p>You currently hold the highest bid'
        }

        //Update the bid button values & innerHTML
        bidButtons[0].value = Math.abs(Math.round( (data.price * 1.01) * 100) / 100);
        bidButtons[0].innerHTML = '$ ' + bidButtons[0].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );

        bidButtons[1].value = Math.abs(Math.round( (data.price * 1.1) * 100) / 100);
        bidButtons[1].innerHTML = '$ ' + bidButtons[1].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );

        bidButtons[2].value = Math.abs(Math.round( (data.price * 1.2) * 100) / 100);
        bidButtons[2].innerHTML = '$ ' + bidButtons[2].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );
    }
    //Dealing with the Auction Clerk
    if(auctionWindow){
        auctionWindow.innerHTML = 
        '<div class="auction-bid-status">' +
            '<h4>Current price:</h4>' +
            '<h4>$ '+ price +' - '+ data.id +'</h4>' +
        '</div>';
    
        //Move the scrollbar to keep up with the most recent bid
        auctionWindow.scrollTop += 110;
    }
});

socket.on('auctionStart', (data) => {
    //Declare the elements we are going to alter with the new data from the server.
    let bidWindow = document.getElementById("bid-window");
    let priceHolder = document.getElementById('current-price');
    let bidButtons = document.getElementsByClassName('bid-button');
	let price = data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );
    
    if(bidWindow){

        bidWindow.innerHTML = 
		'<div class="bid">' +
				'<h3 id="item-name">'+ data.item +'</h3>' +
				'<h4>Starting Bid: $ '+ price +'</h4>' +
		'</div>';
        //Move the scrollbar to keep up with the most recent bid
        bidWindow.scrollTop += 110;

        //Provide updated price to the bidder to bid again
        priceHolder.value = Math.abs(Math.round( (data.price) * 100) / 100);
        priceHolder.innerHTML = '$'+ priceHolder.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );

        //Update the bid button values & innerHTML
        bidButtons[0].value = Math.abs(Math.round( (data.price * 1.01) * 100) / 100);
        bidButtons[0].innerHTML = '$ ' + bidButtons[0].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );

        bidButtons[1].value = Math.abs(Math.round( (data.price * 1.1) * 100) / 100);
        bidButtons[1].innerHTML = '$ ' + bidButtons[1].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );

        bidButtons[2].value = Math.abs(Math.round( (data.price * 1.2) * 100) / 100);
        bidButtons[2].innerHTML = '$ ' + bidButtons[2].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );
}
});

export default App;