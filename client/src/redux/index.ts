import { combineReducers } from 'redux'

import hotelReducer from '@redux/reducers/hotel'
import filterReducer from '@redux/reducers/filter'

export default combineReducers({
  hotel: hotelReducer,
  filter: filterReducer,
})
