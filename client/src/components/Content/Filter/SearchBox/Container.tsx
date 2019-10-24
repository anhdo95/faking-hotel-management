import { withRouter, RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import RootState from '@/interfaces/state/root-state'
import HotelService from '@/services/hotel-service'

import { setHotelFilter } from '@/redux/actions/filter'

import Presenter from './Presenter'

interface StateProps {
  destination: string
}

interface DispatchProps {
  searchDestinations: (destination: string) => Promise<string[]>,
  setFilterLocation: (location: string) => void
}

interface OwnProps extends RouteComponentProps { }

const mapStateToProps = (state: RootState) => {
  return {
    destination: state.filter.hotel.location
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  const hotelService = new HotelService()

  return {
    async searchDestinations(destination: string) {
      const params = {
        input: destination
      }

      try {
        return await hotelService.searchDestinations(params)
      } catch (error) {
        console.error(error)
      }
    },

    setFilterLocation(location: string) {
      dispatch(setHotelFilter({ location }))
    }
  }
}

export default withRouter(
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Presenter))
