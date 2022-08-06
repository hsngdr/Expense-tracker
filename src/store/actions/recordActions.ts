import { RecordDispatch, Record, RecordForm } from '../../types/record';
import api from '../../utils/api';


export const getRecords = () => async (dispatch: RecordDispatch) => {
    dispatch({ type: "GET_RECORDS_START" });
    try {
        const response = await api().get<Record[]>("/records");
        response.data.sort((a, b) => b.id - a.id);
        dispatch({ type: "GET_RECORDS_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_RECORDS_ERROR" });
    }
}
export const addRecord = (form: RecordForm) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "ADD_RECORD_START" });
    try {
        const response = await api().post<Record>("/records", form);
        dispatch({ type: "ADD_RECORD_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "ADD_RECORD_ERROR" });
    }
}
export const updateRecord = (form: Partial<Record>, recordId: Record['id']) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "UPDATE_RECORD_START" });
    try {
        const response = await api().put<Record>("/records/" + recordId, form);
        dispatch({ type: "UPDATE_RECORD_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "UPDATE_RECORD_ERROR" });
    }
}
export const deleteRecord = (recordId: Record['id']) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "DELETE_RECORD_START" });
    try {
        await api().delete("/records/" + recordId);
        dispatch({ type: "DELETE_RECORD_SUCCESS", payload: recordId });
    } catch (error) {
        dispatch({ type: "DELETE_RECORD_ERROR" });
    }
}
