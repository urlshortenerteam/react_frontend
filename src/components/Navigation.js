import React from "react";
import { Button, Tag, Col, Menu, PageHeader, Row, Dropdown } from "antd";
import {
    AlignCenterOutlined,
    AppstoreOutlined,
    AreaChartOutlined,
    BankOutlined,
    PicLeftOutlined,
    UserOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

import { logout } from "../services/userService";
import { Link } from "react-router-dom";
// import pic from "./logo.png";
import { hostUrl } from "../services/ajax";
import ViewportProvider, { useViewport } from "../services/viewContext";
const menu = (
    <Menu>
        <Menu.Item>
            <a key="logout" onClick={logout} href="/">
                <Row>
                    <Col>
                        <ReloadOutlined style={{ color: "white" }} />
                    </Col>
                    <Col
                        flex="auto"
                        style={{ textAlign: "center", color: "white" }}
                    >
                        登出
                    </Col>
                </Row>
            </a>
        </Menu.Item>
    </Menu>
);
const MyComponent = () => {
    const { width } = useViewport();
    const breakpoint = 620;

    return width < breakpoint ? (
        <div>
            {sessionStorage.getItem("user") &&
            JSON.parse(sessionStorage.getItem("user")).loginStatus &&
            JSON.parse(sessionStorage.getItem("user")).userName ? (
                <Button key="1" ghost href="/login">
                    登出
                </Button>
            ) : (
                <Button key="1" ghost href="/login">
                    登录
                </Button>
            )}
        </div>
    ) : (
        <div>
            {sessionStorage.getItem("user") &&
            JSON.parse(sessionStorage.getItem("user")).loginStatus &&
            JSON.parse(sessionStorage.getItem("user")).userName ? (
                <Dropdown overlay={menu} placement="bottomCenter" arrow>
                    <Tag icon={<UserOutlined />} color="#7f6cf5">
                        {JSON.parse(sessionStorage.getItem("user")).userName}
                    </Tag>
                </Dropdown>
            ) : (
                <Button key="1" ghost href="/login">
                    登录
                </Button>
            )}
        </div>
    );
};

/**
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
            <div className="myHead">
                <PageHeader
                    ghost
                    className="site-page-header"
                    title="eevoo"
                    avatar={{
                        src: hostUrl + "/static/logo.png",
                        shape: "square",
                        size: "small",
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
                            {sessionStorage.getItem("user") ? (
                                JSON.parse(sessionStorage.getItem("user"))
                                    .type === 0 ? (
                                    <Menu.Item
                                        key="adminManage"
                                        icon={<AppstoreOutlined />}
                                    >
                                        <Link to="/adminManage">运营管理</Link>
                                    </Menu.Item>
                                ) : null
                            ) : null}
                        </Menu>,
                    ]}
                    extra={[
                        <ViewportProvider>
                            {/*<Row key="login">*/}
                            {/*        {sessionStorage.getItem("user") &&*/}
                            {/*        JSON.parse(sessionStorage.getItem("user"))*/}
                            {/*            .loginStatus &&*/}
                            {/*        JSON.parse(sessionStorage.getItem("user"))*/}
                            {/*            .userName ? (*/}
                            {/*            <Dropdown*/}
                            {/*                overlay={menu}*/}
                            {/*                placement="bottomCenter"*/}
                            {/*                arrow*/}
                            {/*            >*/}
                            {/*                <Tag*/}
                            {/*                    icon={<UserOutlined />}*/}
                            {/*                    color="#7f6cf5"*/}
                            {/*                >*/}
                            {/*                    {*/}
                            {/*                        JSON.parse(*/}
                            {/*                            sessionStorage.getItem("user")*/}
                            {/*                        ).userName*/}
                            {/*                    }*/}
                            {/*                </Tag>*/}
                            {/*            </Dropdown>*/}
                            {/*        ) : (*/}
                            {/*            <Button key="1" ghost href="/login" >*/}
                            {/*                登录*/}
                            {/*            </Button>*/}
                            {/*        )}*/}

                            {/*</Row>*/}
                            <MyComponent />
                        </ViewportProvider>,
                    ]}
                />
            </div>
        );
    }
}
