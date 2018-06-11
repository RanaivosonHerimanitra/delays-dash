import React, { Component } from 'react';
import { withGoogleMap, GoogleMap ,Polyline} from 'react-google-maps';

class Map extends Component {
   

   render() {
    const dest = [{lat:36.05298765935, lng:-112.083756616339}, 
        {lat:36.2169884797185,lng: -112.056727493181}, ]

   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {lat:36.052, lng:-112.083} }
        defaultZoom = { 12 }
      >
      <Polyline path ={dest} geodesic={false} 
                      options={{ 
                                strokeColor: '#ff2527',
                              
                                strokeWeight: 2.5
                              }}/>
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