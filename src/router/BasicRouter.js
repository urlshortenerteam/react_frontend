import React from 'react';

import {HashRouter, Route, Switch} from 'react-router-dom';
import HomeView from "../view/HomeView"
import LoginView from "../view/LoginView";
import CreateView from "../view/CreateView";
const BasicRouter = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={HomeView}/>
            <Route exact path="/login" component={LoginView}/>
            <Route exact path="/create" component={CreateView}/>

        </Switch>
    </HashRouter>
);


export default BasicRouter;
