import React, { Component } from "react";
import { Layout, Statistic } from "antd";
import { withRouter } from "react-router-dom";
import "../css/HomeCss.css";
import { hostUrl } from "../services/ajax";
// import pic2 from "./error2.png";
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 15; // Moment is also OK

const { Content } = Layout;

/**
 NoMatchView
 @author Shuchang Liu
 @date July 28th 2020
 @description NoMatch View
 */
class NoMatchView extends Component {
    onFinish = () => {
        this.props.history.go(-1);
        // window.location.href = document.referrer;
    };
    render() {
        return (
            <Content>
                {/*<div className={`centerDesc magictime puffIn`}>*/}

                <div className="titleNoMatch">
                    404
                    <Countdown
                        value={deadline}
                        onFinish={this.onFinish}
                        format="ss:SSS"
                        suffix="秒后跳转"
                    />
                </div>

                <div className="smallNoMatch">您访问的页面被外星人偷走啦 .</div>
                {/*    <div className="smallNoMatch1">*/}
                {/*    The page you are looking for is stolen by aliens .*/}
                {/*</div>*/}
                {/*</div>*/}

                <div className="picture">
                    {/*<img*/}
                    {/*    src={pic2}*/}
                    {/*    alt={""}*/}
                    {/*    style={{*/}
                    {/*        marginTop: "45px",*/}
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
