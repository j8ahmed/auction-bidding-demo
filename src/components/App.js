import React, { Component } from 'react';
import '../App.css';



class App extends Component {
    render() {
        return (
            <div>
               <h1>My React Redux App</h1>
               <h3> By: {this.props.title}</h3>
               
            </div>
        )
        
    }
}

export default App;