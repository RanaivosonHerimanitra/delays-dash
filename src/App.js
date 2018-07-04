import React, { Component ,Fragment} from 'react';
import RetardForm from './RetardForm'
class App extends Component {

  render() {
    return (
      
      <Fragment>
         <div className="container">
         <div className="jumbotron">
           <h2>Simulateur d'Impact des retards Dashboard</h2>
           <p>Retour en mode nominal</p>
        </div>
        </div>
        <RetardForm  />
           
      </Fragment>
      
      
      

    );
  }
}

export default App;
