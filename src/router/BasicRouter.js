import React from 'react';

import {HashRouter, Route, Switch} from 'react-router-dom';
import HomeView from "../view/HomeView"
import LoginView from "../view/LoginView";
import CreateView from "../view/CreateView";
import StatisticsView from "../view/StatisticsView";
const BasicRouter = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={HomeView}/>
            <Route exact path="/login" component={LoginView}/>
            <Route exact path="/create" component={CreateView}/>
            <Route exact path="/statistics" component={StatisticsView}/>

        </Switch>
    </HashRouter>
);


export default BasicRouter;
