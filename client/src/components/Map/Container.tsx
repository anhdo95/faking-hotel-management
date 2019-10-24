import { RouteComponentProps, withRouter } from 'react-router'
import { connect } from 'react-redux'

import RootState from '@/interfaces/state/root-state'

import Presenter from './Presenter'

interface StateProps { }

interface DispatchProps {
}

interface OwnProps extends RouteComponentProps {
}

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
