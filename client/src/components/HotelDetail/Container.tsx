import { RouteComponentProps, withRouter } from 'react-router'
import { /* Dispatch */ } from 'redux'
import { connect } from 'react-redux'

import HotelService from '@/services/hotel-service';
import RootState from '@/interfaces/state/root-state'

import Presenter from './Presenter'

interface StateProps {}

interface DispatchProps {
  getHotel: (id: string) => Promise<any>
}

interface OwnProps extends RouteComponentProps {
}

const mapStateToProps = (_state: RootState) => {
  return {
  }
}

const mapDispatchToProps = (/* dispatch: Dispatch */) => {
  const hotelService = new HotelService()

  return {
    async getHotel(id: string) {
      try {
        return await hotelService.getHotelById(id)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default withRouter(
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Presenter))
