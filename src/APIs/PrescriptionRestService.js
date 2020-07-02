import axios from 'axios'
import { BASE_REST_URL, PRESCRIPTION_REST_URL } from '../Helpers/ConstantsHelper'

class PrescriptionRestService {
    getAllPrescriptionList() {
        return axios.get(`${BASE_REST_URL}${PRESCRIPTION_REST_URL}`)
    }

    getPrescriptionsListByLine(line) {
        return axios.get(`${BASE_REST_URL}${PRESCRIPTION_REST_URL}/line/${line}`)
    }

    getPrescriptionsListByRole(role, line) {
        return axios.get(`${BASE_REST_URL}${PRESCRIPTION_REST_URL}/role/${role}/${line}`)
    }

    getUserPrescriptionList(username) {
        return axios.get(`${BASE_REST_URL}${PRESCRIPTION_REST_URL}/user/${username}`)
    }

    getPrescriptionDetails(id) {
        return axios.get(`${BASE_REST_URL}${PRESCRIPTION_REST_URL}/${id}`)
    }

    updatePrescription(data) {
        return axios.put(`${BASE_REST_URL}${PRESCRIPTION_REST_URL}`, data)
    }

    updateCategory(id, data) {
        return axios.put(`${BASE_REST_URL}${PRESCRIPTION_REST_URL}/${id}`, data, { headers: { "Content-Type": "text/plain" } })
    }

    updateOwner(id, data) {
        return axios.put(`${BASE_REST_URL}${PRESCRIPTION_REST_URL}/owner/${id}`, data, { headers: { "Content-Type": "text/plain" } })
    }
}

export default new PrescriptionRestService()
