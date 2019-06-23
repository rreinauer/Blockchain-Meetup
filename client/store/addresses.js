import axios from 'axios'

const GET_ADDRESSES = 'GET_ADDRESSES'
const ADD_ADDRESS = 'ADD_ADDRESS'
const SET_CURRENT = 'SET_CURRENT'
const DELETE_ADDRESS = 'DELETE_ADDRESS'
const CLEAR_ADDRESSES = 'CLEAR_ADDRESSES'
const SET_CENTROID = 'SET_CENTROID'

const initialState = {
  addresses: [],
  currentAddress: {
    name: '340 Dean St',
    location: {lat: 40.683534, lng: -73.980314}
  },
  centroid: {}
}
export const addAddress = address => ({
  type: ADD_ADDRESS,
  address
})
export const setCurrent = address => ({
  type: SET_CURRENT,
  address
})
export const deleteAddress = address => ({
  type: DELETE_ADDRESS,
  address
})
export const clearAddresses = () => ({
  type: CLEAR_ADDRESSES
})
export const setCentroid = centroid => ({
  type: SET_CENTROID,
  centroid
})

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT:
      return {
        ...state,
        currentAddress: action.address
      }
    case ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.address]
      }
    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(address => address !== action.address)
      }
    case GET_ADDRESSES:
      return action.addresses
    case CLEAR_ADDRESSES:
      return initialState
    case SET_CENTROID:
      return {...state, centroid: action.centroid}
    default:
      return state
  }
}
