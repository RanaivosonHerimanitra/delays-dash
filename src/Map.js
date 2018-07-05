import React, { Component } from 'react';
import { withGoogleMap, GoogleMap ,Polyline,Marker} from 'react-google-maps';
import Papa from 'papaparse'


class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      arret:[],
      selected_arret : [],
      train : [],
      selected_train : []
    }
    //charge la correspondance arret train(codeVoyage)
    var correspondance_train_arret = require("./data/arret_train.csv");
    Papa.parse(correspondance_train_arret, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.loadTrain
    })

    // load latlong csv
    var arretfile = require("./data/sequenceArretGeoloc.csv");
    Papa.parse(arretfile, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.loadArretGeoloc
    })
    
}
// when props from the parent RetardForm component changes,
// trigger update in local state of Map
componentWillReceiveProps(nextProps) {
  console.log("updating local state of the Map...")
  this.setState({selected_train:nextProps.train})
  this.setState({selected_arret: this.state.train.filter(x=> nextProps.train.indexOf(parseInt(x.CodeVoyage)) !== -1 ).map(x=>x.ArretId)})
    
}

loadTrain= (result) =>{
  const data = result.data;
  this.setState({train: data},console.log(data))
}
loadArretGeoloc = (result) =>{
  const data = result.data;
  // Here this is available and we can call this.setState (since it's binded in the constructor)
  this.setState({arret: data},console.log(data))
}
   render() {
     //params:
     const markerWithDelays = require('./img/red-dot.png');
     const markerNormal = require('./img/blue-dot.png');
     const iconUrl = markerNormal
     const color = [ "#30499B","#844D9E","#0091d8","#136163","#72003f","#144d20","#EB7B2D"]
      //extract unique LigneID
     let ligne = [...new Set(this.state.arret.map(item => item.LigneId))]
    
     //extract unique ArretId
     let arret= [...new Set(this.state.arret.map(item => item.ArretId))]
     // if drawing a polyline
     let poly= (arret) => ligne.map ( (l,index) => <Polyline key ={l}
     path ={arret.filter(x=> parseInt(x.LigneId)===parseInt(l) ).map( (x) => ({lat: parseFloat(x.Latitude),lng:parseFloat( x.Longitude) }) )} 
     geodesic={false} 
     options={{ 
       strokeColor: color[index],strokeWeight: 3.5 }}
   />
   )
   // selected poly
   let selected_poly = []
     // /////////////////////////////////////////////////////////////////////////////////////


     //recupere son props qui sont les ID de trains:
    const train = this.props.train
    if (train.length ===0) {
      console.log("aucun train selectionné pour le moment")
      selected_poly = poly(this.state.arret)
      console.log(this.state.arret)
     
     
    } else {
      console.log("vous avez selectionné le(s) train(s):")
      console.log(this.state.selected_train)
      console.log("selection de l'arret correspondant au(x) train(s) selectionné(s)")
      const selected_arret = this.state.arret.filter(x=> this.state.selected_arret.indexOf(x.ArretId) !==-1).map( x => 
        ({ Latitude:parseFloat(x.Latitude), Longitude:parseFloat( x.Longitude),LigneId:x.LigneId }) ) 
     
      selected_poly = poly(selected_arret)
      
      
    }
    // position d'un arret donne: 
    const mypos =(a) =>this.state.arret.filter(x=> x.ArretId===a).map( x => 
      ({ lat:parseFloat(x.Latitude), lng:parseFloat( x.Longitude) })
    ) 
    //marker correspondant à l'arret donne
    const mymarker =  arret.map((a)=> 
         <Marker key={a}  icon={{url:iconUrl}} position={mypos(a)[0]} />
     )
   
      
     
                                          
    const MyGoogleMap= withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {lat:45.3820335001678, lng:-73.6000979691623} }
        defaultZoom = { 9 } >
        {selected_poly}
        {mymarker}
        
       
     
      </GoogleMap>
   ));

   return(
      <div>
        <MyGoogleMap
          containerElement={ <div style={{ height: `500px`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );

   }
};

export default Map;