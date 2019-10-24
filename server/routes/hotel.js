const express = require('express')

const {
  getIndex,
  searchDestinations,
  searchHotels,
  getHotel,
} = require("../controllers/hotel")

const router = express.Router()

router.get('/', getIndex)

router.post('/destination/suggess', searchDestinations)

router.post('/hotels/query_basic', searchHotels)

router.get('/hotel/:id', getHotel)

module.exports = router