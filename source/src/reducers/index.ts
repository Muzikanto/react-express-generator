import {combineReducers} from 'redux'
import {IStore} from "./typings";
import ExampleReducer from "./Example/Example";

const Reducers = combineReducers<IStore>({
    Example: ExampleReducer,
});

export default Reducers;
