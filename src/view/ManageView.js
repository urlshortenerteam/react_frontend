import React, { Component } from "react";
import { Col, Layout, Row, Tabs } from "antd";
import "../css/HomeCss.css";

const { TabPane } = Tabs;
const { Content } = Layout;

class ManageView extends Component {
    render() {
        return (
            <Content style={{ padding: "0 50px" }}>
                <Row>
                    <Col span={20} offset={2}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="我的短链接" key="1" />
                            <TabPane tab="Type Manage" key="2" />
                            <TabPane tab="Order Manage" key="3" />
                        </Tabs>
                    </Col>
                </Row>
            </Content>
        );
    }
}

export default ManageView;
