import axios from 'axios'

const GET_PLACES = 'GET_PLACES'

const gotPlaces = places => ({
  type: GET_PLACES,
  places
})

export const getPlaces = query => async dispatch => {
  const endPoint = 'https://api.foursquare.com/v2/venues/search?'
  const parameters = {
    ll: query.lat + ',' + query.lng,
    intent: 'browse',
    limit: 20,
    radius: 800,
    categoryId: '4bf58dd8d48988d14e941735',
    client_id: 'LBVIQAW2E0HWIUIFFCJBXSQKEUXNNELN2GZWURVCS5QJN0ZZ',
    client_secret: 'AEU2DL0RTEDHRVT04B2XC0JADIYXZCRQZ0K1IMBQAP2RMEGH',
    v: 20190606
  }
  try {
    const {data} = await axios.get(endPoint + new URLSearchParams(parameters))
    console.log(data)
    dispatch(gotPlaces(data.response.venues))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLACES:
      return action.places
    default:
      return initialState
  }
}
