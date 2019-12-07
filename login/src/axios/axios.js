import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

export function getStudents() {
        return axios.get(`${BASE_URL}/accounts/retrieveAll`)
                .then(response => response);
}
export function deleteStudent(id) {
        return axios.delete(`${BASE_URL}/account/delete/${id}`)
                .then(response => response)
                .catch(err => Promise.reject(err.message));
}
export function createStudent(data) {
        return axios.post(`${BASE_URL}/add/student/account`, {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        middlename: data.middlename,
                        gender: data.gender,
                        birthdate: data.birthdate,
                        Address: data.Address,
                        email: data.email,
                        description: data.description
                }).then(response => {
                        window.console.log(response)
                        return response.data
                })
                .catch(err => Promise.reject(err.message));
}
export function updateStudent(data, id) {
        return axios.put(`${BASE_URL}/account/update/${id}`, {
                        data
                })
                .then(response => {
                        return response.data
                })
                .catch(err => Promise.reject(err.message));
}