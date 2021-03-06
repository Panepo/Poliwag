import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InputBoxValue from '../components/InputBoxValue'
import ToggleButton from '../components/ToggleButton'
import {
  modifySource,
  modifyFactor,
  modifyParamenter,
  modifyOption
} from '../actions'
import '../../css/Drawer.css'

class Drawer extends Component {
  render() {
    const {
      modifySource,
      modifyFactor,
      modifyParamenter,
      modifyOption
    } = this.props
    const { dispOption } = this.props
    const { speedFactor, reportFactor, sourceFactor, noiseFactor } = this.props
    const { aveFactor, limFactor, mode, point } = this.props

    const buttonClassActive =
      'type-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary'
    const buttonClassInactive =
      'type-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent'

    return (
      <div className="drawer">
        <ToggleButton
          display={dispOption & 1}
          title={'raw data'}
          onClickFunc={modelId => {
            modifyOption(modelId)
          }}
          modelId={'dispOption1'}
          classActive={buttonClassActive}
          classInactive={buttonClassInactive}
        />
        <ToggleButton
          display={dispOption & 2}
          title={'noise data'}
          onClickFunc={modelId => {
            modifyOption(modelId)
          }}
          modelId={'dispOption2'}
          classActive={buttonClassActive}
          classInactive={buttonClassInactive}
        />
        <ToggleButton
          display={dispOption & 4}
          title={'output data'}
          onClickFunc={modelId => {
            modifyOption(modelId)
          }}
          modelId={'dispOption4'}
          classActive={buttonClassActive}
          classInactive={buttonClassInactive}
        />
        <InputBoxValue
          classes={'text-input'}
          title={'Option: Point'}
          modelId={'point'}
          inputFunc={(modelId, modelValue) => {
            modifyParamenter(modelId, modelValue)
          }}
          defaultValue={point}
        />
        <InputBoxValue
          classes={'text-input'}
          title={'Factor: length'}
          modelId={'speedFactor'}
          inputFunc={(modelId, modelValue) => {
            modifyFactor(modelId, modelValue)
          }}
          defaultValue={speedFactor}
        />
        <InputBoxValue
          classes={'text-input'}
          title={'Factor: noise'}
          modelId={'noiseFactor'}
          inputFunc={(modelId, modelValue) => {
            modifyFactor(modelId, modelValue)
          }}
          defaultValue={noiseFactor}
        />
        <InputBoxValue
          classes={'text-input'}
          title={'Paramenter: Average'}
          modelId={'aveFactor'}
          inputFunc={(modelId, modelValue) => {
            modifyParamenter(modelId, modelValue)
          }}
          defaultValue={aveFactor}
        />
        <InputBoxValue
          classes={'text-input'}
          title={'Paramenter: Limitation'}
          modelId={'limFactor'}
          inputFunc={(modelId, modelValue) => {
            modifyParamenter(modelId, modelValue)
          }}
          defaultValue={limFactor}
        />
        <InputBoxValue
          classes={'text-input'}
          title={'Paramenter: Mode'}
          modelId={'mode'}
          inputFunc={(modelId, modelValue) => {
            modifyParamenter(modelId, modelValue)
          }}
          defaultValue={mode}
        />
      </div>
    )
  }
}

Drawer.propTypes = {
  dispOption: PropTypes.number.isRequired,
  speedFactor: PropTypes.number.isRequired,
  reportFactor: PropTypes.number.isRequired,
  sourceFactor: PropTypes.object.isRequired,
  noiseFactor: PropTypes.number.isRequired,
  aveFactor: PropTypes.number.isRequired,
  limFactor: PropTypes.number.isRequired,
  mode: PropTypes.number.isRequired,
  point: PropTypes.number.isRequired,
  modifySource: PropTypes.func.isRequired,
  modifyFactor: PropTypes.func.isRequired,
  modifyParamenter: PropTypes.func.isRequired,
  modifyOption: PropTypes.func.isRequired
}

const mapStateToProps = function(state) {
  return {
    dispOption: state.reducerCalc.dispOption,
    speedFactor: state.reducerCalc.speedFactor,
    reportFactor: state.reducerCalc.reportFactor,
    sourceFactor: state.reducerCalc.sourceFactor,
    noiseFactor: state.reducerCalc.noiseFactor,
    aveFactor: state.reducerCalc.aveFactor,
    limFactor: state.reducerCalc.limFactor,
    mode: state.reducerCalc.mode,
    point: state.reducerCalc.point
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    modifySource: bindActionCreators(modifySource, dispatch),
    modifyFactor: bindActionCreators(modifyFactor, dispatch),
    modifyParamenter: bindActionCreators(modifyParamenter, dispatch),
    modifyOption: bindActionCreators(modifyOption, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
