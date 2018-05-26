import React,{Component} from 'react'
import TraindId from './TrainId';
import Mois from './Mois'
import Transporteur from './Transporteur'
import Ligne from './Ligne'
import Pointe from './Pointe';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
export default class RetardForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
      return(<div class="row"><form className="form-inline">
              <div class="col-md-4">
              <div className="form-group">
                 <label>Identifiant Train</label>
                  <TraindId />  
              </div>
              </div>
              <div class="col-md-4">
                 <div className="form-group">
                   <label>Selection de date (futur ou passe)</label>
                  <DatePicker selected={this.state.startDate}  onChange={this.handleChange} />
                 </div>
              </div>
              <div class="col-md-4">
                 <div className="form-group">
                   <button type="submit" className="btn btn-primary btn-lg">Predict</button>
                </div>
              </div>
           </form></div>
           )

    }

}
