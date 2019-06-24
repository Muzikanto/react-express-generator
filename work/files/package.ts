import {IConfig} from "../typings";

export function getPackage({name, heroku, husky, jest, scss, materialUi, cluster, tslint, pg, pgSession}: IConfig) {
    const keywords = [
        "node",
        ...(heroku ? ['heroku'] : []),
        "create-react-app",
        "react",
        "express",
        "typescript",
        "redux",
        ...(scss ? ['scss'] : []),
    ];

    return {
        name,
        version: '1.0.0',
        description: '',
        engines: {
            node: '8.x.x'
        },
        scripts: {
            "start": "./node_modules/.bin/cross-env NODE_ENV=development webpack --config .config/webpack.server.js --watch",
            "start:production": `./node_modules/.bin/cross-env NODE_ENV=production node ${heroku ? '--optimize_for_size --max_old_space_size=460 ' : ''}index.js`,
            "build": "npm run build:clean && npm run build:server && npm run build:client",
            "build:clean": "rm -r --force dist",
            "build:server": "./node_modules/.bin/cross-env NODE_ENV=production webpack --config .config/webpack.server.js",
            "build:client": "react-app-rewired build --config-overrides ./.config/webpack.client.js",
            "test": jest ? "jest" : "echo \"Error: no test specified\" && exit 1"
        },
        ...(husky ? {
            hooks: {
                "pre-commit": "npm test",
                "pre-push": "npm test",
                "...": "..."
            }
        } : {}),
        keywords,
        license: 'MIT',
        dependencies: {
            ...(materialUi ? {
                "@material-ui/core": "^4.0.0",
                "@material-ui/icons": "^3.0.2",
            } : {}),
            "body-parser": "1.18.3",
            ...(cluster ? {
                "cluster": "^0.7.7",
            } : {}),
            ...(pg ? {
                "pg": "^7.6.1",
            }: {}),
            ...(pgSession ? {
                "connect-pg-simple": "^5.0.0",
                "express-session": "^1.15.6",
                "crypto": "^1.0.1",
            }: {}),
            "compression": "1.7.3",
            "cookie-parser": "1.4.3",
            "express": "4.16.3",
            "morgan": "1.9.1",
            "os": "^0.1.1",
            "react": "^16.6.1",
            "react-dom": "^16.6.1",
            "react-redux": "^5.1.1",
            "react-router": "4.3.1",
            "react-router-dom": "4.3.1",
            "react-scripts-ts": "3.1.0",
            "react-loadable": "5.5.0",
            "redux": "^4.0.1",
            "redux-thunk": "^2.3.0",
            "got": "9.3.2"
        },
        devDependencies: {
            "@babel/core": "^7.4.4",
            "@types/body-parser": "1.17.0",
            "@types/compression": "0.0.36",
            "@types/cookie-parser": "1.4.1",
            "@types/express": "4.16.0",
            "@types/got": "8.3.5",
            "@types/http-proxy-middleware": "0.19.0",
            "@types/morgan": "1.7.35",
            "@types/node": "10.12.10",
            "@types/react": "16.7.7",
            "@types/react-dom": "16.0.10",
            "@types/react-loadable": "5.4.1",
            "@types/react-redux": "^6.0.9",
            "@types/react-router": "4.4.0",
            "@types/react-router-dom": "4.3.1",
            "@types/webpack-env": "1.13.6",
            ...(pg ? {
                "@types/pg": "^7.4.11",
            }: {}),
            ...(pgSession ? {
                "@types/connect-pg-simple": "^4.2.0",
                "@types/express-session": "^1.15.11",
            }: {}),
            "babel-loader": "^8.0.5",
            ...(scss ? {
                "node-sass": "^4.12.0",
                "postcss-loader": "^3.0.0",
                "sass-loader": "^7.1.0",
                "extract-text-webpack-plugin": "4.0.0-beta.0",
            } : {
                "null-loader": "^0.1.1",
            }),
            ...(jest ? {
                "@types/jest": "23.3.9",
                "ts-jest": "23.10.5",
                "jest-cli": "23.6.0",
            } : {}),
            "chai": "^4.2.0",
            "cpx": "1.5.0",
            "cross-env": "^5.2.0",
            "file-loader": "^3.0.1",
            "hot-module-replacement": "^3.0.1",
            "http-proxy-middleware": "0.19.0",
            "isomorphic-style-loader": "4.0.0",
            "node-hot-loader": "^1.12.1",
            "react-app-rewire-clean-typescript": "1.1.0",
            "react-app-rewire-webpack-bundle-analyzer": "1.0.1",
            "react-app-rewired": "1.6.2",
            "react-scripts": "2.0.5",
            "redux-mock-store": "^1.5.3",
            "start-server-webpack-plugin": "2.2.5",
            "svg-inline-loader": "^0.8.0",
            "ts-loader": "5.2.1",
            "ts-node-dev": "1.0.0-pre.30",
            "tslib": "^1.9.3",
            ...(tslint ? {
                "tslint": "^5.17.0",
            } : {}),
            "tslint-webpack-plugin": "^2.0.2",
            "typescript": "^3.4.5",
            "webpack-cli": "3.1.2",
            "webpack-node-externals": "1.7.2",
            "webpack": "^4.31.0"
        },
        browserslist: [
            ">0.2%",
            "not dead",
            "not ie <= 11",
            "not op_mini all"
        ]
    }
}
