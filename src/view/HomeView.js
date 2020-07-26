import React, { Component } from "react";
import { Button, Layout } from "antd";
import "../css/HomeCss.css";
import { hostUrl } from "../services/ajax";
import { RightOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
const { Content } = Layout;

/**
HomeView
@author Shuchang Liu & Zhuohao Shen
@date July 6th 2020
@description Home View
*/
class HomeView extends Component {
    constructor() {
        super();
        setTimeout(() => {
            this.setState({
                showLeft: true,
            });
        }, 300);
        setTimeout(() => {
            this.setState({
                showRight: true,
            });
        }, 600);
        setTimeout(() => {
            this.setState({
                showBottom: true,
            });
        }, 900);
        setTimeout(() => {
            this.setState({
                showDesc: true,
            });
        }, 1000);
        setTimeout(() => {
            this.setState({
                showExplorer: true,
            });
        }, 1600);

        this.state = {
            showExplorer: false,
            showDesc: false,
            showLeft: false,
            showBottom: false,
            showRight: false,
        };
    }

    render() {
        return (
            <Content style={{ display: "flex" }}>
                {this.state.showDesc ? (
                    <h1 className={`centerDesc magictime puffIn`}>
                        短链接
                        <br />
                        从未如此
                        <br />
                        简单易用
                        <br style={{ padding: 0 }} />
                        {this.state.showExplorer ? (
                            <Button
                                icon={<RightOutlined />}
                                href="/create"
                                className="magictime vanishIn"
                                ghost
                            >
                                开始探索
                            </Button>
                        ) : (
                            <Button href="/create" ghost />
                        )}
                    </h1>
                ) : null}
                {this.state.showLeft ? (
                    <img
                        className="leftDesc magictime puffIn"
                        src={hostUrl + "/static/flow.png"}
                        alt={""}
                    />
                ) : null}
                {this.state.showBottom ? (
                    <img
                        className="rightBottomDesc magictime puffIn"
                        src={hostUrl + "/static/people.png"}
                        alt={""}
                    />
                ) : null}
                {this.state.showRight ? (
                    <img
                        className="rightTopDesc magictime puffIn"
                        src={hostUrl + "/static/trans.png"}
                        alt={""}
                    />
                ) : null}
            </Content>
        );
    }
}

export default withRouter(HomeView);
