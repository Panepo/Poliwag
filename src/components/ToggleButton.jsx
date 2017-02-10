import React, { Component, PropTypes } from 'react'

export default class ToggleButton extends Component {
	render() {
		const { display, title, onClickFunc, modelId, classActive, classInactive } = this.props

		let bClassName = ''
		if (display) {
			bClassName = classActive
		} else {
			bClassName = classInactive
		}

		return (
			<button className={bClassName} onClick={onClickFunc.bind(null, modelId)}>{title}</button>
		)
	}
}

ToggleButton.propTypes = {
	display: PropTypes.number,
	title: PropTypes.string,
	onClickFunc: PropTypes.func,
	modelId: PropTypes.string,
	classActive: PropTypes.string,
	classInactive: PropTypes.string
}
