import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout, Skeleton } from "antd";
import Navigation from "../components/Navigation";
import PrivateRoute from "./PrivateRoute";
import NoMatchView from "../view/NoMatchView";
import HomeView from "../view/HomeView";
import "../css/AdminStatisticsCss.css";
import "../css/NavigationCss.css";
import "../css/HomeCss.css";
import "../css/RegisterCss.css";
import "../css/CreateCss.css";
import "../css/Carousel.css";
import "../css/LoginCss.css";
import "../css/Statistics.css";
import "../css/ManageCss.css";
import "../css/NoMatchCss.css";

const AdminManageView = lazy(() => import("../view/AdminManageView.js"));
const LoginView = lazy(() => import("../view/LoginView.js"));
const CreateView = lazy(() => import("../view/CreateView.js"));
const StatisticsView = lazy(() => import("../view/StatisticsView.js"));
const ManageView = lazy(() => import("../view/ManageView.js"));
const RegisterView = lazy(() => import("../view/RegisterView.js"));
const { Header, Footer } = Layout;
const BasicRouter = () => (
    <BrowserRouter>
        <Layout style={{ backgroundColor: "#001529", minHeight: "100vh" }}>
            <Header>
                <Navigation />
            </Header>
            <Suspense
                fallback={
                    <div className="private" style={{ padding: "0 20vw" }}>
                        <br />
                        <Skeleton active paragraph={{ rows: 4 }} />
                        <Skeleton active paragraph={{ rows: 4 }} />
                        <Skeleton active paragraph={{ rows: 4 }} />
                    </div>
                }
            >
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
            </Suspense>
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
