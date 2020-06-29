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
                customTitle: "Acopiar receta",
                customSaveMsg: "La receta se guardará con el estado actual"
            },
            statusConfig: {
                status: PrescriptionHelper.getStatusByRole(AuthenticationService.getLoggedInUserRole()),
                disabled: true
            }
        }
    }

    changeStatus(drugsStatus) {
        let result = null

        switch (drugsStatus) {
            case 'Empty':
                result = 'Backlog';
                break;

            case 'Mid':
                result = 'In Progress';
                break;

            case 'Full':
                result = 'Waiting';
                break;

            default:
                result = 'Backlog';
                break;
        }

        return result
    }

    releasePrescription(status) {
        return status === 'Waiting'
    }

    render() {
        return (
            <PrescriptionBaseComponent Redirect={this.props.Redirect} PrescriptionId={this.props.Id} ModalSettings={this.state.modalConfig} statusSettings={this.state.statusConfig} statusHandler={this.changeStatus} releaseOwner={this.releasePrescription}/>
        )
    }
}

export default PrescriptionAcopiaComponent
