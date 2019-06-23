import React from 'react'
import {Marker, InfoWindow} from 'react-google-maps'
import {MdLocalDining} from 'react-icons/md'

const InfoMarker = props => {
  const {open, place, position} = props
  const [state, setState] = React.useState({
    isOpen: false
  })
  const handleToggleOpen = () => {
    const curr = state.isOpen
    setState({
      isOpen: !curr
    })
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
            <MdLocalDining /> <div id="info-box">{place.name}</div>
          </div>
        </InfoWindow>
      )}
    </Marker>
  )
}

export default InfoMarker
