import React from 'react'
import TrainId_data from './TrainId_data'
import { Select } from 'semantic-ui-react'


//const data = TrainId_data.map( (val) => <option key={val} >{val}</option> )

let data = []
let compteur = 0
for (let k of TrainId_data) 
    {
        let obj = {};
         obj.key = k;
         obj.value = k;
         obj.text = k;
         data[compteur]=obj
         compteur =compteur + 1

    }

const TrainId = ()=> {
    return (<Select multiple={true} placeholder='Select your train' options={data} />)
}
export default TrainId;