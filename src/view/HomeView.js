import React, { Component } from "react";
import { Button, Layout } from "antd";
import "../css/HomeCss.css";
import { hostUrl } from "../Services/ajax";
import { RightOutlined } from "@ant-design/icons";

const { Content } = Layout;

/*
HomeView
@author Shuchang Liu
@date July 6th 2020
@description Home View
*/
class HomeView extends Component {
    render() {
        return (
            <Content style={{ display: "flex", height: "100%" }}>
                <h1 className="centerDesc">
                    短链接
                    <br />
                    从未如此
                    <br />
                    简单易用
                    <br style={{ padding: 0 }} />
                    <Button icon={<RightOutlined />} href="#/create" ghost>
                        开始探索
                    </Button>
                </h1>
                <img
                    className="leftDesc"
                    src={hostUrl + "/flow.png"}
                    alt={""}
                />
                <img
                    className="rightBottomDesc"
                    src={hostUrl + "/people.png"}
                    alt={""}
                />
                <img
                    className="rightTopDesc"
                    src={hostUrl + "/trans.png"}
                    alt={""}
                />
            </Content>
        );
    }
}

export default HomeView;
