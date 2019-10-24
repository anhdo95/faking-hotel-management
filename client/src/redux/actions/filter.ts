import { ACTIONS } from '@/util/constants'

export const setHotelFilter = (filter: any) => {
	return {
		type: ACTIONS.SET_HOTEL_FILTER,
		payload: {
			filter,
		},
	}
}

export const resetHotelFilter = () => {
	return {
		type: ACTIONS.RESET_HOTEL_FILTER,
	}
}

