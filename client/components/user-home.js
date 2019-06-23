import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Map, AddressForm, AddressList} from '../components'
import Autocomplete from 'react-google-autocomplete'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div id="home-container">
      <div id="address-info-container">
        <AddressForm />
        {/* <AddressList /> */}
      </div>

      <Map
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBanPTveLG9ZTybjw-tyKKhhZaG9g55VRU&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}} />}
        containerElement={<div style={{height: `600px`, width: '80%'}} />}
        mapElement={<div style={{height: `100%`}} />}
        center={{lat: 40.705336, lng: -74.009117}}
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
