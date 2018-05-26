import React from 'react'
const ligne_data ={"CA":0,"VH":6,"SJ":5,"DM":1,"MA":2,"SH":4,"Ne sait pas":3}
const Ligne = ()=> {
    return (<select className="form-control">
    <option value ={ligne_data['CA']}>CA</option>
    <option value={ligne_data['VH']}>VH</option>
    <option value ={ligne_data['SJ']}>SJ</option>
    <option value ={ligne_data['DM']}>DM</option>
    <option value={ligne_data['MA']}>MA</option>
    <option value={ligne_data['SH']}>SH</option>
    <option value ={ligne_data['Ne sait pas']}>Ne sait pas</option>
    </select>)
}
export default Ligne;