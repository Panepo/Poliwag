import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { LineChart } from 'rd3'

class Figure extends Component {
	render() {
		const { output } = this.props
		
		return (
			<div>
				<LineChart
					legend={true}
					data={output}
					width='100%'
					height={800}
					viewBoxObject={{
						x: 0,
						y: 0,
						width: 500,
						height: 400
					}}
					domain={{x: [-100,], y: [-100,]}}
					gridHorizontal={true}
				/>
			</div>
		)
	}
}

Figure.propTypes = {
	output: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
	return {
		output: state.reducerCalc.output,
	}
}

export default connect(
	mapStateToProps
)(Figure)