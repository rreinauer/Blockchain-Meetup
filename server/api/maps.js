const router = require('express').Router()
module.exports = router
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBanPTveLG9ZTybjw-tyKKhhZaG9g55VRU'
})

// router.get(
//   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
//     query.lat
//   }, ${
//     query.lng
//   }&radius=1500&type=restaurant&key=AIzaSyBanPTveLG9ZTybjw-tyKKhhZaG9g55VRU`, (req, res, next) => {

//   }
// )
