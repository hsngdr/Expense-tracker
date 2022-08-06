import { combineReducers } from "redux";
import { CategoryState } from "../types/category";
import { RecordState } from "../types/record";
import { UserState } from "../types/user";
import categoryReducer from "./reducers/categoryReducer";
import recordReducer from "./reducers/recordReducer";
import userReducer from "./reducers/userReducer";

export interface IState {
    user: UserState;
    categories: CategoryState;
    records: RecordState;
}

const rootReducer = combineReducers<IState>({
    user: userReducer,
    categories: categoryReducer,
    records: recordReducer,
});

export default rootReducer;