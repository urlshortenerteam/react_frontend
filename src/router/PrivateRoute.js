import React from "react";
import {  Redirect , Route } from "react-router-dom";
import * as userService from "../services/userService";
import { message } from "antd";

export default class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
        };
    }

    checkAuth = (data) => {
        console.log(data);
        if (data.status) {
            this.setState({ isAuthed: true, hasAuthed: true });
        } else {
            message.error(data.msg);
            localStorage.removeItem("userId");
            this.setState({ isAuthed: false, hasAuthed: true });
        }
    };

    componentDidMount() {
        userService.checkSession(this.checkAuth);
    }

    render() {
        const {
            component: Component,
            path: path,
            exact = false,
            strict = false,
        } = this.props;
        // const Component=this.props.component;
        // const path=this.props.path;
        // const exact=this.props.exact;

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
