import React, { Component } from "react";
import { PicCenterOutlined, PicRightOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Tabs } from "antd";
import "../css/HomeCss.css";
import "../css/CreateCss.css";
import ManyToOneTable from "../components/create/ManyToOneTable";
import OneToOneTable from "../components/create/OneToOneTable";
import { withRouter } from "react-router-dom";
const { Content } = Layout;
const { TabPane } = Tabs;

/**
CreateView
@author Shuchang Liu
@date July 7th 2020
@description Create View
*/
class CreateView extends Component {
    state = {
        value: "",
        tableVisible_oneToOne: false,
        tableVisible_manyToOne: false,
        showData: [],
    };

    render() {
        return (
            <Content style={{ padding: "0 5vw" }}>
                <Row>
                    <Col flex="auto">
                        <Tabs defaultActiveKey="1" centered>
                            <TabPane
                                key="1"
                                tab={
                                    <span>
                                        <PicRightOutlined />
                                        多对一
                                    </span>
                                }
                            >
                                <br />
                                <ManyToOneTable />
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        <PicCenterOutlined />
                                        一对一
                                    </span>
                                }
                                key="2"
                            >
                                <br />
                                <OneToOneTable />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <br /> <br />
            </Content>
        );
    }
}
export default withRouter(CreateView);
