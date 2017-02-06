import React, { Component } from 'react'
import '../../css/Header.css'

export default class Header extends Component {
	render() {
		return (
			<header className="demo-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
				<div className="mdl-layout__header-row">
					<span className="mdl-layout-title"></span>
					<div className="mdl-layout-spacer"></div>
					<nav className="mdl-navigation">
					</nav>
				</div>
			</header>
		)
	}
}
