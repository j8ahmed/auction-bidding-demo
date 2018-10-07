import React, { Component } from 'react';
import Auctioneer from './Auctioneer.js';
import Bidder from './Bidder.js';
import LogIn from './LogIn.js';
import '../App.css';
import auction from '../auction.js';

class App extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){

    }
    render() {
        let view = this.props.role === 'bidder' ?
        <Bidder
            id={this.props.id}
            item={this.props.auctionItem}
            price={this.props.auctionItemPrice}
            updatePrice={this.props.updateAuctionItemPrice}
        /> : this.props.role === 'auctioneer' ?
        <Auctioneer
            id={this.props.id}
            item={this.props.auctionItem}
            price={this.props.auctionItemPrice}
            updatePrice={this.props.updateAuctionItemPrice}
            updateItemName={this.props.updateAuctionItemName}
        />:
        <LogIn
            role={this.props.role}
            login={this.props.login}
        />;

        return (
            <div>
                {view}
                <script src={auction}></script>
            </div>
        )
        
    }
}

export default App;