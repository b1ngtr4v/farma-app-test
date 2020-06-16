import $ from 'jquery'
import React, { Component } from "react"
import PrescriptionService from './../APIs/PrescriptionService.js'
import PrescriptionHelper from './../Helpers/PrescriptionHelper.js'
import AuthenticationService from "../APIs/AuthenticationService.js"

class PrescriptionBaseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            drugs: [],
            prescription: {
                category: null,
                queue: null,
                createdDate: null,
                status: 'Backlog'
            },
            comment: '',
            customSave: {
                showMsg: false,
                customTitle: null,
                customSaveMsg: null
            },
            status: PrescriptionHelper.getStatusByRole(AuthenticationService.getLoggedInUserRole()),
            changed: false,
            disable: false,
            updateSuccess: false,
            updateError: false
        }

        this.savePrescription = this.savePrescription.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
    }

    componentDidMount() {
        if (this.props.ModalSettings) {
            this.setState({ customSave: this.props.ModalSettings })
        }

        const id = atob(this.props.PrescriptionId);
        let prescription = PrescriptionService.getPrescriptionListById(
            parseInt(id)
        );
        let drugs = [];
        
        if (prescription) {
            drugs = prescription.medicates;
            delete prescription.medicates;
        }

        this.setState({ id, drugs, prescription });
    }

    handleTextChange(e) {
        const type = e.target.id.split('-')
        let actVarName
        let actVar

        switch (type[0]) {
            case 'prescription':
                actVarName = 'prescription'
                actVar = { ...this.state.prescription }
                actVar[type[1]] = e.target.value
                break
            case 'medicate':
                actVarName = 'drugs'
                actVar = [...this.state.drugs]
                actVar[type[1]].checked = e.target.checked
                break
            default:
                actVarName = type[0]
                actVar = e.target.value
        }

        this.setState({
            [actVarName]: actVar
        }, this.UpdateStatus())
    }

    UpdateStatus() {
        let prescription = this.state.prescription
        prescription.status = "Backlog"
        const drugs = this.state.drugs
        let incompleted = false

        // eslint-disable-next-line
        drugs.map(drug => {
            if (!incompleted && !drug.checked) {
                incompleted = true
            } else if (drug.checked && prescription.status !== "In Progress") {
                prescription.status = "In Progress"
            }
        })

        if (!incompleted) {
            prescription.status = "Completed"
        }

        this.setState({ prescription })
    }

    executeBack() {

    }

    savePrescription(e) {
        e.preventDefault()

        this.setState({ disable: true, updateSuccess: false, updateError: null })
        $('#customModal').modal('hide');

        let prescription = { ...this.state.prescription }
        prescription.id = this.state.id
        prescription.medicates = this.state.drugs
        //prescription.comments = [this.state.comment]
        prescription.comments = null
        let updateError = null
        let updateSuccess = false

        if (PrescriptionService.update(prescription)) {
            updateSuccess = true

            setTimeout(() => {
                this.props.Redirect()
            }, 2500)
        } else {
            updateError = 'No actualizado'
            console.log(updateError)
        }

        this.setState({ updateSuccess, updateError })
    }

    render() {
        return (
            <div className="domain">
                <h2>Receta {this.state.id}</h2>
                <div className="container col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    {this.state.updateSuccess && <div className="alert alert-success text-center">Receta actualizada correctamente</div>}
                    {this.state.updateError && <div className="alert alert-warning text-center">No se logr&oacute; actualizar, intente m&aacute;s tarde</div>}
                    <div className="row mt-4 text-left">
                        <div className="col-sm-6 col-md-6">
                            <p><b>Categor&iacute;a</b>: {PrescriptionHelper.getCategoryName(this.state.prescription.category)}</p>
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
                    <form onSubmit={this.savePrescription}>
                        <div className="modal fade" id="customModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">{this.state.customSave.customTitle}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {this.state.customSave.customSaveMsg}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="submit" className="btn btn-primary" disabled={this.state.disable}>Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="backModal" tabIndex="-1" role="dialog" aria-labelledby="back" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="back">{this.state.customSave.customTitle}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {this.state.customSave.customSaveMsg}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="submit" className="btn btn-primary" disabled={this.state.disable}>Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="m-2">
                            {this.state.drugs && this.state.drugs.map((drug, index) => {
                                return (
                                    <div className="form-group row border rounded px-4 py-2 " key={'medicate-' + index}>
                                        <div className="form-check w-100">
                                            <input type="checkbox" className="form-check-input" id={'medicate-' + index} checked={this.state.drugs[index].checked} onChange={this.handleTextChange} />
                                            <label className="form-check-label text-left ml-2 w-100" htmlFor={'medicate-' + index}>
                                                <div className="row">
                                                    <div className="col-sm-7">
                                                        <p>
                                                            <b>Medicamento</b>: {drug.name}
                                                            <br />
                                                            <b>Cantidad</b>: {drug.quantity}
                                                            <br />
                                                            <b>Presentaci&oacute;n</b>: {drug.presentation}
                                                        </p>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <p>
                                                            <b>Clase</b>: {drug.classType}
                                                            <br />
                                                            <b>Frecuencia</b>: {drug.freqType}
                                                            <br />
                                                            <b>Rango</b>: {drug.rangeType}
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
                        {this.state.drugs && <div className="row mb-2 text-left">
                            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8"></div>
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                <label htmlFor="prescription-status">Estado</label>
                                <select className="form-control" id="prescription-status" value={this.state.prescription.status} disabled>
                                    {
                                        this.state.status.map((status, index) => {
                                            return <option value={status.id} key={index}>{status.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>}
                        <button type="button" className="btn btn-primary float-left" onClick={this.props.Redirect} disabled={this.state.disable}>Atr&aacute;s</button>
                        {this.state.customSave.showMsg && <button type="button" className="btn btn-success float-right" data-toggle="modal" data-target="#customModal" disabled={this.state.disable}>
                            Guardar y salir
						</button>}
                        {!this.state.customSave.showMsg && <button type="submit" className="btn btn-success float-right" disabled={this.state.disable}>Guardar y salir</button>}
                    </form>
                </div>
            </div>
        )
    }
}

export default PrescriptionBaseComponent
