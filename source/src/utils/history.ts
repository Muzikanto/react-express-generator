import {createBrowserHistory, createMemoryHistory} from "history";

export const historyState = typeof window !== 'undefined' ? createBrowserHistory() : createMemoryHistory();
