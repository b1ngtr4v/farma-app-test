export const PRESCRIPTION_LINE_SESSION_ATTRIBUTE_NAME = btoa('presciptionLine')

class PrescriptionLineService {
    registerPrescriptionLine(line) {
        sessionStorage.setItem(PRESCRIPTION_LINE_SESSION_ATTRIBUTE_NAME, btoa(line))
    }

    getPrescriptionLine() {
        const line = sessionStorage.getItem(PRESCRIPTION_LINE_SESSION_ATTRIBUTE_NAME)

        return line.length > 0 ? atob(line) : 'none'
    }

    unregisterPrescriptionLine() {
        sessionStorage.removeItem(PRESCRIPTION_LINE_SESSION_ATTRIBUTE_NAME)
    }

    isPrescriptionLineDefined() {
        return sessionStorage.getItem(PRESCRIPTION_LINE_SESSION_ATTRIBUTE_NAME) !== null
    }
}

export default new PrescriptionLineService()