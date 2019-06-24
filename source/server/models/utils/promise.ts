import {pool} from "../";
import {QueryResult} from "pg";

function pgPromise(query: string | { text: string, values: any[] }): Promise<QueryResult> {
    return new Promise((resolve: (data: QueryResult) => void, reject: (error: Error) => void) => {
        pool.query(query, (err: Error, result: QueryResult) => {
            if (err)
                reject(err);
            else {
                resolve(result);
            }
        });
    });
}

export {
    pgPromise,
}
