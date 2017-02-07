import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InputBoxValue from '../components/InputBoxValue'
import { modifyInput } from '../actions'
import '../../css/Drawer.css'

class Drawer extends Component {
	render() {
		const { modifyInput } = this.props
		const { speedFactor, reportFactor, sourceFactor, noiseFactor } = this.props
		const { linearFactor, jitterFactor, mode, point } = this.props
		return (
			<div className="drawer">
				<InputBoxValue
					classes={'text-input'}
					title={'speedFactor'}
					modelId={'speedFactor'}
					inputFunc={(modelId, modelValue) => modifyInput(modelId, modelValue)}
					defaultValue={speedFactor}
				/>
				<InputBoxValue
					classes={'text-input'}
					title={'point'}
					modelId={'point'}
					inputFunc={(modelId, modelValue) => modifyInput(modelId, modelValue)}
					defaultValue={point}
				/>
			</div>
		)
	}
}

Drawer.propTypes = {
	speedFactor: PropTypes.number.isRequired,
	reportFactor: PropTypes.number.isRequired,
	sourceFactor: PropTypes.object.isRequired,
	noiseFactor: PropTypes.number.isRequired,
	linearFactor: PropTypes.number.isRequired,
	jitterFactor: PropTypes.number.isRequired,
	mode: PropTypes.number.isRequired,
	point: PropTypes.number.isRequired
}

const mapStateToProps = function (state) {
	return {
		speedFactor: state.reducerCalc.speedFactor,
		reportFactor: state.reducerCalc.reportFactor,
		sourceFactor: state.reducerCalc.sourceFactor,
		noiseFactor: state.reducerCalc.noiseFactor,
		linearFactor: state.reducerCalc.linearFactor,
		jitterFactor: state.reducerCalc.jitterFactor,
		mode: state.reducerCalc.mode,
		point: state.reducerCalc.point
	}
}

const mapDispatchToProps = function (dispatch) {
	return {
		modifyInput: bindActionCreators(modifyInput, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Drawer)
