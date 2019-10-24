export default interface HotelParams {
	location: string
	starRange: [ number, number ]
	minPrice: number | string
	maxPrice: number | string
	sort: string
	pageNumber: number | string
}
