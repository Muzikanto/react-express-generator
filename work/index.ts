import {IAnswers, IConfig} from './typings';
import {getPackage} from "./files/package";
import getClientIndex from "./files/src/client_index";
import getCreateApp from "./files/server/createApp";
import getWebpackServer from "./files/.config/webpack_server";
import getManifest from "./files/manifest";
import getMainConfig from "./files/config";
import getRoutes from "./files/server/routes";

const inquirer = require('inquirer');
const fs = require('fs');

const SOURCE_DIR = 'source';

// const program = require('commander');

function main() {
    const QUESTIONS = [
        {
            name: 'name',
            type: 'input',
            message: 'Project name:',
            validate: function (input: string) {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'Project name may only include letters, numbers, underscores and hashes.';
            },
            default: 'react-ssr'
        },
        {
            name: 'project',
            type: 'checkbox',
            message: 'Project Configuration: ',
            choices: ['scss|sass', 'jest', 'tslint', 'husky'],
            default: ['scss|sass']
        },
        {
            name: 'server',
            type: 'checkbox',
            message: 'Server Configuration: ',
            choices: ['cluster', 'postgreSql', 'postgreSql-session'],
            default: ['cluster']
        },
        {
            name: 'client',
            type: 'checkbox',
            message: 'Client Configuration: ',
            choices: ['material-ui', 'history'],
            default: ['material-ui']
        },
        {
            name: 'heroku',
            type: 'confirm',
            message: 'Place Project in Heroku',
            default: false
        }
    ];

    inquirer.prompt(QUESTIONS)
        .then(({project, client, server, heroku, name}: IAnswers) => {
            const config: IConfig = {
                name,
                heroku,
                tslint: project.indexOf('tslint') !== -1,
                husky: project.indexOf('husky') !== -1,
                scss: project.indexOf('scss|sass') !== -1,
                jest: project.indexOf('jest') !== -1,
                cluster: server.indexOf('cluster') !== -1,
                materialUi: client.indexOf('material-ui') !== -1,
                history: client.indexOf('history') !== -1,
                pg: server.indexOf('postgreSql') !== -1 || server.indexOf('postgreSql-session') !== -1,
                pgSession: server.indexOf('postgreSql-session') !== -1,
            };
            const OUTPUT_DIR = config.name;

            fs.mkdir(OUTPUT_DIR, () => {});

            writeFile(`${OUTPUT_DIR}/.npmrc`, ['package-lock=false', 'save=false'].join('\n') + '\n');
            writeFile(`${OUTPUT_DIR}/.env`, ['SKIP_PREFLIGHT_CHECK=true', 'PORT=3001', 'BROWSER=none'].join('\n') + '\n');
            writeFile(`${OUTPUT_DIR}/package.json`, JSON.stringify(getPackage(config), null, 2) + '\n');
            writeFile(`${OUTPUT_DIR}/.gitignore`, ['.idea', 'node_modules', 'build', 'dist'].join('\n') + '\n');
            writeFile(`${OUTPUT_DIR}/README.md`, '##Generation React Project');
            copyFile(`${SOURCE_DIR}/tsconfig.json`, `${OUTPUT_DIR}/tsconfig.json`);
            config.pg && writeFile(`${OUTPUT_DIR}/config.json`, JSON.stringify(getMainConfig(config), null, 2) + '\n');
            config.tslint && copyFile(`${SOURCE_DIR}/tslint.json`, `${OUTPUT_DIR}/tslint.json`);
            config.heroku && writeFile(`${OUTPUT_DIR}/Procfile`, 'web: npm run start:production' + '\n');
            config.jest && copyFile(`${SOURCE_DIR}/jest.config.js`, `${OUTPUT_DIR}/jest.config.js`);
            writeFile(`${OUTPUT_DIR}/LICENSE`, 'MIT License\\n\\nCopyright (c) Maxim Schiriy.\\n');

            fs.mkdir(`${OUTPUT_DIR}/.config`, () => {
            });
            copyFile(`${SOURCE_DIR}/.config/webpack.client.js`, `${OUTPUT_DIR}/.config/webpack.client.js`);
            writeFile(`${OUTPUT_DIR}/.config/webpack.server.js`, getWebpackServer(config.scss));

            fs.mkdir(`${OUTPUT_DIR}/public`, () => {
            });
            copyFile(`${SOURCE_DIR}/public/favicon.ico`, `${OUTPUT_DIR}/public/favicon.ico`);
            copyFile(`${SOURCE_DIR}/public/index.html`, `${OUTPUT_DIR}/public/index.html`);
            writeFile(`${OUTPUT_DIR}/public/manifest.json`, JSON.stringify(getManifest(config.name), null, 2) + '\n');

            writeFile(`${OUTPUT_DIR}/index.js`, 'require(\'./dist/server\').default(process);' + '\n');

            fs.mkdir(`${OUTPUT_DIR}/server`, () => {
            });
            copyFolder(`${SOURCE_DIR}/server`, `${OUTPUT_DIR}/server`, [
                `${SOURCE_DIR}/server/index${config.cluster ? '_v2' : ''}.ts`,
                `${SOURCE_DIR}/server/routes/render${config.materialUi ? '_v2' : ''}.tsx`,
                ...(config.pg ? [] : [
                    `${SOURCE_DIR}/server/models`
                ]),
                ...(config.pgSession ? [] : [
                    `${SOURCE_DIR}/server/routes/user`,
                    `${SOURCE_DIR}/server/routes/typings.ts`,
                    `${SOURCE_DIR}/server/middleware`,
                    `${SOURCE_DIR}/server/lib`,
                    `${SOURCE_DIR}/server/models/utils/crypto.ts`,
                    `${SOURCE_DIR}/server/models/user`,
                ]),
            ]);
            writeFile(`${OUTPUT_DIR}/server/createApp.ts`, getCreateApp(config));
            fs.mkdir(`${OUTPUT_DIR}/server/routes`, () => {});
            writeFile(`${OUTPUT_DIR}/server/routes/index.ts`, getRoutes(config));

            fs.mkdir(`${OUTPUT_DIR}/src`, () => {
            });
            copyFolder(`${SOURCE_DIR}/src`, `${OUTPUT_DIR}/src`, [
                config.materialUi ? '' : `${SOURCE_DIR}/src/utils/mui.ts`,
                config.history ? '' : `${SOURCE_DIR}/src/utils/history.ts`,
            ]);
            writeFile(`${OUTPUT_DIR}/src/index.tsx`, getClientIndex(config));
        });

}

function writeFile(path: string, content: string) {
    fs.writeFile(path, content, 'utf8', () => {
    });
}

function copyFile(from: string, to: string) {
    fs.copyFile(from, to, () => {
    });
}

function copyFolder(from: string, to: string, ignore: string[] = []) {
    fs.lstat(from, (err: Error, stats: any) => {
        if (stats.isDirectory() && ignore.indexOf(from) === -1) {
            if (!fs.existsSync(to)) {
                fs.mkdir(to, () => {
                });
            }
            fs.readdir(from, (err: Error, files: string[]) => {
                files.forEach((file: string) => {
                    copyFolder(from + '/' + file, to + '/' + file, ignore);
                });
            })
        } else {
            ignore.indexOf(from) === -1 && copyFile(from, to.replace('_v2', ''))
        }
    });
}

export default main;
