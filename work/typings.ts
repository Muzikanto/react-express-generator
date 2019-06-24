export interface IAnswers {
    name: string;
    heroku: boolean;
    project: Array<'jest' | 'tslint' | 'scss|sass' | 'husky'>;
    server: Array<'cluster' | 'postgreSql' | 'postgreSql-session'>;
    client: Array<'material-ui' | 'history'>;
}

export interface IConfig {
    name: string,
    heroku: boolean,
    husky: boolean,
    jest: boolean,
    scss: boolean,
    materialUi: boolean,
    cluster: boolean
    tslint: boolean;
    history: boolean;
    pg: boolean;
    pgSession: boolean;
}
