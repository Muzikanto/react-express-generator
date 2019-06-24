import {Server} from "http"
import Process = NodeJS.Process;
import createApp from "./createApp";

const isDev = process.env.NODE_ENV === 'development';

let server: Server;
isDev && createServer(process);

function createServer(process: Process) {
    const port = process.env.PORT || 3000;

    if (isDev) {
        run(port);

        // @ts-ignore
        module.hot && module.hot.accept('../src/pages/.App/App', () => {
            run(port);
        });

        process.argv.push('--config-overrides', './.config/webpack.client.js');
        require('react-app-rewired/scripts/start');
    } else {
        run(port);
    }
}

function run(port: string | number) {
    server && server.close();
    createApp(port).then((server1: Server) => {
        server = server1
    })
}

export default createServer;
