import * as React from "react";
import {  Button , Menu} from "antd";
import {
    AppstoreOutlined,
    HeatMapOutlined,
    LineChartOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined
} from '@ant-design/icons';


const { SubMenu } = Menu;
/*
StatisticsBar
@author Zhuohao Shen
@date July 8th 2020
@params toggleSwitch - function({key}) handle switch function
@description Navigation bar for statistic page
*/
export default class StatisticsBar extends React.Component {
    state = {
        collapsed: false,
    };
    toggleCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };
    toggleSwitch = ({ key }) => {
        this.props.toggleSwitch({ key: key });
    };
    render() {
        return (
            <div style={{ maxWidth: 256, margin: "auto" }}>
                <Button
                    type="primary"
                    onClick={this.toggleCollapsed}
                    style={{ marginBottom: 16 }}
                >
                    {React.createElement(
                        this.state.collapsed
                            ? MenuUnfoldOutlined
                            : MenuFoldOutlined
                    )}
                </Button>
                <Menu
                    onClick={this.toggleSwitch}
                    defaultSelectedKeys={["overview"]}
                    defaultOpenKeys={["source"]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="overview" icon={<PieChartOutlined />}>
                        概览
                    </Menu.Item>
                    <Menu.Item key="time" icon={<LineChartOutlined />}>
                        时段
                    </Menu.Item>
                    <Menu.Item key="area" icon={<HeatMapOutlined />}>
                        地区
                    </Menu.Item>
                    <SubMenu key="source" icon={<MailOutlined />} title="来源">
                        <Menu.Item key="5">合作商</Menu.Item>
                        <Menu.Item key="6">广告伙伴</Menu.Item>
                        <Menu.Item key="7">供应链</Menu.Item>
                        <Menu.Item key="8">问卷</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="commission"
                        icon={<AppstoreOutlined />}
                        title="佣金"
                    >
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}
