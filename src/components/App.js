import React, { Component } from 'react';
import '../App.css';

class App extends Component {
    render() {
        return (
            <div>
                <h1>My React Redux App</h1>
                <h2>By: {this.props.title}</h2>
            </div>
        )
        
    }
}

export default App;