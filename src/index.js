import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import * as serviceWorker from "./serviceWorker";
import BasicRouter from "./router/BasicRouter";
// console.log(process.env);
// if (process.env.NODE_ENV === "production") {
//     console = console || {};
//     console.log = function () {};
// }
// if (process.env.REACT_APP_LOG_DEBU!=='1') {
//     console = console || {};
//     console.log = function () { };
// }

console.log = (function (oriLogFunc) {
    return function () {
        if (process.env.NODE_ENV === "development") {
            oriLogFunc.apply(this, arguments);
        }
    };
})(console.log);
ReactDOM.render(<BasicRouter />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
