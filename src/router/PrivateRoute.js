import React from "react";
import { Route } from "react-router-dom";
import { Layout, Skeleton, message } from "antd";
import * as userService from "../services/userService";
import LoginView from "../view/LoginView";

const { Content } = Layout;
export default class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
        };
    }

    checkAuth = () => {
        this.setState({ isAuthed: true, hasAuthed: true });
    };

    errorHandler = () => {
        this.setState({ isAuthed: false, hasAuthed: true });
        if (sessionStorage.getItem("user")) sessionStorage.removeItem("user");
        window.location.href = "/login";
    };
    componentDidMount() {
        if (
            sessionStorage.getItem("user") &&
            JSON.parse(sessionStorage.getItem("user")).id !== null &&
            JSON.parse(sessionStorage.getItem("user")).loginStatus !== null &&
            JSON.parse(sessionStorage.getItem("user")).type !== null &&
            JSON.parse(sessionStorage.getItem("user")).token !== null &&
            JSON.parse(sessionStorage.getItem("user")).refreshToken !== null
        ) {
            userService.checkSession(this.checkAuth, this.errorHandler);
        } else {
            if (sessionStorage.getItem("user"))
                sessionStorage.removeItem("user");
            window.location.href = "/login";
            message.error("您未登录");
        }
    }

    render() {
        // const {exact = false, path, component  } = this.props;
        const Component = this.props.component;
        const path = this.props.path;
        const exact = this.props.exact;

        console.log(this.state.isAuthed);
        if (!this.state.hasAuthed) {
            return (
                <Content style={{ padding: "0 20vw" }}>
                    <div className="private">
                        <br />
                        <Skeleton active paragraph={{ rows: 4 }} />
                        <Skeleton active paragraph={{ rows: 4 }} />
                        <Skeleton active paragraph={{ rows: 4 }} />
                    </div>
                </Content>
            );
        }

        return this.state.isAuthed ? (
            <Route
                path={path}
                exact={exact}
                render={(props) => <Component {...props} />}
            />
        ) : (
            <Route exact path="/login" component={LoginView} />
        );
    }
}
