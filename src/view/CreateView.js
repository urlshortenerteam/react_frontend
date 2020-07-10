import React, {Component} from "react";
import Navigation from "../components/Navigation";
import {SearchOutlined} from '@ant-design/icons';
import {Row, Col, Tooltip, Layout, Table, Input, Button, message, Form, Popconfirm, Tabs,Divider} from 'antd';
import {getBatchManyToOne, getBatchOneToOne} from "../Services/CreateService"
import "../css/HomeCss.css"
import "../css/CreateCss.css"
import ManyToOneTable from "../components/ManyToOneTable";
const {Header, Content, Footer} = Layout;
const {TextArea} = Input;
const { TabPane } = Tabs;

/*
CreateView
@author Shuchang Liu
@date July 7th 2020
@description Create View
*/
export default class CreateView extends Component {

    state = {
        value: '',
        tableVisible_oneToOne: false,
        tableVisible_manyToOne: false,
        showData: [],
    };

    manyToOne = () => {
        //先将oneToOne隐藏
        this.setState({
            tableVisible_oneToOne: false,
        });

        //按换行符分割输入的字符串
        let s = this.state.value;
        let urlArray = s.split(/[\n,]/g);

        let flag = true;
        let messages = "第";
        urlArray.forEach((item, index) => {

            if (!item) {
                urlArray.splice(index, 1);//删除空项
            }
            //检查是否为 http:// 或https://
            else {
                if (item.indexOf("https://") !== 0 && item.indexOf("http://") !== 0) {
                    flag = false;
                    messages += index + 1;
                    messages += "、";
                }
            }


        });
        console.log(urlArray);

        if (urlArray.length === 0) {
            message.error("输入不能为空");
            return;
        }

        //格式不正确则打印错误
        if (!flag) {
            messages = messages.substr(0, messages.length - 1);
            message.error(messages + "条长链接格式不正确");
        }


        //将数据发给后端
        const callBack = (rep) => {
            console.log(rep.data);
            let result = [];
            urlArray.forEach(function (item, index) {
                result.push({
                    long: urlArray[index],
                    short: rep.data
                })
            });
            this.setState({
                showData: result,
                tableVisible_manyToOne: true,
            });
            console.log(result);
        };

        // 格式正确则将数据发回后端
        if (flag) {
            getBatchManyToOne(urlArray, callBack);

        }

    };
    oneToOne = () => {
        //先将manyToOne隐藏
        this.setState({
            tableVisible_manyToOne: false,
        });

        //按换行符分割输入的字符串
        let s = this.state.value;
        let urlArray = s.split(/[\n,]/g);

        let flag = true;
        let messages = "第";
        urlArray.forEach((item, index) => {

            if (!item) {
                urlArray.splice(index, 1);//删除空项
            }
            //检查是否为 http:// 或https://
            else {
                if (item.indexOf("https://") != 0 && item.indexOf("http://") != 0) {
                    flag = false;
                    messages += index + 1;
                    messages += "、";
                }
            }
        });

        if (urlArray.length === 0) {
            message.error("输入不能为空");
            return;
        }
        console.log(urlArray);

        //格式不正确则打印错误
        if (!flag) {
            messages = messages.substr(0, messages.length - 1);
            message.error(messages + "条长链接格式不正确");
        }


        //将数据发给后端
        const callBack = (res) => {
            let result = [];
            console.log(res.data);
            res.data.forEach(function (item, index) {
                result.push({
                    long: urlArray[index],
                    short: item,
                })
            });

            this.setState({
                showData: result
            })
        };

        // 格式正确则将数据发回后端
        if (flag) {
            getBatchOneToOne(urlArray, callBack);

            this.setState({
                tableVisible_oneToOne: true,
            });
        }

    };

    onChange = ({target: {value}}) => {
        this.setState({value});
        // console.log(this.state.value);
        this.setState({
            tableVisible_oneToOne: false,
            tableVisible_manyToOne: false,
        })
    };

    render() {

        const columns_for_oneToOne = [
            {
                title: '长链接',
                dataIndex: 'long',
                align: 'center',
                key: 'long',
                // render: text => <a>{text}</a>,
                ellipsis: {
                    showTitle: false,
                },
                render: long => (
                    <Tooltip placement="topLeft" title={long}>
                        {long}
                    </Tooltip>
                ),
                width: 150,
            },
            {
                title: '短链接',
                dataIndex: 'short',
                align: 'center',
                key: 'short',
                width: 80,
            },

        ];

        const columns_for_manyToOne = [
            {
                title: '长链接',
                dataIndex: 'long',
                align: 'center',
                key: 'long',
                // render: text => <a>{text}</a>,
                ellipsis: {
                    showTitle: false,
                },
                render: long => (
                    <Tooltip placement="topLeft" title={long}>
                        {/*<a>{long}</a>*/}
                        {long}
                    </Tooltip>
                ),
                width: 150,
            },
            {
                title: '短链接',

                dataIndex: 'short',
                align: 'center',
                key: 'short',
                width: 80,
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.rowSpan = this.state.showData.length;
                    } else obj.props.rowSpan = 0;
                    return obj;
                },
            },

        ];
        return (
            <Layout style={{backgroundColor: '#001529'}}>
                <Header>
                    <Row>
                        <Col span={20} offset={2}>
                            <Navigation/>
                        </Col>
                    </Row>
                </Header>

                <Content style={{padding: '0 50px'}}>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={18}>
                            <Tabs defaultActiveKey="1" >
                                <TabPane tab="原始" key="1">
                                    <Row>
                                        <Col span={4} offset={4}>
                                            <Button type="primary" onClick={this.oneToOne}>一对一生成</Button>

                                        </Col>
                                        <Col span={6}>

                                            <Button type="primary" onClick={this.manyToOne}>多对一生成</Button>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col span={16} offset={4}>

                                            <div className="shadow">
                                                <TextArea
                                                    value={this.state.value}
                                                    onChange={this.onChange}
                                                    placeholder="请输入长链接，以换行符分割"
                                                    autoSize={{minRows: 6, maxRows: 100}}

                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <br/><br/><br/>
                                    <Row>
                                        <Col span={16} offset={4}>
                                            {this.state.tableVisible_oneToOne ?
                                                // <div className="shadow">
                                                <Table
                                                    columns={columns_for_oneToOne}
                                                    dataSource={this.state.showData}
                                                />
                                                // </div>

                                                : null}
                                            {this.state.tableVisible_manyToOne ?
                                                // <div className="shadow">
                                                <Table
                                                    columns={columns_for_manyToOne}
                                                    dataSource={this.state.showData}
                                                />
                                                // </div>

                                                : null}
                                        </Col>

                                    </Row>

                                </TabPane>
                                <TabPane tab="多对一" key="2">
                                    <ManyToOneTable/>
                                </TabPane>
                                <TabPane tab="Order Manage" key="3">

                                </TabPane>

                            </Tabs>
                        </Col>
                        <Col span={3}></Col>
                    </Row>
                    <br/> <br/>


                </Content>
                <br/> <br/> <br/> <br/> <br/> <br/><br/>

                <Footer style={{textAlign: 'center', backgroundColor: '#001529', color: '#d8e3e7'}}>Ant Design ©2018
                    Created by Ant UED</Footer>
            </Layout>

        );
    }
}
