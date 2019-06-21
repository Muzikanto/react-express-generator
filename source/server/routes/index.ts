import {Router} from "express-serve-static-core";
import {renderWithApp} from "./render";
import App from "../../src/pages/.App/App";
import AppRouters from "../../src/pages/.App/App.routers";

export default function (router: Router): Router {
    router.get(['/', '/index.html', ...AppRouters.map((el: { url: string }) => el.url)], renderWithApp(App));

    return router;
};
