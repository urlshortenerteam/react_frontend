import React from "react";

import { HashRouter, Route, Switch } from "react-router-dom";
import HomeView from "../view/HomeView";
import LoginView from "../view/LoginView";
import CreateView from "../view/CreateView";
import StatisticsView from "../view/StatisticsView";
import ManageView from "../view/ManageView";
import RegisterView from "../view/RegisterView";
import { Col, Layout, Row } from "antd";
import Navigation from "../components/Navigation";
import AdminManageView from "../view/AdminManageView";
import PrivateRoute from "./PrivateRoute";
const { Header, Footer } = Layout;

const BasicRouter = () => (
    <HashRouter>
        <Layout style={{ backgroundColor: "#001529", minHeight: "100%" }}>
            <Header>
                <Row>
                    <Col span={20} offset={2}>
                        <Navigation />
                    </Col>
                </Row>
            </Header>
            <Switch>
                <Route exact path="/" component={HomeView} />
                <Route exact path="/login" component={LoginView} />
                <PrivateRoute exact path="/create" component={CreateView} />
                <Route exact path="/statistics" component={StatisticsView} />
                <Route exact path="/manage" component={ManageView} />
                <Route exact path="/register" component={RegisterView} />
                <Route exact path="/adminManage" component={AdminManageView} />
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
    </HashRouter>
);

export default BasicRouter;
