import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import HomeView from "./view/HomeView";
import * as serviceWorker from "./serviceWorker";

import BasicRouter from "./router/BasicRouter";
// ReactDOM.render(
//   <React.StrictMode>
//     {/*<App />*/}
//     <HomeView/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(<BasicRouter />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
