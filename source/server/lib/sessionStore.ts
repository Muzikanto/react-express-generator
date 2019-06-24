import {pool} from "../models";

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const config = require('../../config.json');

const sessionStore = new pgSession({
    pool,
    tableName: 'session'
});

export default session({
    store: sessionStore,
    secret: config.session.secret,
    key: config.session.key,
    resave: false,
    cookie: {maxAge: config.session.cookie.maxAge} // 30 days
});
