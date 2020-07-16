import React from "react";
import { Redirect, Route } from "react-router-dom";
import * as userService from "../Services/userService";
import { message } from "antd";

export default class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
        };
    }

    checkAuth = (res) => {
        console.log(res.status);
        if (res.status === 200) {
            this.setState({ isAuthed: true, hasAuthed: true });
        } else {
            message.error("您需登录");
            if (sessionStorage.getItem("userId"))
                sessionStorage.removeItem("userId");
            if (sessionStorage.getItem("loginStatus"))
                sessionStorage.removeItem("loginStatus");
            if (sessionStorage.getItem("type"))
                sessionStorage.removeItem("type");
            if (sessionStorage.getItem("token"))
                sessionStorage.removeItem("token");

            this.setState({ isAuthed: false, hasAuthed: true });
        }
    };

    errorHandler = (error) => {
        message.error(error);
    };
    componentDidMount() {
        userService.checkSession(this.checkAuth, this.errorHandler);
    }

    render() {
        // const {exact = false, path, component  } = this.props;
        const Component = this.props.component;
        const path = this.props.path;
        const exact = this.props.exact;

        console.log(this.state.isAuthed);

        if (!this.state.hasAuthed) {
            return null;
        }

        return (
            <Route
                path={path}
                exact={exact}
                render={(props) =>
                    this.state.isAuthed ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        );
    }
}
