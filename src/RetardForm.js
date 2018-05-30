import React,{Component} from 'react'
import TrainId_data from './TrainId_data'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';
const pointe_data = {"AM":"AM","PM":"PM"}

export default class RetardForm extends Component {
  // initialise les etats des UI:
  //liaison des listeners avec les UI
  constructor (props) {
    super(props)
    this.state = {
      trainId: [],
      dpvalues: [],
      selected_dpvalues: null,
      pointe_selection: "AM",
      startDate: moment(),
      prediction:null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePointeChange = this.handlePointeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //quand l UI est monte alors...
  componentWillMount() {
    let data = []
    let compteur = 0
    for (let k of TrainId_data) {
        let obj = {};
        obj.key = k;
        obj.value = k;
        obj.text = k;
        data[compteur]=obj
       compteur =compteur + 1
    }
    this.setState({dpvalues: data})
}
  handlePointeChange(event) {
    this.setState({pointe_selection: event.target.value});
  }
  handleChange(date) {
    this.setState({
    
      startDate: date
    });
  }
  handleSubmit(event) {
    event.preventDefault();
     console.log(this.state.pointe_selection)
     console.log(this.state.startDate._d.toString())
     let selected_dpvalues ={}
     for (let k of this.state.selected_dpvalues ) {
      selected_dpvalues[k]=k

     }
     console.log(selected_dpvalues)
     
     //ifconfig -a wlan
     const query_url = "http://192.168.0.104:5000/predict"
     
    const mybody = {
      'type_prediction':"retard-only",
      'date':this.state.startDate._d.toString(),
      'train':selected_dpvalues,
      'pointe':this.state.pointe_selection
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
     .then(obj => this.setState({ prediction:obj.body.retour_mode_nominal}) )
     .catch( err=> console.log(err) )
 
}
handleDropdownChange =(e, {value}) => {
  this.setState({
      selected_dpvalues: value
    },() => {
      console.log(this.state.selected_dpvalues);
    })  
}

  

    render() {
      return(
        <form onSubmit={this.handleSubmit} className="form-inline">
             <div className="container">
             <div className="row">
              <div className="col-md-3">
              <div className="form-group">
                 <label>Id Train</label>
                 <Dropdown fluid selection 
                           value={this.state.selected_dpvalues}
                           multiple={true} 
                           //search= {this.state.search}
                           //onSearchChange={this.handleSearchChange}
                           placeholder='train'  
                           onChange={this.handleDropdownChange} 
                          options={this.state.dpvalues} 
                          disabled={false}  />
              </div>
              </div>
              <div className="col-md-3">
                 <div className="form-group">
                   <label>Date (futur ou passé)</label>
                  <DatePicker selected={this.state.startDate}  
                           onChange={this.handleChange} />
                 </div>
              </div>
              <div className="col-md-3">
                 <div className="form-group">
                   <label>Pointe:</label>
                      <select value={this.state.pointe_selection} 
                              onChange={this.handlePointeChange} 
                              className="form-control">
                        <option value ={pointe_data['AM']}>AM</option>
                        <option value={pointe_data['PM']}>PM</option>
                      </select>
                </div>
              </div>
              <div className="col-md-3">
                 <div className="form-group">
                   <button  className="btn btn-primary btn-lg">Predict</button>
                </div>
              </div></div></div>
              <p>{this.state.prediction}</p>
           </form>
           
           )

    }

}
