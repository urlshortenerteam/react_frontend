import React from "react";
import { Button, Menu, PageHeader} from "antd";
import {
    AlignCenterOutlined,
    AppstoreOutlined,
    AreaChartOutlined,
    BankOutlined,
    PicLeftOutlined,
} from "@ant-design/icons";
import "../css/NavigationCss.css";

/*
Navigation:
@author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
@date July 7th 2020
*/
export default class Navigation extends React.Component {
    state = {
        current: "mail",
    };

    handleClick = (e) => {
        console.log("click ", e);
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
                            theme={"dark"}
                        >
                            <Menu.Item key="home" icon={<BankOutlined />}>
                                <a href="#">首页</a>
                            </Menu.Item>

                            <Menu.Item
                                key="statistics"
                                icon={<AreaChartOutlined />}
                            >
                                <a href="#/statistics">统计图表</a>
                            </Menu.Item>
                            <Menu.Item key="create" icon={<PicLeftOutlined />}>
                                <a href="#/create">批量生成</a>
                            </Menu.Item>
                            <Menu.Item
                                key="manage"
                                icon={<AlignCenterOutlined />}
                            >
                                <a href="#/manage">管理链接</a>
                            </Menu.Item>
                            <Menu.Item key="other" icon={<AppstoreOutlined />}>
                                <a
                                    href="https://xiaomark.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    其他
                                </a>
                            </Menu.Item>
                        </Menu>,
                    ]}
                    extra={[
                        <Button key="3" ghost href="#/login">
                            登录
                        </Button>,
                        <Button ghost key="2" href="#/register">
                            注册
                        </Button>,
                        // <Button key="1" type="primary">
                        //     Primary
                        // </Button>,
                        // <DropdownMenu ghost key="more" />,
                    ]}
                />
                ,
            </div>
        );
    }
}
