export const PRESCRIPTION_LINE_SESSION_ATTRIBUTE_NAME = btoa('presciptionLine')
export const USER_ACTION_SESSION_ATTRIBUTE_NAME = btoa('functionLine')

class PrescriptionLineService {
    registerPrescriptionLine(line) {
        sessionStorage.setItem(PRESCRIPTION_LINE_SESSION_ATTRIBUTE_NAME, btoa(line))
    }

    isPrescriptionLineDefined() {
        return sessionStorage.getItem(PRESCRIPTION_LINE_SESSION_ATTRIBUTE_NAME) !== null
    }

    getPrescriptionLine() {
        return this.isPrescriptionLineDefined()
            ? atob(sessionStorage.getItem(PRESCRIPTION_LINE_SESSION_ATTRIBUTE_NAME))
            : 'none'
    }

    unregisterPrescriptionLine() {
        sessionStorage.removeItem(PRESCRIPTION_LINE_SESSION_ATTRIBUTE_NAME)
    }

    registerUserAction(action) {
        sessionStorage.setItem(USER_ACTION_SESSION_ATTRIBUTE_NAME, btoa(action))
    }

    isUserActionDefined() {
        return sessionStorage.getItem(USER_ACTION_SESSION_ATTRIBUTE_NAME) !== null
    }

    getUserAction() {
        return this.isUserActionDefined()
            ? atob(sessionStorage.getItem(USER_ACTION_SESSION_ATTRIBUTE_NAME))
            : 'none'
    }

    unregisterUserAction() {
        sessionStorage.removeItem(USER_ACTION_SESSION_ATTRIBUTE_NAME)
    }
}

export default new PrescriptionLineService()
