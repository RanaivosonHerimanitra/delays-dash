import  React, { Component } from 'react';
import { VictoryChart, VictoryLine,VictoryScatter } from 'victory';
import Papa from 'papaparse'

class RetardPreditChart extends Component {
    constructor() {
      super();
      this.state = {
        interpolation: "basis",
        train: [],
        Date: [],
        count : [],
        polar: false
      };
      // load data using paparse ==>ok
      //charge la correspondance arret train(codeVoyage)
     var correspondance_train_arret = require("./data/arret_train.csv");
     Papa.parse(correspondance_train_arret, {
       header: true,
       download: true,
       skipEmptyLines: true,
       complete: this.loadTrain
     })
      //selection of the train ID as props
      //update of data
    }
    // when props from the parent RetardForm component changes,
// trigger update in local state of Map
componentWillReceiveProps(nextProps) {
  console.log("updating local state of the Chart...")
  this.setState({selected_train:nextProps.train})
  this.setState({selected_arret: this.state.train.filter(x=> nextProps.train.indexOf(parseInt(x.CodeVoyage)) !== -1 ).map(x=>x.ArretId)})
  //ifconfig -a wlan
  const query_url = "http://192.168.122.1:5000/count"
  const mybody = {
    'train':this.state.selected_train,
  }
   fetch(query_url, 
    {
     method: 'post',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify(mybody) 
    })
   .then(r =>r.json().then(data => ({status: r.status, body: data}) ))
   .then(obj => this.setState({ 
     Date:obj.body.x,
     count: obj.body.y
  })).catch( err=> console.log(err) )
}
    loadTrain= (result) =>{
      const data = result.data;
      this.setState({train: data},console.log(data))
    }
     
    render() {
        const data = [ this.state.Date, this.state.count
            //{ x: 0, y: 0 },
            //{ x: 1, y: 2 },
            //{ x: 2, y: 1 },
            //{ x: 3, y: 4 },
            //{ x: 4, y: 3 },
            //{ x: 5, y: 5 }
          ];
          
        
      return (
        
         

          <VictoryChart polar={this.state.polar} height={390}>
            <VictoryLine
              interpolation={this.state.interpolation} data={data}
              style={{ data: { stroke: "#c43a31" } }}
            />
            <VictoryScatter data={data}
              size={5}
              style={{ data: { fill: "#c43a31" } }}
            />
          </VictoryChart>
        
      );
    }
  }
  
  export default RetardPreditChart;