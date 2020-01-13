import {
    GET_NOTES,
    ADD_NOTE,
    UPDATE_NOTE,
    DELETE_NOTE,
    SIGN_UP,
    LOGIN
} from "../actions/api";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_NOTES:
            return { ...state, get_note_data: action.data };
        case ADD_NOTE:
            return { ...state, add_note_data: action.data };
        case UPDATE_NOTE:
            return { ...state, update_note_data: action.data };
        case DELETE_NOTE:
            return { ...state, delete_note_data: action.data };
        case SIGN_UP:
            return { ...state, sign_up_data: action.data };
        case LOGIN:
            return { ...state, login_data: action.data };
        default:
            return state;
    }
}