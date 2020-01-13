import axios from 'axios';
import * as util from "../util";

export const API_DATA = "API_DATA";
export const GET_NOTES = "GET_NOTES";
export const ADD_NOTE = "ADD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

const API_URL = 'http://localhost:8000';

export function signup(params) {
    return dispatch => {
        return axios.post(`${API_URL}/auth/signup`, params)
            .then((response) => {
                const result = response.data;
                dispatch({ type: SIGN_UP, data: result });
            })
            .catch(({ ...error }) => {
                dispatch({ type: SIGN_UP, data: error });
                throw (error);
            });
    }
}

export function login(params) {
    return dispatch => {
        return axios.post(`${API_URL}/auth/login`, params)
            .then((response) => {
                const result = response.data;
                if (response && response.data && response.data.user) {
                    util.setUser(response.data.user)
                }
                dispatch({ type: LOGIN, data: result });
            })
            .catch(({ ...error }) => {
                const result = error.data;
                dispatch({ type: LOGIN, data: result });
                throw (error);
            });
    }
}

export function getNotes() {
    return dispatch => {
        return axios.get(`${API_URL}/getNotes`)
            .then((response) => {
                const result = response.data;
                dispatch({ type: GET_NOTES, data: result });
            })
            .catch(({ ...error }) => {
                dispatch({ type: GET_NOTES, data: error });
                throw (error);
            });
    }
}

export function addNote(params, token) {
    const configuration = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    return dispatch => {
        return axios.post(`${API_URL}/addNote`, params, configuration)
            .then((response) => {
                const result = response.data;
                dispatch({ type: ADD_NOTE, data: result });
            })
            .catch(({ ...error }) => {
                dispatch({ type: ADD_NOTE, data: error });
                throw (error);
            });
    }
}

export function updateNote(params, token) {
    const configuration = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    return dispatch => {
        return axios.put(`${API_URL}/updateNote`, params, configuration)
            .then((response) => {
                const result = response.data;
                dispatch({ type: UPDATE_NOTE, data: result });
            })
            .catch(({ ...error }) => {
                dispatch({ type: UPDATE_NOTE, data: error });
                throw (error);
            });
    }
}

export function deleteNote(params, token) {
    const configuration = {
        headers: {
            Authorization: `bearer ${token}`
        },
        data: params
    }
    return dispatch => {
        return axios.delete(`${API_URL}/deleteNote`, configuration)
            .then((response) => {
                const result = response.data;
                dispatch({ type: DELETE_NOTE, data: result });
            })
            .catch(({ ...error }) => {
                dispatch({ type: DELETE_NOTE, data: error });
                throw (error);
            });
    }
}

export function logout() {
    return dispatch => {
        dispatch({ type: LOGIN, data: null });
    }
}

export function setUser(user) {
    return dispatch => {
        dispatch({ type: LOGIN, data: user });
    }
}
