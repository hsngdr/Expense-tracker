import { RecordAction, RecordState } from "../../types/record";

const defaultState: RecordState = {
    data: [],
    loading: false,
    error: ''
}
const recordReducer = (state: RecordState = defaultState, action: RecordAction): RecordState => {
    switch (action.type) {
        case 'GET_RECORDS_START':
            return {
                ...state,
                loading: true,
                error: ''
            }
        case 'GET_RECORDS_SUCCESS':
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case 'GET_RECORDS_ERROR':
            return {
                ...state,
                error: 'Error fetching records',
                loading: false
            }
        case 'ADD_RECORD_START':
            return {
                ...state,
                loading: true,
                error: ''
            }
        case 'ADD_RECORD_SUCCESS':
            return {
                ...state,
                data: [action.payload, ...state.data],
                loading: false
            }
        case 'ADD_RECORD_ERROR':
            return {
                ...state,
                error: 'Error adding record',
                loading: false
            }
        case 'UPDATE_RECORD_START':
            return {
                ...state,
                loading: true,
                error: ''
            }
        case 'UPDATE_RECORD_SUCCESS':
            return {
                ...state,
                data: state.data.map(record => record.id === action.payload.id ? action.payload : record),
                loading: false
            }
        case 'UPDATE_RECORD_ERROR':
            return {
                ...state,
                error: 'Error updating record',
                loading: false
            }
        case 'DELETE_RECORD_START':
            return {
                ...state,
                loading: true,
                error: ''
            }
        case 'DELETE_RECORD_SUCCESS':
            return {
                ...state,
                data: state.data.filter(record => record.id !== action.payload),
                loading: false
            }
        case 'DELETE_RECORD_ERROR':
            return {
                ...state,
                error: 'Error deleting record',
                loading: false
            }
        default:
            return state;
    }
}
export default recordReducer;
