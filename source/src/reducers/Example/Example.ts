import {IExampleReducerOptions} from "./Example.typings";
import {IReducerActionsTypes} from "../typings";
import {EXAMPLE_ACTIONS} from "./Example.actions/keys";
import * as actions from './Example.actions'

const initialState: IExampleReducerOptions = {};

const ExampleReducer = (state = initialState, action: IReducerActionsTypes<typeof actions>): IExampleReducerOptions => {
    switch (action.type) {
        case EXAMPLE_ACTIONS.SET:
            return {...state, ...action.state};

        default:
            return state
    }
};

export default ExampleReducer;
