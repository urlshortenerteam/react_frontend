import React, { Component } from "react";
import Navigation from "../components/Navigation";
import { Col, Layout, Row, Tabs } from "antd";
import "../css/HomeCss.css";

const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

class ManageView extends Component {
    render() {
        return (
            <Layout style={{ backgroundColor: "#001529" }}>
                <Header>
                    <Row>
                        <Col span={20} offset={2}>
                            <Navigation />
                        </Col>
                    </Row>
                </Header>
                <Content style={{ padding: "0 50px" }}>
                    <Row>
                        <Col span={20} offset={2}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="我的短链接" key="1"></TabPane>
                                <TabPane tab="Type Manage" key="2"></TabPane>
                                <TabPane tab="Order Manage" key="3"></TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Content>
                <br /> <br /> <br /> <br /> <br /> <br />
                <br />
                <Footer
                    style={{
                        textAlign: "center",
                        backgroundColor: "#001529",
                        color: "#d8e3e7",
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        );
    }
}

export default ManageView;
