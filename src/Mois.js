import React from 'react'
const mois_array = ["Jan","Fev","Mars","Avr","Mai","Juin","Jul","Aout","Sept","Oct",
"Nov","Dec"]
const mois_jsx= mois_array.map( r => <option key={r}>{r}</option>)

const Mois = () => {
    return(<select className="form-control">{mois_jsx}</select>)
}

export default Mois;
