import React from "react";
import {Button, Dropdown, Menu, PageHeader, Typography} from 'antd';
import {
    AlignCenterOutlined,
    AppstoreOutlined,
    AreaChartOutlined,
    BankOutlined,
    EllipsisOutlined,
    PicLeftOutlined,
    SettingOutlined
} from '@ant-design/icons';
import "../css/NavigationCss.css"


const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
            </a>
        </Menu.Item>
    </Menu>
);
const {SubMenu} = Menu;
const DropdownMenu = () => {
    return (
        <Dropdown key="more" overlay={menu}>
            <Button
                style={{
                    border: 'none',
                    padding: 0,
                }}
            >
                <EllipsisOutlined
                    style={{
                        fontSize: 20,
                        verticalAlign: 'top',
                    }}
                />
            </Button>
        </Dropdown>
    );
};

/*
Navigation:
@author Shuchang Liu <liushuchang0609@sjtu.edu.cn>
@date July 7th 2020
*/
export default class Navigation extends React.Component {
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({current: e.key});
    };

    render() {
        const {current} = this.state;
        return (
            <div>
                    <PageHeader

                        ghost
                        className="site-page-header"
                        title="Reevoo"
                        avatar={{src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'}}
                        subTitle={[

                            // theme={"dark"}
                                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal"  theme={"dark"}>
                                    <Menu.Item key="home" icon={ <BankOutlined />}>
                                        <a href="#">首页</a>
                                    </Menu.Item>
                                    <SubMenu icon={<SettingOutlined/>} title="产品功能">
                                        <Menu.ItemGroup title="访问统计">
                                            {/*<Menu.Item key="setting:1">Option 1</Menu.Item>*/}
                                            {/*<Menu.Item key="setting:2">Option 2</Menu.Item>*/}
                                        </Menu.ItemGroup>
                                        <Menu.ItemGroup title="报表分享">
                                        </Menu.ItemGroup>
                                        <Menu.ItemGroup title="随时修改">
                                        </Menu.ItemGroup>
                                        <Menu.ItemGroup title="批量创建">
                                        </Menu.ItemGroup>
                                        <Menu.ItemGroup title="随机跳转">
                                        </Menu.ItemGroup>
                                        <Menu.ItemGroup title="分类管理">
                                        </Menu.ItemGroup>
                                        <Menu.ItemGroup title="生成二维码">
                                        </Menu.ItemGroup>
                                    </SubMenu>
                                    <Menu.Item key="statistics" icon={  <AreaChartOutlined />}>
                                        <a href="#/statistics">统计图表</a>
                                    </Menu.Item>
                                    <Menu.Item key="create" icon={  <PicLeftOutlined />}>
                                        <a href="#/create">批量生成</a>
                                    </Menu.Item>
                                    <Menu.Item key="manage" icon={<AlignCenterOutlined />}>
                                        <a href="#/manage">管理链接</a>
                                    </Menu.Item>
                                    <Menu.Item key="other" icon={<AppstoreOutlined/>}>
                                        <a href="https://xiaomark.com/" target="_blank" rel="noopener noreferrer">
                                            其他
                                        </a>
                                    </Menu.Item>
                                </Menu>



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
                    />,


            </div>

        );
    }
}


