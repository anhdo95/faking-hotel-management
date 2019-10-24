const fs = require('fs')
const path = require('path')
const { rootDir } = require('../util/path')

const isEmpty = require('lodash/isEmpty')
const orderBy = require('lodash/orderBy')
const drop = require('lodash/drop')
const take = require('lodash/take')

const getFileContent = (filePath) => {
	const rawContent = fs.readFileSync(
		path.resolve(rootDir, filePath)
	)
	return JSON.parse(rawContent)
}

const getDestinations = () => {
	return getFileContent('data/destinations.json')
}

const getHotels = () => {
	return getFileContent('data/hotels.json')
}

exports.getIndex = (req, res, next) => {
	res.status(200).send({
		success: true
  })
}

exports.searchDestinations = (req, res, next) => {
	const { input } = req.body

	let destinations = getDestinations()

	if (input) {
		destinations = destinations.filter(dest => dest.toLowerCase().includes(input.toLowerCase()))
	}

	res.status(200).send({
		error: null,
    data: destinations
  })
}

exports.searchHotels = (req, res, next) => {
	const { query, sorting, paging } = req.body

	let hotels = getHotels()
	let totalPage, totalElements

	if (!isEmpty(query)) {
		hotels = hotels.filter(hotel => {
			const isLocation = (hotel.location
					? hotel.location.toLowerCase().includes(query.location.toLowerCase())
					: true)

			const isPrice = hotel.cheapestPrice >= query.minPrice
											&& (query.maxPrice
												? hotel.cheapestPrice <= query.maxPrice
												: true)

			const isStar = parseFloat(hotel.stars) >= parseFloat(query.minStar)
										 && (query.maxStar
											? parseFloat(hotel.stars) <= parseFloat(query.maxStar)
											: true)

			return isLocation && isPrice && isStar
		})
	}

	if (!isEmpty(sorting)) {
		let sortBy = sorting.sortBy

		if (sortBy === 'price') {
			sortBy = 'cheapestPrice'
		}

		hotels = orderBy(hotels, [ sortBy ], [sorting.desc ? 'desc' : 'asc'])
	}

	if (!isEmpty(paging)) {
		totalElements = hotels.length
		totalPage = Math.ceil(hotels.length / paging.take)
		hotels = take(drop(hotels, paging.skip), paging.take)
	}

	res.status(200).send({
		error: null,
		data: {
			hotels,
			totalPage,
			totalElements
		}
  })
}

exports.getHotel = (req, res, next) => {
	const { id } = req.params

	let data = getHotels().find(hotel => hotel.hotelId === id)

	res.status(200).send({
		error: null,
		data
  })
}