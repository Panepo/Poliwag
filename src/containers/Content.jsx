import React, { Component } from 'react'
import '../../css/Content.css'

export default class Content extends Component {
	render() {
		return (
			<main className="demo-main mdl-layout__content">
				<div className="demo-container mdl-grid">
					<div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
					<div className="content demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
						<h4>城プロRE 武器傷害機算機 パイルバンカー</h4>
						<h5>設定</h5>
					</div>
				</div>
			</main>
		)
	}
}
