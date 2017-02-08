import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { LineChart } from 'rd3'

class Figure extends Component {
	render() {
		const { output } = this.props
		const { speedFactor, reportFactor, sourceFactor, noiseFactor } = this.props
		const { linearFactor, jitterFactor, mode, point } = this.props

		return (
			<div className="figure">
				<LineChart
					legend={true}
					data={output}
					width="100%"
					height={800}
					circleRadius={0}
					viewBoxObject={{
						x: 0,
						y: 0,
						width: 500,
						height: 400
					}}
					gridHorizontal={true}
				/>
			</div>
		)
	}
}

Figure.propTypes = {
	dispOption: PropTypes.number.isRequired,
	output: PropTypes.array.isRequired,
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
		dispOption: state.reducerCalc.dispOption,
		output: state.reducerCalc.output,
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

export default connect(
	mapStateToProps
)(Figure)
