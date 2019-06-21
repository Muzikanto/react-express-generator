import {EXAMPLE_ACTIONS} from "./keys";
import {IExampleReducerOptions} from "../Example.typings";

export const actionExampleSet = (state: Partial<IExampleReducerOptions>) => ({
    state,
    type: EXAMPLE_ACTIONS.SET,
} as const);
