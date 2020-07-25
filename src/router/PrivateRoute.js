import React from "react";
import { Route } from "react-router-dom";
import * as userService from "../services/userService";

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
        // console.log(error);
        this.setState({ isAuthed: false, hasAuthed: true });
        if (sessionStorage.getItem("user")) sessionStorage.removeItem("user");
        window.location.href = "/login";
    };
    componentDidMount() {
        if (sessionStorage.getItem("user")) {
            console.log(JSON.parse(sessionStorage.getItem("user")));
        }
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

        return this.state.isAuthed ? (
            <Route
                path={path}
                exact={exact}
                render={(props) => <Component {...props} />}
            />
        ) : (
            // <Route
            //     path={path}
            //     exact={exact}
            //     render={(props) => <Component {...props} />}
            // />
            <Route exact path="/login" component={LoginView} />
            // <Redirect
            //     push
            //     // to={{
            //     //     pathname: "/login",
            //     //     state: { from: props.location },
            //     // }}
            //     to="/login"
            // />
        );
    }
}
