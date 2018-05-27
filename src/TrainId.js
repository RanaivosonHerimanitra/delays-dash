import React, {Component} from 'react'
import TrainId_data from './TrainId_data'
import { Dropdown } from 'semantic-ui-react'


//const data = TrainId_data.map( (val) => <option key={val} >{val}</option> )
export default class TrainId extends Component {
    constructor(props) {
        super(props)
        
      

    }
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
        this.setState( {
            data:data,
            values: null,
            search:true,
            searchQ:null
        })
    }
    handleChange =(e, {value}) => {
        //console.log(value)
        this.setState({
            values: value
          },() => {
            console.log(this.state.values);
          })
       
       
    }
    handleSearchChange = (e,{searchQ}) => {
        this.setState({searchQ})
    }
    

render () {
     
    return (<Dropdown fluid selection value={this.state.values}
                   multiple={true} 
                   search= {this.state.search}
                   onSearchChange={this.handleSearchChange}
        placeholder='Selectyour train'  onChange={this.handleChange} 
        options={this.state.data} disabled={false}  />)
}


}
