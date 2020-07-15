import React, { Component } from "react";
import { Col, Layout, Row, Tabs } from "antd";
import "../css/HomeCss.css";
import UrlManagePanel from "../components/url-manage/UrlManagePanel";
import CategoryManage from "../components/url-manage/CategoryManage";

const { TabPane } = Tabs;
const { Content } = Layout;

class ManageView extends Component {
    render() {
        return (
            <Content style={{ padding: "0 50px" }}>
                <Row>
                    <Col span={20} offset={2}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="我的短链接" key="1">
                                <UrlManagePanel />
                            </TabPane>
                            <TabPane tab="分类管理" key="2">
                                <CategoryManage />
                            </TabPane>
                            <TabPane tab="我的订单" key="3" />
                        </Tabs>
                    </Col>
                </Row>
            </Content>
        );
    }
}

export default ManageView;
