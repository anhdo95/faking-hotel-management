export default interface HotelRequest {
	location: string
	minStar: number
	maxStar: number
	minPrice: number
	maxPrice: number
	sortBy: string
	sortDesc: boolean
	pageSize: number
	pageNumber: number
}
