import React, { Component } from 'react';


class Auctioneer extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            price: 0
        }
    }
    handleChange(e){
        this.setState({
            price: e.target.value
        });
    }
    handleClick(){
        let id = this.props.id;
        let item = document.getElementById('auction-item').value;
        let price = this.state.price;
        let feedback = document.getElementById('feedback');
        //Check to ensure that the price is in fact a number
        if(!price.match(/^[0-9\.]+$/g)){
            feedback.innerHTML = '<p style="color: red">The price must be a number with no symbols or spaces EX: 100000 .</p>';
            return;
        }else{
            feedback.innerHTML = '';
        }
        
        //Check the price to ensure that it is not a negative value
        price = price < 0 ? 0 : Math.abs(Math.round(price * 100) / 100);

        //update the state for the item name and price.
        this.props.updateItemName(item);
        this.props.updatePrice(price);

        //Send the starting bid to the server to be shared in real time to the other bidders
        this.props.socket.emit('auctionStart', {
            id: id,
            item: item,
            price: price
        });

        document.getElementById('auction-window').innerHTML =
            '<div class="auction-bid-status">' +
                '<h4>Current price:</h4>' +
                '<h4>$ '+ price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," ) +' - '+ id +'</h4>' +
            '</div>';
        
    }
    render(){
        //Add commas to the price for easier UX
        let price = this.props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," );

        let button = this.props.item == '' ? <button onClick={this.handleClick}>Auction</button> : '';
       

        return(
            <div className="window">
                <h4>Auction Clerk: {this.props.id}</h4>
                <div className="controls">
                    <div className="form-item">
                        <label htmlFor="auction-item">Auction Item: </label>
                        <input id="auction-item" type="text" placeholder="Item Name" />
                    </div>
                    <div className="form-item">
                        <label htmlFor="auction-start-price">Starting Price: </label>
                        <input id="auction-start-price" type="text" placeholder="75000" 
                        value={this.state.price}
                        onChange={this.handleChange}
                        />
                    </div>
                
                    {button}
                </div>
                <div id="feedback"></div>
                <div id="auction-window"></div>
            </div>
        )
    }
};

export default Auctioneer;