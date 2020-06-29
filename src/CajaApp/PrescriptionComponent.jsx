import React, { Component } from 'react';
import PrescriptionFarma from './PrescriptionFarmaComponent.jsx';
import PrescriptionAcopia from './PrescriptionAcopiaComponent.jsx';
import PrescriptionLineService from '../APIs/PrescriptionLineService.js';
import PrescriptionPost from './PrescriptionPostComponent.jsx';


class PrescriptionComponent extends Component {
	constructor(props) {
		super(props)

		this.redirect = this.redirect.bind(this)
	}

	redirect() {
		this.props.history.push('/dashboard')
	}

	render() {
		let currentComponent = null;
		const userAction = PrescriptionLineService.getUserAction()

		switch (userAction) {
			case 'normal':
				currentComponent = <PrescriptionAcopia Id={this.props.match.params.id} Redirect={this.redirect} />;
				break;

			case 'waiting': case 'special':
				currentComponent = <PrescriptionFarma Id={this.props.match.params.id} Redirect={this.redirect} />;
				break;

			case 'empaque': case 'entrega':
				currentComponent = <PrescriptionPost Id={this.props.match.params.id} Redirect={this.redirect} Action={userAction}/>;
				break;

			default:
				currentComponent = null;
				break;
		}

		return currentComponent;
	}
}

export default PrescriptionComponent
