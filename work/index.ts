import {IAnswers} from './typings';
import {getPackage} from "./files/package";

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
            name: 'config',
            type: 'checkbox',
            message: 'Project Configuration: ',
            choices: ['jest', 'tslint', 'scss|sass', 'husky']
        },
        {
            name: 'heroku',
            type: 'confirm',
            message: 'Place Project in Heroku'
        }
    ];

    inquirer.prompt(QUESTIONS)
        .then((answers: IAnswers) => {
            const config = {
                name: answers.name,
                heroku: answers.heroku,
                tslint: answers.config.indexOf('tslint') !== -1,
                husky: answers.config.indexOf('husky') !== -1,
                scss: answers.config.indexOf('scss|sass') !== -1,
                jest: answers.config.indexOf('jest') !== -1,
            };
            const OUTPUT_DIR = config.name;

            fs.mkdir(OUTPUT_DIR, () => {
            });

            writeFile(`${OUTPUT_DIR}/.npmrc`, ['package-lock=false', 'save=false'].join('\n') + '\n');
            writeFile(`${OUTPUT_DIR}/.env`, ['SKIP_PREFLIGHT_CHECK=true', 'PORT=3001'].join('\n') + '\n');
            writeFile(`${OUTPUT_DIR}/package.json`, JSON.stringify(getPackage(config), null, 2) + '\n');
            writeFile(`${OUTPUT_DIR}/.gitignore`, ['.idea', 'node_modules', 'build', 'dist'].join('\n') + '\n');
            writeFile(`${OUTPUT_DIR}/README.md`, '##Generation React Project');
            copyFile(`${SOURCE_DIR}/tsconfig.json`, `${OUTPUT_DIR}/tsconfig.json`);
            config.tslint && copyFile(`${SOURCE_DIR}/tslint.json`, `${OUTPUT_DIR}/tslint.json`);
            config.heroku && writeFile(`${OUTPUT_DIR}/Procfile`, 'web: npm run start:production' + '\n');
            config.jest && copyFile(`${SOURCE_DIR}/jest.config.js`, `${OUTPUT_DIR}/jest.config.js`);
            writeFile(`${OUTPUT_DIR}/LICENSE`, 'MIT License\\n\\nCopyright (c) Maxim Schiriy.\\n');

            fs.mkdir(`${OUTPUT_DIR}/.config`, () => {});
            copyFile(`${SOURCE_DIR}/.config/webpack.client.js`, `${OUTPUT_DIR}/.config/webpack.client.js`);
            copyWebpackConfig(config.scss, `${SOURCE_DIR}/.config/webpack.server.js`, `${OUTPUT_DIR}/.config/webpack.server.js`);

            fs.mkdir(`${OUTPUT_DIR}/public`, () => {});
            copyFile(`${SOURCE_DIR}/public/favicon.ico`, `${OUTPUT_DIR}/public/favicon.ico`);
            copyFile(`${SOURCE_DIR}/public/index.html`, `${OUTPUT_DIR}/public/index.html`);
            writeFile(`${OUTPUT_DIR}/public/manifest.json`, JSON.stringify(getManifest(config.name), null, 2) + '\n');

            writeFile(`${OUTPUT_DIR}/index.js`, 'require(\'./dist/server\').default(process);' + '\n');

            copyFolder(`${SOURCE_DIR}/server`, `${OUTPUT_DIR}/server`);
            copyFolder(`${SOURCE_DIR}/src`, `${OUTPUT_DIR}/src`, config.scss);
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

function copyFolder(from: string, to: string, scss?: boolean) {
    fs.lstat(from, (err: Error, stats: any) => {
        if (stats.isDirectory()) {
            fs.mkdir(to, () => {
            });
            fs.readdir(from, (err: Error, files: string[]) => {
                files.forEach((file: string) => {
                    copyFolder(from + '/' + file, to + '/' + file);
                });
            })
        } else {
            copyFile(from, to);
        }
    });
}

function getManifest(name: string) {
    return {
        "short_name": "React App",
        name,
        "icons": [
            {
                "src": "favicon.ico",
                "sizes": "64x64 32x32 24x24 16x16",
                "type": "image/x-icon"
            }
        ],
        "display": "standalone",
        "theme_color": "#000000",
        "background_color": "#ffffff"
    }
}

function copyWebpackConfig(neddScss: boolean, from: string, to: string) {
    if (neddScss) {
        copyFile(from, to);
    } else {
        fs.readFile(from, {encoding: 'utf8'}, (err: Error, data: string) => {
            if (err) {
                console.log(err);
            } else {
                const start = data.substring(0, data.indexOf('//SCSS_START')).replace(`const ExtractTextPlugin = require("extract-text-webpack-plugin");`, '');
                writeFile(to, start +
            `{
                 test: /\.css$/,
                 loaders: 'null-loader'
             },` + data.substring(data.indexOf('//SCSS_END') + 10));
            }
        });
    }
}

export default main;
