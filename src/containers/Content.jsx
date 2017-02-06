import React, { Component } from 'react'
import Drawer from './Drawer'
import Figure from './Figure'
import '../../css/Content.css'

export default class Content extends Component {
	render() {
		return (
			<main className="demo-main mdl-layout__content">
				<div className="demo-container mdl-grid">
					<div className="mdl-cell mdl-cell--3-col">
						<Drawer />
					</div>
					<div className="content demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--9-col">
						<Figure />
					</div>
				</div>
			</main>
		)
	}
}
