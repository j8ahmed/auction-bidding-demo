import React, { Component } from 'react';


class Bidder extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            customBid: 0
        }
    }
    handleChange(e){
        this.setState({
            customBid: e.target.value
        });
    }
    handleClick(e){
        let id = this.props.id;
        let item = document.getElementById('item-name').innerHTML;
        let currentBid = document.getElementById('current-price').value;
        let bid = e.target.value;
        let feedback = document.getElementById('feedback');
        
        //Check to ensure that the price is in fact a number
        if(!bid.match(/^[0-9\.]+$/g)){
            feedback.innerHTML = '<p style="color: red">The bid must be a number with no symbols or spaces EX: 100000 .</p>';
            return;
        }else{
            feedback.innerHTML = '';
        }
        //Check the bid to ensure that it is not a negative value
        bid < 0 ? bid = 0 :
         bid = Math.abs(Math.round(bid * 100) / 100); 

        //Check the bid to ensure that it is greater than the current bid
        if(bid <= currentBid){
            feedback.innerHTML = '<p style="color: red">You must place a bidder higher than $ <strong>'+ currentBid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," ) +'</strong></p>';
            return;
        }

        //update the price in the state (although this is currently not necessary)
        this.props.updatePrice(bid);

        //Send the bid to the server to be shared in real time to the auction clerk and other bidders
        this.props.socket.emit('bid', {
            socketId: this.props.socket.id,
            id: id,
            item: item,
            price: bid
        });
        
    }
    render(){
        //Compare the recent bid with the user's last bid before providing feedback
        // let bidValue = 
        // let feedback;


        return(
            <div className="window">
                <h4>Bidder: <span id="bidder-id">{this.props.id}</span> <br/>Current Price: <span id="current-price"></span></h4>
                <div id="bid-window"></div>
                <div id="feedback"></div>
                <div className="controls">
                    <div className="form-item bid-options">
                        <button className="bid-button" onClick={this.handleClick}>Bid: $ {}</button>
                        <button className="bid-button" onClick={this.handleClick}>Bid: $ {}</button>
                        <button className="bid-button" onClick={this.handleClick}>Bid: $ {}</button>
                    </div>
                    <div className="form-item">
                        <label htmlFor="auction-start-price">Custom Price: </label>
                        <input id="custom-bid" type="number" onChange={this.handleChange} placeholder="$50,000" />
                    </div>
                
                    <button onClick={this.handleClick} value={this.state.customBid}>Bid Custom $</button>
                </div>              
                
            </div>
        )
    }
};

export default Bidder;