import $ from 'jquery'
import React, { Component } from "react";
import PrescriptionService from "../APIs/PrescriptionService";
import PrescriptionHelper from "../Helpers/PrescriptionHelper";
import AuthenticationService from "../APIs/AuthenticationService";

class PrescriptionPostComponent extends Component {
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
            disable: false,
            updateSuccess: false,
            updateError: false,
            statusMessage: null
        }

        this.goBack = this.goBack.bind(this)
        this.send = this.send.bind(this)
    }

    componentDidMount() {
        const id = atob(this.props.Id);
        const statusMessage = this.props.Action === 'empaque' ? 'Entregable' : 'Entregado';
        let prescription = PrescriptionService.getPrescriptionListById(parseInt(id));
        let drugs = [];
        //const action = PrescriptionLineService.getUserAction();

        if(prescription) {
            if(prescription.owner !== AuthenticationService.getLoggedInUser()) {
                this.props.Redirect();
            }

            drugs = prescription.medicates;
            delete prescription.medicates;
        }

        this.setState({ id, drugs, prescription, statusMessage });
    }

    goBack() {
        $('#revertModal').modal('hide');
        let prescription = {...this.state.prescription};
        prescription.medicates = [...this.state.drugs];
        prescription.owner = '';

        PrescriptionService.update(prescription);
        this.props.Redirect();
    }

    send() {
        $('#customModal').modal('hide');
        let prescription = {...this.state.prescription};
        prescription.medicates = [...this.state.drugs];
        prescription.status = this.props.Action === 'empaque' ? 'Deliverable' : 'Delivered';
        prescription.dueDate = (new Date()).toISOString();
        prescription.owner = '';
        
        PrescriptionService.update(prescription);
        this.props.Redirect();
    }

    render() {
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
                                    <h5 className="modal-title" id="exampleModalLabel">Receta atendida</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body text-left">
                                    <p>La receta ser&aacute; actualizada con el estado <strong>{this.state.statusMessage}</strong></p>
                                    <p>Favor confirmar</p>
								</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-primary" onClick={this.send}>Confirmar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="revertModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Receta liberada</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body text-left">
                                    <p>La receta se liberar&aacute; y cualquier empacador podrá atenderla</p>
                                    <p>Favor confirmar</p>
								</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="button" className="btn btn-primary" onClick={this.goBack}>Confirmar</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                            <p><b>Fecha Ingreso</b>: {PrescriptionHelper.getDate(this.state.prescription.createdDate)}</p>
                        </div>
                        <div className="col-sm-6 col-md-6"></div>
                        <div className="col-sm-6 col-md-6">
                            <p><b>Fecha Atendida</b>: {PrescriptionHelper.getDate(this.state.prescription.dueDate)}</p>
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
                                            <input type="checkbox" className="form-check-input" id={'medicate-' + index} disabled={true} checked />
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
                        <button type="button" className="btn btn-primary float-left" data-toggle="modal" data-target="#revertModal">Cerrar</button>
                        <button type="button" className="btn btn-success float-right" data-toggle="modal" data-target="#customModal">Aprobar</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default PrescriptionPostComponent
