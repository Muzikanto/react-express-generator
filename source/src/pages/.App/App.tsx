import * as React from 'react';
import {Route, Switch} from "react-router";
import Footer from "./App.components/Footer";
import NavBar from "./App.components/NavBar";
import FrontPage from "../FrontPage/FrontPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import AppRouters from "./App.routers";

class App extends React.Component {
    public render() {
        return (
            <div>
                <NavBar/>
                <main>
                    <Switch>
                        <Route exact={true} path="/" component={FrontPage}/>
                        {AppRouters.map((route, i) => <Route key={i} path={route.url} component={route.el}/>)}
                        <Route component={NotFoundPage}/>
                    </Switch>
                </main>
                <Footer/>
            </div>
        )
    }
}

export default App;
