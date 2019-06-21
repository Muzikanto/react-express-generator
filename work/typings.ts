export interface IAnswers {
    name: string;
    heroku: boolean;
    config: Array<'jest' | 'tslint' | 'scss|sass' | 'husky'>;
}
