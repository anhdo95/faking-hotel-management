import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'

interface PresenterProps extends RouteComponentProps {
  center: any,
  zoom: any,
  text: string
}

interface PresenterState {
}

const MarkerComponent = (props: any) => (
  <div className="hotel-map__marker">
    {props.text}
  </div>
)

import './style.scss'

class Presenter extends React.PureComponent<PresenterProps, PresenterState> {
  render() {
    return (
      <div className="hotel-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBRuIFEcAZ-KA-zosxR_Zo4FTXoc_dKA_I' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MarkerComponent
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            text={this.props.text}
          />
        </GoogleMapReact>
      </div>
    )
  }
}

export default Presenter
