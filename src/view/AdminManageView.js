import React, { Component } from "react";
import { Col, Layout, Row, Tabs } from "antd";
import "../css/HomeCss.css";
import {
    ScheduleOutlined,
    TableOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import UserManage from "../components/adminManage/UserManage";
import SimpleStatistics from "../components/adminManage/AdminStatistics";
import AdminUrlManage from "../components/adminManage/AdminUrlManage";
import { withRouter } from "react-router-dom";
const { TabPane } = Tabs;
const { Content } = Layout;

/**
AdminManageView
@author Shuchang Liu
@date July 15th 2020
@description AdminManage View
*/
class AdminManageView extends Component {
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
                                        <ScheduleOutlined />
                                        短链接管理
                                    </span>
                                }
                            >
                                <AdminUrlManage />
                            </TabPane>
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
                            >
                                <SimpleStatistics />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Content>
        );
    }
}

export default withRouter(AdminManageView);
