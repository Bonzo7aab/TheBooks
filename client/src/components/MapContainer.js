import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import googleMapsKEY from '../apis/apis';

export class MapContainer extends React.Component {
  render() {
    const MyMapComponent = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapsKEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 52.190537, lng: 21.024048 }}
      >
        {props.isMarkerShown && <Marker position={{ lat: 52.190537, lng: 21.024048 }} />}
      </GoogleMap>
    )
    return (
      <MyMapComponent isMarkerShown />
    )
  }
}
