import {IConfig} from "../../../typings";

export default function getRoutes({pgSession}: IConfig) {
    return '' +
`import {Router} from "express-serve-static-core";
import {renderWithApp} from "./render";
import App from "../../src/pages/.App/App";
import AppRouters from "../../src/pages/.App/App.routers";
${pgSession ? `import {loginRouter} from "./user/login";
import {logoutRouter} from "./user/logout";
import {registerRouter} from "./user/register";` : ''}

export default function (router: Router): Router {
    router.get(['/', '/index.html', ...AppRouters.map((el: { url: string }) => el.url)], renderWithApp(App));

    ${pgSession ? `router.post('/api/login', loginRouter);
    router.post('/api/logout', logoutRouter);
    router.post('/api/register', registerRouter);` : ''}

    return router;
};
`
}
