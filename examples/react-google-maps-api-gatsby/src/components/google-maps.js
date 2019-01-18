// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuidv4'
import { connect } from 'react-redux'

import { LoadScript } from 'react-google-maps-api'

import {
  loadingStyle
} from '../components/styles'

import SectionFusion from '../components/section-fusion'
import SectionData from '../components/section-data'
import SectionDirections from '../components/section-directions'
import SectionHeatmap from '../components/section-heatmap'
import SectionTraffic from '../components/section-traffic'
import SectionShapes from '../components/section-shapes'
import SectionDrawing from '../components/section-drawing'
import SectionBicycling from '../components/section-bicycling'
import SectionGround from '../components/section-ground'

const Loading = (
  <div style={loadingStyle} />
)

const googleMapsLibraries = [
  'drawing',
  'visualization'
]

const loaderId = uuid()

const GoogleMaps = ({ googleMapsApiKey, language }) => (
  <LoadScript
    id={loaderId}
    googleMapsApiKey={googleMapsApiKey}
    language={language}
    region={'EN'}
    version={'weekly'}
    onLoad={() => console.log('script loaded')}
    loadingElement={Loading}
    libraries={googleMapsLibraries}
    preventGoogleFontsLoading
  >
    <SectionFusion />

    <SectionData />

    <SectionDirections />

    <SectionHeatmap />

    <SectionTraffic />

    <SectionShapes />

    <SectionDrawing />

    <SectionBicycling />

    <SectionGround />
  </LoadScript>
)

GoogleMaps.propTypes = {
  language: PropTypes.string.isRequired,
  googleMapsApiKey: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  language: state.getIn(['app', 'language']),
  googleMapsApiKey: state.getIn(['app', 'googleMapsApiKey'])
})

export default connect(
  mapStateToProps
)(GoogleMaps)
