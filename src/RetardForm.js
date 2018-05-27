import React,{Component} from 'react'
import TraindId from './TrainId';

import Pointe from './Pointe';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';

export default class RetardForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trainId: [],
      pointe: null,
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(date) {
    this.setState({
    
      startDate: date
    });
  }
  

    render() {
      return(<div className="container">
             <div className="row"><form className="form-inline">
              <div className="col-md-3">
              <div className="form-group">
                 <label>Id Train</label>
                  <TraindId />  
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
                   <Pointe />
                </div>
              </div>
              <div className="col-md-3">
                 <div className="form-group">
                   <button type="submit" className="btn btn-primary btn-lg">Predict</button>
                </div>
              </div>
           </form></div></div>
           )

    }

}
