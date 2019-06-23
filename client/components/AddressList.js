import React from 'react'
import {connect} from 'react-redux'
import {Card, ListGroup} from 'react-bootstrap'
import Geocode from 'react-geocode'
import {setCurrent, deleteAddress} from '../store'

const AddressList = props => {
  const handleClick = address => {
    props.setCurrent(address)
  }

  return (
    <Card body>
      <ListGroup>
        {props.addresses.map((address, i) => {
          Geocode.fromLatLng(address.lat, address.lng).then(res => {
            console.log(res)
            return (
              <ListGroup.Item>
                {res.results[0].formatted_address}
              </ListGroup.Item>
            )
          })
        })}
      </ListGroup>
    </Card>
  )
}

const mapStateToProps = state => ({
  addresses: state.addresses.addresses,
  currentAddress: state.addresses.currentAddress
})

const mapDispatchToProps = dispatch => ({
  setCurrent: address => dispatch(setCurrent(address)),
  deleteAddress: address => dispatch(deleteAddress(address))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressList)
