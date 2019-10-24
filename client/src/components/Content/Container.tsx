import { RouteComponentProps, withRouter } from 'react-router'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import isEmpty = require('lodash/isEmpty')

import Presenter from './Presenter'

import RootState from '@/interfaces/state/root-state'
import HotelRequest from '@/interfaces/hotel-request'
import HotelParams from '@/interfaces/hotel-params'
import HotelService from '@/services/hotel-service'
import { setHotels } from '@/redux/actions/hotel'
import { setHotelFilter } from '@/redux/actions/filter'
import { STAR_SLIDER, ITEM_PER_PAGE } from '@/util/constants'

interface StateProps {}

interface DispatchProps {
  searchHotels: (params: HotelParams) => Promise<any[]>
  setHotelFilter: (filter: any) => void
}

interface OwnProps extends RouteComponentProps {
}

const mapStateToProps = (state: RootState) => {
  const { hotels, totalElements, totalPage } = state.hotel

  return {
    hotels,
    totalElements,
    totalPage,
    filter: state.filter.hotel,
  }
}

const mapDispatchToProps: any = (dispatch: Dispatch) => {
  const hotelService = new HotelService()

  return {
    async searchHotels(params: HotelParams | any = {}) {
      try {
        let requestParams: HotelRequest | any = {}

        if (!isEmpty(params)) {
          if (params.starRange) {
            const [minStar, maxStar] = params.starRange

            requestParams = {
              minStar: STAR_SLIDER.KEY_TO_VALUE[minStar],
              maxStar: STAR_SLIDER.KEY_TO_VALUE[maxStar],
            }
          }

          if (params.sort) {
            const [sortBy, sortDesc] = params.sort.split(':')

            requestParams = {
              ...requestParams,
              sortBy,
              sortDesc: sortDesc === 'true',
            }
          }

          requestParams = {
            ...requestParams,
            location: params.location || '',
            minPrice: Number(params.minPrice) || 0,
            maxPrice: Number(params.maxPrice) || 0,
            pageNumber: Number(params.pageNumber),
            pageSize: ITEM_PER_PAGE
          }
        }

        const res = await hotelService.searchHotels(requestParams)

        dispatch(setHotels(res))
      } catch (error) {
        console.error(error)
      }
    },

    setHotelFilter(filter: any) {
      dispatch(setHotelFilter(filter))
    }
  }
}

export default withRouter(
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Presenter))

