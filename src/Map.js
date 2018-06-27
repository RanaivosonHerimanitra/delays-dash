import React, { Component } from 'react';
import { withGoogleMap, GoogleMap ,Polyline,Marker} from 'react-google-maps';
import Papa from 'papaparse'

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      arret:[]
    }

    // Bind this to function updateData (This eliminates the error)
    this.updateData = this.updateData.bind(this);
    // load latlong csv
    var csvFilePath = require("./data/arret_latlong.csv");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    })
    
}
updateData(result) {
  const data = result.data;
  // Here this is available and we can call this.setState (since it's binded in the constructor)
  this.setState({arret: data})
}



 
   

   render() {
    const markerWithDelays = require('./img/red-dot.png');
    const markerNormal = require('./img/blue-dot.png');
    const iconUrl = markerNormal
    const color = [ "#30499B","#844D9E","#0091d8",
     "#136163","#72003f","#144d20","#EB7B2D"]
     //extract unique LigneID
    const ligne = [...new Set(this.state.arret.map(item => item.LigneId))]
    //extract unique ArretId
    const arret= [...new Set(this.state.arret.map(item => item.ArretId))]
    // if drawing a polyline
    const poly = ligne.map ( (l,index) => <Polyline key ={l}
                                              path ={this.state.arret.filter(x=> x.LigneId===l).map( (x) => ({lat: parseFloat(x.Latitude),lng:parseFloat( x.Longitude) }) )} 
                                              geodesic={false} 
                                              options={{ strokeColor: color[index],strokeWeight: 1.5 }}
                                            />
                                            )
    const mypos =(a) =>this.state.arret.filter(x=> x.ArretId===a).map( x => 
      ({ lat:parseFloat(x.Latitude), lng:parseFloat( x.Longitude) })
    ) 
    
      const mymarker =  arret.map((a)=> 
         <Marker key={a}  icon={{url:iconUrl}} position={mypos(a)[0]} />
     )
   
      
     
                                          
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {lat:45.3820335001678, lng:-73.6000979691623} }
        defaultZoom = { 9 } >
        {mymarker}
        
       
     
      </GoogleMap>
   ));

   return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );

   }
};

export default Map;