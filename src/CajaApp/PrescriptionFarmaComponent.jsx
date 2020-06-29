import React, { Component } from 'react'
import PrescriptionHelper from '../Helpers/PrescriptionHelper.js'
import AuthenticationService from '../APIs/AuthenticationService.js'
import PrescriptionBaseComponent from './PrescriptionBaseComponent.jsx'

class PrescriptionAcopiaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userRole: '',
            modalConfig: {
                showMsg: true,
                customTitle: "Revisar receta",
                customSaveMsg: "La receta será registrada con el estado indicado, ¡Verifíquelo!"
            },
            statusConfig: {
                status: PrescriptionHelper.getStatusByRole(AuthenticationService.getLoggedInUserRole()),
                disabled: false
            }
        }
    }

    changeStatus(drugsStatus) {
        let result = null

        switch (drugsStatus) {
            case 'Empty':
                result = 'Waiting';
                break;

            case 'Mid':
                result = 'Waiting';
                break;

            case 'Full':
                result = 'Approved';
                break;

            default:
                result = 'Waiting';
                break;
        }

        return result
    }

    releasePrescription(status) {
        return ['Backlog', 'Approved','Deliverable'].indexOf(status) >= 0
    }

    render() {
        return (
            <PrescriptionBaseComponent Redirect={this.props.Redirect} PrescriptionId={this.props.Id} ModalSettings={this.state.modalConfig} statusSettings={this.state.statusConfig} statusHandler={this.changeStatus} releaseOwner={this.releasePrescription}/>
        )
    }
}

export default PrescriptionAcopiaComponent
