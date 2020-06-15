import React, { Component } from 'react'
import PrescriptionBaseComponent from './PrescriptionBaseComponent.jsx'

class PrescriptionComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userRole: '',
			modal: {
				showMsg: true,
				customTitle: "Guardar receta",
				customSaveMsg: "La receta se guardará con el estado actual"
			}
		}

		this.goBack = this.goBack.bind(this)
	}

	goBack() {
		this.props.history.push('/recetas')
	}

	render() {
		return (
			<PrescriptionBaseComponent Redirect={this.goBack} PrescriptionId={this.props.match.params.id} ModalSettings={this.state.modal}/>
		)
	}
}

export default PrescriptionComponent
