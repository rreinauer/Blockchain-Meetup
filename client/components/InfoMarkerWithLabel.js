import React from 'react'
import {Marker, InfoWindow} from 'react-google-maps'
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import {FaHome} from 'react-icons/fa'

const InfoMarkerWithLabel = props => {
  const {place, position} = props
  const [state, setState] = React.useState({
    isOpen: true
  })
  const handleToggleOpen = () => {
    const curr = state.isOpen
    setState({
      isOpen: !curr
    })
    console.log(state)
  }

  const handleToggleClose = () => {
    setState({
      isOpen: false
    })
  }
  return (
    <Marker position={position} onClick={() => handleToggleOpen()}>
      {state.isOpen && (
        <InfoWindow onCloseClick={() => handleToggleClose()}>
          <div className="info-box">
            {' '}
            <FaHome />
            <div className="info">{place.name}</div>
          </div>
        </InfoWindow>
      )}
    </Marker>
  )
}

export default InfoMarkerWithLabel
