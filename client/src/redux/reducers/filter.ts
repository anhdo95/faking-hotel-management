import cloneDeep = require('lodash/cloneDeep')

import { ACTIONS, DEFAULT_PAGE } from '@/util/constants'

const initialState = {
	hotel: {
    location: '',
    starRange: [ 0, 100 ],
    minPrice: 0,
    maxPrice: 0,
    sort: '',
    pageNumber: DEFAULT_PAGE
  }
}

const filterReducer = (state = initialState, action: any) => {
  const newState = cloneDeep(state)

	switch (action.type) {
		case ACTIONS.SET_HOTEL_FILTER:
			newState.hotel = {
        ...newState.hotel,
        ...action.payload.filter
      }
      break

    case ACTIONS.RESET_HOTEL_FILTER:
      newState.hotel = cloneDeep(initialState.hotel)
      break

		default:
			return state
  }

	return newState
}

export default filterReducer
