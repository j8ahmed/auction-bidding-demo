import React, { Component } from 'react';
import '../App.css';


class LogIn extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(){
        
    }
    handleClick(e){
        let role = e.target.value;
        let id = document.getElementById('user-id').value;
        this.props.login(role, id);
    }
    render(){
        
       
        return(
            <div className="login">
                
                <h2>Welcome</h2>
                <div className="login-form">
                    <label htmlFor="user-id">USER ID: </label>
                    <input id="user-id" type="text" placeholder="David123" />
                    <button className="login-button" onClick={this.handleClick} value="bidder">Login as Bidder</button>
                    <button className="login-button" onClick={this.handleClick} value="auctioneer">Login as Auction Clerk</button>
                </div>
               
            </div>
        )
    }
};

export default LogIn;