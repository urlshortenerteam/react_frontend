import React, { Component } from "react";
import { Layout } from "antd";
import { withRouter } from "react-router-dom";
import "../css/HomeCss.css";
import { hostUrl } from "../services/ajax";
// import pic2 from "./error2.png";

const { Content } = Layout;

/**
 NoMatchView
 @author Shuchang Liu
 @date July 28th 2020
 @description NoMatch View
 */
class NoMatchView extends Component {
    render() {
        return (
            <Content>
                {/*<div className={`centerDesc magictime puffIn`}>*/}

                <div className="titleNoMatch">404</div>
                <div className="smallNoMatch">
                    The page you are looking for is stolen by aliens .
                </div>
                {/*</div>*/}

                <div className="picture">
                    {/*<img*/}
                    {/*    src={pic2}*/}
                    {/*    alt={""}*/}
                    {/*    style={{*/}
                    {/*        marginTop: "60px"*/}
                    {/*    }}*/}
                    {/*    width="400px"*/}
                    {/*/>*/}

                    <img
                        src={hostUrl + "/static/alien.png"}
                        alt={""}
                        style={{
                            marginTop: "60px",
                        }}
                        width="400px"
                    />
                </div>
            </Content>
        );
    }
}

export default withRouter(NoMatchView);
