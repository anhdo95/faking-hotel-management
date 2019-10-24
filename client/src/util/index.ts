import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import noop = require('lodash/noop')

import request from './request'

/**
 * Middleware for react-redux connect
 *
 * @param component
 * @param mapState
 * @param mapDispatch
 */
export const composeContainer = (
	component: React.ComponentType,
	mapStateToProps: any,
  mapDispatchToProps: any = noop(),
) => {
	return withRouter(connect(mapStateToProps, mapDispatchToProps)(component))
}

export default {
  composeContainer,
  request,
}
