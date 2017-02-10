import React, { Component, PropTypes } from 'react'

export default class ToggleButton extends Component {
	render() {
		const { display, title, onClickFunc, modelId, Cactive, Cinactive } = this.props

		let bClassName = ''
		if (display) {
			bClassName = Cactive
		} else {
			bClassName = Cinactive
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
	Cactive: PropTypes.string,
	Cinactive: PropTypes.string
}
