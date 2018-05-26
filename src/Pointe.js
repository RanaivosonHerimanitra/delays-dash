import React from 'react'

const pointe_data = {"AM":1,"PM":0}

const Pointe = ()=> {
    return (<select className="form-control">
    <option value ={pointe_data['AM']}>AM</option>
    <option value={pointe_data['PM']}>PM</option>
    
    </select>)
}
export default Pointe;