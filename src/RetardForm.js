
import React,{Component,Fragment} from 'react'
import TrainId_data from './TrainId_data'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';
import isHoliday from 'holidays-nordic'
import LoadingSpinner from './LoadingSpinner'
import Map from './Map';
import RetardPreditChart from './RetardPreditChart';
import Papa from 'papaparse'
const pointe_data = {"AM":"AM","PM":"PM"}



export default class RetardForm extends Component {
  // initialise les etats des UI:
  //liaison des listeners avec les UI
  constructor (props) {
    super(props)
    this.state = {
      trainId: [],
      dpvalues: [],
      loading: false,
      selected_dpvalues: [],
      pointe_selection: "AM",
      startDate: moment(),
      prediction:null,
      causes:-1,
      commentaires:'',
      details: [],
      resp: []
    }
    // Binding
        this.handleSubmit = this.handleSubmit.bind(this);

  
    var csvFilePathDetails = require("./data/details.csv");
    Papa.parse(csvFilePathDetails, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.loadDetail
    })

    var csvFilePathCauses= require("./data/cause_resp.csv");
    Papa.parse(csvFilePathCauses, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.loadCause
    })
  }
 
  loadCause = (result) =>{
    const data = result.data;
    this.setState({resp: data},console.log(data))
  }
  loadDetail = (result) =>{
    const data = result.data;
    this.setState({details: data},console.log(data))
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
  handlePointeChange= (event) =>{
    this.setState({pointe_selection: event.target.value});
  }
  handleComChange = (event)  =>{
    event.preventDefault();
    this.setState({
    
      commentaires: event.target.value
    });

  }
  handleDetailChange = (event)  =>{
    this.setState({
      selectedDetail: event.target.value
    });
  }
  
  handleCauseChange = (event) =>{
    this.setState({
    
      causes: event.target.value
    });
  }
  handleChange = (date) =>{
    this.setState({
    
      startDate: date
    });
  }
  handleSubmit(event) {
    event.preventDefault();
     console.log(this.state.pointe_selection)
     console.log("Holiday:",isHoliday(this.state.startDate,'no'))
     console.log(moment(this.state.startDate).format('MM/DD/YYYY'))
     let selected_dpvalues ={}
     for (let k of this.state.selected_dpvalues ) {
      selected_dpvalues[k]=k

     }
     console.log(selected_dpvalues)
     
     //ifconfig -a wlan
     const query_url = "http://192.168.122.1:5000/predict"
     
    const mybody = {
      'type_prediction':"retard-only",
      'date':moment(this.state.startDate).format('MM/DD/YYYY'),
      'train':selected_dpvalues,
      'pointe':this.state.pointe_selection,
      'ferie': isHoliday(this.state.startDate,'no') ? 1 : 0,
      'causes':this.state.causes,
      'detail':this.state.selectedDetail,
      'commentaires':this.state.commentaires
    }
    this.setState({ loading: true })
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
       loading:false,
       prediction:obj.body.retour_mode_nominal
    }) )
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
        <Fragment>
           <div className="container">
        <form onSubmit={this.handleSubmit} className="form-inline">
       
            
            
              
                 <label>Id Train</label>
                 <Dropdown fluid selection 
                  
                           value={this.state.selected_dpvalues}
                           multiple={true} 
                           placeholder='train'  
                           onChange={this.handleDropdownChange} 
                          options={this.state.dpvalues} 
                          disabled={false}  />
              
              

             
                 <div className="form-group">
                   <label>Date (futur ou passé)</label>
                  <DatePicker selected={this.state.startDate}  
                           onChange={this.handleChange} />
                 </div>
              

              
                 <div className="form-group">
                   <label>Pointe:</label>
                      <select value={this.state.pointe_selection} 
                              onChange={this.handlePointeChange} 
                              className="form-control">
                        <option value ={pointe_data['AM']}>AM</option>
                        <option value={pointe_data['PM']}>PM</option>
                      </select>
                </div>
              

            
                 
                   <label>Responsabilite:</label>
                      <select value={this.state.causes} 
                              onChange={this.handleCauseChange} 
                              className="form-control">
                        <option key={-9999} value ={-1}></option>
                        {
                          this.state.resp.map((x)=><option key ={x.causes}
                          value ={x.causes}>{x.Responsabilite}</option>)
                          }
                       {/* <option value ={4}>Materiel roulant</option>
                        <option value={0}>Autres</option>
                        <option value ={2}>Exploitation</option>
                        <option value={3}>Infrastructure</option>
                        <option value={1}>Clients</option> 
                        */}
                      </select>
                
            
                 <label>Details:</label>
                 <select value ={this.state.selectedDetail}
                         onChange={this.handleDetailChange} 
                         className="form-control">
                 <option key={-1} value ={-1}></option>
                 {
                   this.state.details.map((x)=><option key ={x.Detail_Encoded}
                    value ={x.Detail_Encoded}>{x.Detail}</option>)
                 }
                 </select>
              

             {/* <div className="row">
                 <div className="form-group">
                   <label>Commentaires:</label>
                      <textarea onChange={this.handleComChange} value= {this.state.commentaires}></textarea>
                </div>
              </div>  
                */}

             {this.state.loading ? <LoadingSpinner /> :  <p>{this.state.prediction}</p> }
             
              
             
                 <div className="form-group">
                   <button  className="btn btn-primary btn-lg">Predict</button>
                </div>
            
             
           </form>
           </div>  {/* fin du conteneur de form */}
           <div className="container">
                <div className="col-md-6">
                    <Map train ={this.state.selected_dpvalues}/>
                </div>
                <div className="col-md-6">
                    <RetardPreditChart train ={this.state.selected_dpvalues}/>
                </div>
          </div> {/* fin du conteneur de composantes */}
    </Fragment>
          
           )

    }

}
