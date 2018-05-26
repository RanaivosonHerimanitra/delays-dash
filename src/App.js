import React, { Component } from 'react';
import RetardForm from './RetardForm'

class App extends Component {
  
  render() {
    return (
      <div>
      <div className="container">
      <div className="jumbotron">
        <h1>Impact des retards Dashboard</h1>
        </div>
      </div>
      <RetardForm />
      </div>

    );
  }
}

export default App;
