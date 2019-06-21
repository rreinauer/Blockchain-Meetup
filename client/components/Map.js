import React from 'react'
import {connect} from 'react-redux'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from 'react-google-maps'
import Geocode from 'react-geocode'
import {getCenter} from 'geolib'

Geocode.setApiKey('AIzaSyBanPTveLG9ZTybjw-tyKKhhZaG9g55VRU')

class Map extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    const {addresses, currentAddress, centroid} = this.props
    return (
      <GoogleMap
        defaultZoom={15}
        center={centroid.lat ? centroid : currentAddress}
      >
        {addresses.length
          ? this.props.isMarkerShown &&
            addresses.map((address, i) => (
              <Marker key={i} position={address} label={`Address${i + 1}`} />
            ))
          : ''}
        {currentAddress.lat ? (
          <Marker position={currentAddress} label="Current" />
        ) : (
          ''
        )}
        {centroid.lat ? <Marker position={centroid} label="centroid" /> : ''}
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  addresses: state.addresses.addresses,
  currentAddress: state.addresses.currentAddress,
  centroid: state.addresses.centroid
})

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(Map)))
