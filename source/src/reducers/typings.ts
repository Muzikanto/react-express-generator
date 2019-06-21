import {IExampleReducerOptions} from "./Example/Example.typings";

export interface IStore {
    Example: IExampleReducerOptions;
}

export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type IReducerActionsTypes<T extends {[key: string]: any}> = ReturnType<InferValueTypes<T>>;

type ArgumentTypes<F extends (...args: any) => any> = F extends (data: infer A) => void ? A : never;
export type IActionType<T extends (...args: any) => any> = (data: ArgumentTypes<T>) => void;
