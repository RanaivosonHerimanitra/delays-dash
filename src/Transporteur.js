import React from 'react'
const transp_code_data= {"CP":1,"CN":0,"Ne sait Pas":2}


const Transporteur = ()=> {
    return (<select className="form-control">
    <option value ={transp_code_data['CP']}>CP</option>
    <option value={transp_code_data['CN']}>CN</option>
    <option value ={transp_code_data['Ne sait pas']}>Ne sait pas</option>
    </select>)
}
export default Transporteur;