import $ from 'jquery'
import React, { Component } from "react";
import PrescriptionService from "./../APIs/PrescriptionService.js";
import PrescriptionHelper from "./../Helpers/PrescriptionHelper.js";
import AuthenticationService from '../APIs/AuthenticationService.js'

class PrescriptionDetailsComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: 0,
			drugs: [],
			prescription: {
				category: undefined,
				queue: null,
				createdDate: null,
				status: '',
				owner: ''
			},
			role: false,
			disable: false,
			asign: true,
			updateSuccess: false,
			updateError: false
		}

		this.atend = this.atend.bind(this)
		this.goBack = this.goBack.bind(this)
		this.changeCategory = this.changeCategory.bind(this)
		this.setAssigned = this.setAssigned.bind(this)
	}

	componentDidMount() {
		let role = false
		let asign = false
		const id = atob(this.props.match.params.id);
		let prescription = PrescriptionService.getPrescriptionListById(
			parseInt(id)
		);
		let drugs = [];

		if (prescription) {
			drugs = prescription.medicates;
			delete prescription.medicates;
		}

		if (['secretaria', 'admin'].indexOf(AuthenticationService.getLoggedInUserRole()) >= 0) {
			role = true
		}

		if (['tecnico', 'farma', 'admin'].indexOf(AuthenticationService.getLoggedInUserRole()) >= 0) {
			asign = true
		}

		this.setState({ id, drugs, prescription, role, asign });
	}

	changeCategory(e) {
		let prescription = this.state.prescription
		prescription.category = e.target.value

		this.setState({ prescription, disable: true, updateSuccess: false, updateError: false })

		// Update prescription category
		if (PrescriptionService.updateCategory(this.state.id, btoa(prescription.category))) {
			setTimeout(() => {
				this.setState({ updateSuccess: true })
				this.setState({ disable: false })
			}, 500)
		}
	}

	setAssigned() {
		this.setState({ updateSuccess: false, updateError: false })
		if (PrescriptionService.updateOwner(this.state.id, btoa(AuthenticationService.getLoggedInUserName()))) {
			setTimeout(() => {
				this.setState({ updateSuccess: true, asign: false })
				$('#customModal').modal('show');
			}, 500)
		}
	}

	atend() {
		$('#customModal').modal('hide');
		this.props.history.push(`/receta/${btoa(this.state.id)}`)
	}

	goBack() {
		this.props.history.push('/dashboard')
	}

	render() {
		let canTake = this.state.asign && this.state.prescription.owner.length === 0
		return (
			<div className="domain">
				<h2>Receta {this.state.id}</h2>
				<div className="container col-xs-12 col-sm-12 col-md-6 col-lg-6">
					{this.state.updateSuccess && <div className="alert alert-success text-center">Receta actualizada correctamente</div>}
					{this.state.updateError && <div className="alert alert-warning text-center">No se logr&oacute; actualizar, intente m&aacute;s tarde</div>}
					<div className="modal fade" id="customModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">Receta asignada</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									Receta asignada, ¿Desea atenderla?
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
									<button type="button" className="btn btn-primary" onClick={this.atend}>Atender</button>
								</div>
							</div>
						</div>
					</div>
					<div className="row mt-4 text-left">
						<div className="col-sm-6 col-md-6">
							{!this.state.role && <p><b>Categor&iacute;a</b>: {PrescriptionHelper.getCategoryName(this.state.prescription.category)}</p>}
							{this.state.role && <label htmlFor="category"><b>Categor&iacute;a</b>: &nbsp;</label>}
							{this.state.role && <select className="d-inline form-control w-50" id="category" onChange={this.changeCategory} value={this.state.prescription.category} disabled={this.state.disable}>
								{
									PrescriptionHelper.getCategories().map((category, index) => {
										return <option value={category.id} key={index}>{category.name}</option>
									})
								}
							</select>}
						</div>
						<div className="col-sm-6 col-md-6">
							<p><b>L&iacute;nea</b>: {PrescriptionHelper.getQueueName(this.state.prescription.queue)}</p>
						</div>
						<div className="col-sm-6 col-md-6">
							<p><b>Tipo</b>: {PrescriptionHelper.getClassTypeName(this.state.prescription.classType)}</p>
						</div>
						<div className="col-sm-6 col-md-6">
							<p><b>Fecha</b>: {PrescriptionHelper.getDate(this.state.prescription.createdDate)}</p>
						</div>
					</div>
				</div>
				<div className="container col-xs-12 col-sm-12 col-md-6 col-lg-6">
					<form>
						<div className="m-2">
							{this.state.drugs && this.state.drugs.map((drug, index) => {
								return (
									<div className="form-group row border rounded px-4 py-2" key={'medicate-' + index}>
										<div className="form-check w-100">
											<input type="checkbox" className="form-check-input" id={'medicate-' + index} disabled={true} checked={drug.checked} />
											<label className="form-check-label text-left ml-2 w-100" htmlFor={'medicate-' + index}>
												<div className="row">
													<div className="col-sm-7">
														<p>
															<b>Medicamento</b>: {drug.name}
															<br />
															<b>Frecuencia</b>: {drug.freqType}
															<br />
															<b>Rango</b>: {drug.rangeType}
														</p>
													</div>
													<div className="col-sm-5">
														<p>
															<b>Clase</b>: {drug.classType}
															<br />
															<b>Cantidad</b>: {drug.quantity}
															<br />
															<b>Presentaci&oacute;n</b>: {drug.presentation}
														</p>
													</div>
												</div>
											</label>
										</div>
									</div>
								)
							})}
							{!this.state.drugs && <div>No se obtuvo informaci&oacute;n sobre esta receta</div>}
						</div>
						<button type="button" className="btn btn-primary float-left" onClick={this.goBack} disabled={this.state.disable}>Cerrar</button>
						{canTake && <button type="button" className="btn btn-success float-right" onClick={this.setAssigned} disabled={this.state.disable}>Asignarme</button>}
						{!canTake && <button type="button" className="btn btn-danger float-right" disabled>Ya Asignado</button>}
					</form>
				</div>
			</div>
		)
	}
}

export default PrescriptionDetailsComponent
