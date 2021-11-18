import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import recipe from "./recipe"

export default combineReducers({
    auth,
    message,
    recipe
});