import React, { Component } from "react";
import { Col, Layout, Row, Tabs } from "antd";
import "../css/HomeCss.css";
import {
    ScheduleOutlined,
    TeamOutlined,
    TableOutlined,
} from "@ant-design/icons";
import UserManage from "../components/adminManage/UserManage";

const { TabPane } = Tabs;
const { Content } = Layout;

/*
AdminManageView
@author Shuchang Liu
@date July 15th 2020
@description AdminManage View
*/
class AdminManageView extends Component {
    render() {
        return (
            <Content style={{ padding: "0 50px" }}>
                <Row>
                    <Col span={18} offset={3}>
                        <Tabs defaultActiveKey="1" centered>
                            <TabPane
                                key="1"
                                tab={
                                    <span>
                                        <ScheduleOutlined />
                                        短链接管理
                                    </span>
                                }
                            />
                            <TabPane
                                key="2"
                                tab={
                                    <span>
                                        <TeamOutlined />
                                        用户管理
                                    </span>
                                }
                            >
                                <UserManage />
                            </TabPane>
                            <TabPane
                                key="3"
                                tab={
                                    <span>
                                        <TableOutlined />
                                        统计
                                    </span>
                                }
                            />
                        </Tabs>
                    </Col>
                </Row>
            </Content>
        );
    }
}

export default AdminManageView;
