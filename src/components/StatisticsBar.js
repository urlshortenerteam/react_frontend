import * as React from "react";
import {Menu,Button} from 'antd'
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    LineChartOutlined,
    HeatMapOutlined,
    MailOutlined
} from '@ant-design/icons';


const {SubMenu}=Menu;
/*
StatisticsBar
@author Zhuohao Shen
@date July 6th 2020
@description Navigation bar for statistic page
*/
export default class StatisticsBar extends React.Component{
    state={
        collapsed:false,
    };
    toggleCollapsed=()=>{
        this.setState(
            {collapsed:!this.state.collapsed}
        )
    }
    render(){
        return (
            <div style={{ "max-width": 256 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        概览
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LineChartOutlined />}>
                        时段
                    </Menu.Item>
                    <Menu.Item key="3" icon={<HeatMapOutlined />}>
                        地区
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="来源">
                        <Menu.Item key="5">合作商</Menu.Item>
                        <Menu.Item key="6">广告伙伴</Menu.Item>
                        <Menu.Item key="7">供应链</Menu.Item>
                        <Menu.Item key="8">问卷</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="佣金">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}