import React from "react";
import { Button, Menu, PageHeader, Row, Col } from "antd";
import {
    AlignCenterOutlined,
    AppstoreOutlined,
    AreaChartOutlined,
    BankOutlined,
    PicLeftOutlined,
} from "@ant-design/icons";
import "../css/NavigationCss.css";
import { logout } from "../Services/userService";
import { Link } from "react-router-dom";

/*
Navigation:
@author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
@date July 7th 2020
*/
export default class Navigation extends React.Component {
    state = {
        current: "home",
    };

    handleClick = (e) => {
        this.setState({ current: e.key });
    };

    render() {
        const { current } = this.state;
        return (
            <div>
                <PageHeader
                    ghost
                    className="site-page-header"
                    title="Reevoo"
                    avatar={{
                        src:
                            "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
                    }}
                    subTitle={[
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[current]}
                            mode="horizontal"
                            theme="dark"
                            key="menu"
                        >
                            <Menu.Item key="home" icon={<BankOutlined />}>
                                <Link to="/">首页</Link>
                            </Menu.Item>

                            <Menu.Item
                                key="statistics"
                                icon={<AreaChartOutlined />}
                            >
                                <Link to="/statistics">统计图表</Link>
                            </Menu.Item>
                            <Menu.Item key="create" icon={<PicLeftOutlined />}>
                                <Link to="/create">批量生成</Link>
                            </Menu.Item>
                            <Menu.Item
                                key="manage"
                                icon={<AlignCenterOutlined />}
                            >
                                <Link to="/manage">管理链接</Link>
                            </Menu.Item>
                            <Menu.Item key="other" icon={<AppstoreOutlined />}>
                                <Link
                                    to="https://xiaomark.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    其他
                                </Link>
                            </Menu.Item>
                        </Menu>,
                    ]}
                    extra={[
                        <Row key="login">
                            <Col>
                                {JSON.parse(
                                    sessionStorage.getItem("loginStatus")
                                ) === 1 ? (
                                    <Button key="2" ghost onClick={logout}>
                                        登出
                                    </Button>
                                ) : (
                                    <Button key="3" ghost href="#/login">
                                        登录
                                    </Button>
                                )}
                            </Col>
                            <Col>
                                <Button
                                    ghost
                                    key="1"
                                    href="#/register"
                                    style={{ marginLeft: 7 }}
                                >
                                    注册
                                </Button>
                            </Col>
                        </Row>,

                        // <Button key="2" ghost href="#/login">
                        //     登录
                        // </Button>,
                    ]}
                />
                ,
            </div>
        );
    }
}
