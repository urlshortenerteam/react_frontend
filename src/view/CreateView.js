import React, { Component } from "react";
import Navigation from "../components/Navigation";
import { PicRightOutlined, PicCenterOutlined } from "@ant-design/icons";
import {
    Row,
    Col,
    Tooltip,
    Layout,
    Table,
    Input,
    Button,
    message,
    Form,
    Popconfirm,
    Tabs,
    Divider,
} from "antd";
import { getBatchManyToOne, getBatchOneToOne } from "../Services/CreateService";
import "../css/HomeCss.css";
import "../css/CreateCss.css";
import ManyToOneTable from "../components/create/ManyToOneTable";
import OneToOneTable from "../components/create/OneToOneTable";
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { TabPane } = Tabs;

/*
CreateView
@author Shuchang Liu
@date July 7th 2020
@description Create View
*/
export default class CreateView extends Component {
    state = {
        value: "",
        tableVisible_oneToOne: false,
        tableVisible_manyToOne: false,
        showData: [],
    };

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
                        <Col span={3}></Col>
                        <Col span={18}>
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
                        <Col span={3}></Col>
                    </Row>
                    <br /> <br />
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
