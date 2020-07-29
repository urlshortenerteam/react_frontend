import React, { Component } from "react";
import { Layout, Statistic, Row } from "antd";
import { withRouter } from "react-router-dom";
import "../css/HomeCss.css";
import { hostUrl } from "../services/ajax";
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
    };
    render() {
        return (
            <Content>
                <div className="titleNoMatch">
                    404
                    <div className="countDown">
                    <Countdown
                        value={deadline}
                        onFinish={this.onFinish}
                        format="ss:SSS"
                        suffix="秒后跳转"
                    /></div>
                </div>

                <div className="smallNoMatch">您访问的页面被外星人偷走啦 .</div>
                {/*    <div className="smallNoMatch1">*/}
                {/*    The page you are looking for is stolen by aliens .*/}
                {/*</div>*/}

                <Row justify="center">
                    <div className="picture">
                        <img
                            src={hostUrl + "/static/alien.png"}
                            alt={""}
                            style={{
                                marginTop: "10%",
                                height: "21vw",
                            }}
                            // width="400px"
                            // width: 40vw;
                        />
                    </div>
                </Row>
            </Content>
        );
    }
}

export default withRouter(NoMatchView);
