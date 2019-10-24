import HotelState from './hotel-state'
import FilterState from './filter-state'

export default interface RootState {
	hotel: HotelState
	filter: FilterState
}
