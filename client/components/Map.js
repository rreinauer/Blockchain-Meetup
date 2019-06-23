import React from 'react'
import {connect} from 'react-redux'
import {InfoMarker, InfoMarkerWithLabel} from '../components'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow
} from 'react-google-maps'
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox'

import Geocode from 'react-geocode'
import {getCenter} from 'geolib'

Geocode.setApiKey('AIzaSyBanPTveLG9ZTybjw-tyKKhhZaG9g55VRU')

class Map extends React.Component {
  constructor(props) {
    super()
    this.state = {
      zoom: 15
    }
    this.map = React.createRef()
    this.onCenterChanged = this.onCenterChanged.bind(this)
  }

  onCenterChanged() {
    if (this.props.centroid.lat) {
      this.setState({
        zoom: 20
      })
    }
  }

  render() {
    const {addresses, currentAddress, centroid, places} = this.props
    const bounds = new window.google.maps.LatLngBounds()
    if (!addresses.length) {
      bounds.extend(
        new window.google.maps.LatLng(
          currentAddress.location.lat,
          currentAddress.location.lng
        )
      )
    } else {
      addresses.map(address => {
        bounds.extend(
          new window.google.maps.LatLng(
            address.location.lat,
            address.location.lng
          )
        )
      })
    }

    return (
      <GoogleMap
        ref={map => {
          map && map.fitBounds(bounds)
        }}
        zoom={this.state.zoom}
        center={centroid.lat ? centroid : currentAddress.location}
        defaultOptions={{
          minZoom: 8,
          maxZoom: 15
        }}
        // onTilesLoaded={this.onCenterChanged}
      >
        {/* <InfoMarkerWithLabel
          position={currentAddress.location}
          place={{name: currentAddress.name}}
        /> */}
        {addresses.length
          ? this.props.isMarkerShown &&
            addresses.map((address, i) => (
              <InfoMarkerWithLabel
                key={i}
                position={address.location}
                place={address}
              />
            ))
          : ''}
        {/* {currentAddress.lat ? <Marker position={currentAddress} /> : ''} */}
        {/* {centroid.lat ? <Marker position={centroid} label="centroid" /> : ''} */}
        {places.length
          ? places.map(place => (
              <InfoMarker
                key={place.id}
                position={{lat: place.location.lat, lng: place.location.lng}}
                place={place}
              />
            ))
          : ''}
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  addresses: state.addresses.addresses,
  currentAddress: state.addresses.currentAddress,
  centroid: state.addresses.centroid,
  places: state.places
})

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(Map)))
