import React, { Component } from "react";
import { Col, Layout, Row, Tabs } from "antd";

import {
    ScheduleOutlined,
    TableOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import UserManage from "../components/adminManage/UserManage";
import SimpleStatistics from "../components/adminManage/AdminStatistics";
import { withRouter } from "react-router-dom";
import AdminUrlManagePageable from "../components/adminManage/AdminUrlManagePageable";
const { TabPane } = Tabs;
const { Content } = Layout;

/**
AdminManageView
@author Shuchang Liu
@date July 15th 2020
@description AdminManage View
*/
class AdminManageView extends Component {
    componentDidMount() {
        if (sessionStorage.getItem("user") === null) {
            window.location.href = "/login";
        } else if (
            sessionStorage.getItem("user") &&
            JSON.parse(sessionStorage.getItem("user")).type !== 0
        ) {
            // this.props.history.push("/404");
            window.location.href = "/404";
        }
    }
    render() {
        return (
            <Content style={{ padding: "0 10vw" }}>
                <Row className="manage">
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
                                <AdminUrlManagePageable />
                                {/*<AdminUrlManage />*/}
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
