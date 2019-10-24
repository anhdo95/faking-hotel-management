import { ACTIONS } from '@/util/constants'

export const setLocations = (locations: string[]) => {
	return {
		type: ACTIONS.SET_HOTEL_LOCATIONS,
		payload: {
			locations,
		},
	}
}

export const setHotels = (payload: { hotels: any[]; totalElements: number; totalPage: number }) => {
	return {
		type: ACTIONS.SET_HOTELS,
		payload,
	}
}
