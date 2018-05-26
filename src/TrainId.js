import React from 'react'
import TrainId_data from './TrainId_data'

const data = TrainId_data.map( (val) => <option key={val} >{val}</option> )
const TrainId = ()=> {
    console.log(TrainId_data)
    return (<select className="form-control">{data}</select>)
}
export default TrainId;