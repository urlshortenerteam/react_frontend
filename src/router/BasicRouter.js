import React from 'react';

import {HashRouter, Route, Switch} from 'react-router-dom';
import HomeView from "../view/HomeView"
import LoginView from "../view/LoginView";
import CreateView from "../view/CreateView";
import StatisticsView from "../view/StatisticsView";
import ManageView from "../view/ManageView";
import RegisterView from "../view/RegisterView";

const BasicRouter = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={HomeView}/>
            <Route exact path="/login" component={LoginView}/>
            <Route exact path="/create" component={CreateView}/>
            <Route exact path="/statistics" component={StatisticsView}/>
            <Route exact path="/manage" component={ManageView}/>
            <Route exact path="/register" component={RegisterView}/>

        </Switch>
    </HashRouter>
);


export default BasicRouter;
