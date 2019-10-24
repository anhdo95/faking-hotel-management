import { RouteComponentProps, withRouter } from 'react-router'
import { connect } from 'react-redux'

import RootState from '@/interfaces/state/root-state'

interface StateProps {}

interface DispatchProps {

}

interface OwnProps extends RouteComponentProps {
}

import Presenter from './Presenter'

const mapStateToProps = (_state: RootState) => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default withRouter(
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Presenter))

