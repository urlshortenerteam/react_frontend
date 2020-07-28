import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "../view/HomeView";
import LoginView from "../view/LoginView";
import CreateView from "../view/CreateView";
import StatisticsView from "../view/StatisticsView";
import ManageView from "../view/ManageView";
import RegisterView from "../view/RegisterView";
import { Layout } from "antd";
import Navigation from "../components/Navigation";
import AdminManageView from "../view/AdminManageView";
import PrivateRoute from "./PrivateRoute";
import NoMatchView from "../view/NoMatchView";

const { Header, Footer } = Layout;
const BasicRouter = () => (
    <BrowserRouter>
        <Layout style={{ backgroundColor: "#001529", minHeight: "100vh" }}>
            <Header>
                <Navigation />
            </Header>
            <Switch>
                <Route exact path="/" component={HomeView} />
                <Route exact path="/login" component={LoginView} />
                <PrivateRoute exact path="/create" component={CreateView} />
                <PrivateRoute
                    exact
                    path="/statistics"
                    component={StatisticsView}
                />
                <PrivateRoute exact path="/manage" component={ManageView} />
                <Route exact path="/register" component={RegisterView} />
                <PrivateRoute
                    exact
                    path="/adminManage"
                    component={AdminManageView}
                />

                <Route path="/404" component={NoMatchView} />
                <Route component={NoMatchView} />
            </Switch>

            <Footer
                style={{
                    textAlign: "center",
                    backgroundColor: "#001529",
                    color: "#d8e3e7",
                }}
            >
                Reevoo ShortLink ©2020 Created by Reevoo Team
            </Footer>
        </Layout>
    </BrowserRouter>
);

export default BasicRouter;
