import { CategoryAction, CategoryState } from "../../types/category";

const defaultState: CategoryState = {
    data: [],
    loading: false,
    error: ''
}
const categoryReducer = (state: CategoryState = defaultState, action: CategoryAction) => {
    switch (action.type) {
        case 'GET_CATEGORIES_START':
            return {
                ...state,
                loading: true,
                error: ''
            }
        case 'GET_CATEGORIES_SUCCESS':
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case 'GET_CATEGORIES_ERROR':
            return {
                ...state,
                error: 'Error fetching categories',
                loading: false
            }
        case 'ADD_CATEGORY_START':
            return {
                ...state,
                loading: true,
                error: ''
            }
        case 'ADD_CATEGORY_SUCCESS':
            return {
                ...state,
                data: [action.payload, ...state.data],
                loading: false
            }
        case 'ADD_CATEGORY_ERROR':
            return {
                ...state,
                error: 'Error adding category',
                loading: false
            }
        case 'UPDATE_CATEGORY_START':
            return {
                ...state,
                loading: true,
                error: ''
            }
        case 'UPDATE_CATEGORY_SUCCESS':
            return {
                ...state,
                data: state.data.map(category => category.id === action.payload.id ? action.payload : category),
                loading: false
            }
        case 'UPDATE_CATEGORY_ERROR':
            return {
                ...state,
                error: 'Error updating category',
                loading: false
            }
        case 'DELETE_CATEGORY_START':
            return {
                ...state,
                loading: true,
                error: ''
            }
        case 'DELETE_CATEGORY_SUCCESS':
            return {
                ...state,
                data: state.data.filter(category => category.id !== action.payload),
                loading: false
            }
        case 'DELETE_CATEGORY_ERROR':
            return {
                ...state,
                error: 'Error deleting category',
                loading: false
            }

        default:
            return state;
    }
}
export default categoryReducer;