import React, { Component } from "react";
import { Col, Layout, Row, Tabs } from "antd";
import "../css/HomeCss.css";
import UrlManagePanel from "../components/url-manage/UrlManagePanel";
import CategoryManage from "../components/url-manage/CategoryManage";

import { ScheduleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Content } = Layout;

class ManageView extends Component {
    render() {
        return (
            <Content style={{ padding: "0 5vw" }}>
                <Row align="center">
                    <Col flex="auto">
                        <Tabs defaultActiveKey="1" centered>
                            <TabPane
                                key="1"
                                tab={
                                    <span>
                                        <ScheduleOutlined />
                                        我的短链接
                                    </span>
                                }
                            >
                                <UrlManagePanel />
                            </TabPane>
                            <TabPane
                                key="2"
                                tab={
                                    <span>
                                        <ScheduleOutlined />
                                        分类管理
                                    </span>
                                }
                            >
                                <CategoryManage />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Content>
        );
    }
}

export default ManageView;
