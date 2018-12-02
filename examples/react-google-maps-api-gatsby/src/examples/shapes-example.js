import React from 'react'
import {
  GoogleMapProvider,
  GoogleMap,
  Polyline,
  Polygon,
  Rectangle,
  Circle,
  Marker,
  OverlayView,
  InfoWindow
} from '../../../../src'

import pinIcon from "../assets/pin.svg"

const FLIGHT_PLAN_COORDS = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 }
]

const BRISBANE_COORDS = [
  { lat: -27.467, lng: 153.027 },
  { lat: -23.467, lng: 152.027 },
  { lat: -28.567, lng: 149.627 },
  { lat: -27.467, lng: 153.027 }
]

const SAN_FRANCISCO_COORDS = [
  { lat: 37.772, lng: -122.214 },
  { lat: 39.772, lng: -121.214 },
  { lat: 35.772, lng: -120.214 },
  { lat: 37.772, lng: -122.214 }
]

const RECTANGLE_BOUNDS = {
  north: 38.685,
  south: 33.671,
  east: -115.234,
  west: -118.251
}

const POLYLINE_OPTIONS = {
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
}

export default class ShapesExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      polylineVisible: true,
      polylineOptions: JSON.stringify(POLYLINE_OPTIONS)
    }
  }

  render () {
    const { styles, loadingElement } = this.props

    let polylineOptions

    try {
      polylineOptions = JSON.parse(this.state.polylineOptions)
    } catch (e) {
      polylineOptions = POLYLINE_OPTIONS
    }

    return (
      <div>
        <div>
          <input
            id='show-polyline-checkbox'
            type='checkbox'
            checked={this.state.polylineVisible}
            onChange={() => this.setState({ polylineVisible: !this.state.polylineVisible })}
          />
          <label htmlFor='show-polyline-checkbox'>Show flight path</label>
        </div>
        <br />
        <div>
          <label htmlFor='polyline-options-input'>
            Polyline options (will persist once valid JSON):
          </label>{' '}
          <br />
          <textarea
            id='polyline-options-input'
            type='text'
            value={this.state.polylineOptions}
            onChange={e => this.setState({ polylineOptions: e.target.value })}
          />
        </div>

        <GoogleMapProvider
          id='shapes-example'
          mapContainerStyle={styles.container}
          mapContainerClassName={styles.mapContainer}
        >
          <GoogleMap zoom={2} center={{ lat: 0, lng: -180 }}>
            {this.state.polylineVisible && (
              <Polyline path={FLIGHT_PLAN_COORDS} options={polylineOptions} />
            )}
            <Polygon path={BRISBANE_COORDS} options={{ fillColor: 'green', fillOpacity: 1 }} />

            <Polygon
              path={SAN_FRANCISCO_COORDS}
              options={{ fillColor: 'purple', fillOpacity: 1 }}
            />

            <Rectangle bounds={RECTANGLE_BOUNDS} />
            <Circle
              center={{ lat: 34.052, lng: -118.243 }}
              radius={300000}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35
              }}
            />

            <Marker position={{ lat: 37.772, lng: -122.214 }} icon={pinIcon} />
            <OverlayView
              position={{ lat: 35.772, lng: -120.214 }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div style={{ background: `white`, border: `1px solid #ccc`, padding: 15 }}>
                <h1>OverlayView</h1>
                <button onClick={() => {}} style={{ height: 60 }}>
                  I have been clicked
                </button>
              </div>
            </OverlayView>

            <InfoWindow position={{ lat: 33.772, lng: -117.214 }}>
              <div style={{ background: `white`, border: `1px solid #ccc`, padding: 15 }}>
                <h1>InfoWindow</h1>
              </div>
            </InfoWindow>
          </GoogleMap>
        </GoogleMapProvider>
      </div>
    )
  }
}
