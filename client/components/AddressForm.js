import React from 'react'
import {Form, Button, Card} from 'react-bootstrap'
import Geocode from 'react-geocode'
import {connect} from 'react-redux'
import {
  addAddress,
  setCurrent,
  clearAddresses,
  setCentroid,
  getPlaces
} from '../store'
import {getCenter} from 'geolib'

const AddressForm = props => {
  const [state, setState] = React.useState({
    address1: '',
    address2: '',
    address3: ''
  })

  const handleChange = event => {
    setState({...state, [event.target.name]: event.target.value})
  }
  const handleAdd = async address => {
    event.preventDefault()
    const geo = await Geocode.fromAddress(address)
    console.log(geo.results[0])

    const toAdd = {
      name: geo.results[0].formatted_address,
      location: geo.results[0].geometry.location
    }
    props.addAddress(toAdd)
    props.setCurrent(toAdd)
  }
  const handleSubmit = () => {
    event.preventDefault()
    const centroid = calculateCentroid()
    props.setCentroid(centroid)
    props.getPlaces(centroid)
  }
  const calculateCentroid = () => {
    let geoArray = []
    for (let i of props.addresses) {
      let geoObj = {}
      geoObj.latitude = i.location.lat
      geoObj.longitude = i.location.lng
      geoArray.push(geoObj)
    }
    const geoFind = getCenter(geoArray)
    let centroid = {}
    centroid.lat = geoFind.latitude
    centroid.lng = geoFind.longitude
    console.log(centroid)
    return centroid
  }

  return (
    <Card body style={{width: '18rem', height: '600px'}}>
      <Form onSubmit={() => handleAdd(state.address1)}>
        <Form.Group>
          <Form.Label>Address 1</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="address1"
            placeholder="Enter Address 1"
            value={state.address1}
          />
          <Button type="submit" style={{marginTop: 5}}>
            Add
          </Button>
        </Form.Group>
      </Form>
      <Form onSubmit={() => handleAdd(state.address2)}>
        <Form.Group>
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="address2"
            placeholder="Enter Address 2"
            value={state.address2}
          />
          <Button type="submit" style={{marginTop: 5}}>
            Add
          </Button>
        </Form.Group>
      </Form>
      <Form onSubmit={() => handleAdd(state.address3)}>
        <Form.Group>
          <Form.Label>Address 3</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="address3"
            placeholder="Enter Address 2"
            value={state.address3}
          />
          <Button type="submit" style={{marginTop: 5}}>
            Add
          </Button>
        </Form.Group>
      </Form>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Button variant="primary" type="submit" style={{marginTop: 50}}>
            Find Center
          </Button>
        </Form.Group>
      </Form>
    </Card>
  )
}

const mapStateToProps = state => ({
  addresses: state.addresses.addresses
})
const mapDispatchToProps = dispatch => ({
  addAddress: address => dispatch(addAddress(address)),
  setCurrent: address => dispatch(setCurrent(address)),
  clearAddresses: () => dispatch(clearAddresses()),
  setCentroid: centroid => dispatch(setCentroid(centroid)),
  getPlaces: centroid => dispatch(getPlaces(centroid))
})
export default connect(mapStateToProps, mapDispatchToProps)(AddressForm)
