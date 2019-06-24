import {IConfig} from "../../typings";

export default function getCreateApp({cluster, pg}: IConfig) {
    return '' +
`import {join} from 'path';
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import {preloadAll} from 'react-loadable';
import {createServer} from "http"
import ConnectRoutes from "./routes";
import {Server} from "http"
${pg ? `import sessionOptions from "./lib/sessionStore";
import loadUser from "./middleware/loadUser";` : ''}

const isDev = process.env.NODE_ENV === 'development';
const staticStorage = join(__dirname, '..', '..', 'build');

async function createApp(port: number | string): Promise<Server> {
    let server: Server;
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    if (isDev) {
        app.use(morgan('dev'));
        const webpackDevServerProxy = require('http-proxy-middleware')({
            target: 'http://localhost:3001',
            changeOrigin: true,
            ws: true
        });

        app.use(['**/*.*', '/static', '/sockjs-node'], webpackDevServerProxy);
    } else {
        app.use(compression());
        app.use(express.static(staticStorage));
    }
    
    ${ pg ? 
   `app.use(sessionOptions);
    app.use(loadUser);` : ''
    }

    app.use(ConnectRoutes(express.Router()));

    await preloadAll();

    server = createServer(app);
    server.listen(port, () => {
        console.error(\`Node \${isDev ? 'dev server' : ${cluster ? '`cluster worker ${process.pid}`' : 'server'} }: listening on port \${port}\`);
    });

    return server;
}

export default createApp;

`
}
