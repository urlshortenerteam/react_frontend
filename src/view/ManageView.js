import React, { Component } from "react";
import { Col, Layout, Row, Tabs } from "antd";
import CategoryManage from "../components/url-manage/CategoryManage";
import { withRouter } from "react-router-dom";
import { ScheduleOutlined } from "@ant-design/icons";
import UrlManagePanelPageable from "../components/url-manage/UrlManagePanelPageable";

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
                                <UrlManagePanelPageable />
                                {/*<UrlManagePanel />*/}
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

export default withRouter(ManageView);
