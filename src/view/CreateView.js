import React, {Component, useReducer} from "react";
import Navigation from "../components/Navigation";
import {Row, Col, Tooltip, Layout, Tabs} from 'antd';
import "../css/HomeCss.css"
import {Input, Button} from 'antd';
import {AudioOutlined} from '@ant-design/icons';
import SearchBar from "../components/SearchBar";
import {Table} from 'antd';
import {getBatchManyToOne, getBatchOneToOne} from "../Services/CreateService"
import { Alert } from 'antd';
import { message, Space } from 'antd';
import "../css/CreateCss.css"
const { Header, Content, Footer } = Layout;
const {TextArea} = Input;

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
        showData:[],
    };

    manyToOne = () => {
        //先将oneToOne隐藏
        this.setState({
            tableVisible_oneToOne: false,
        });

        //按换行符分割输入的字符串
        let s = this.state.value;
        let urlArray = s.split(/[\n,]/g);

        let flag=true;
        let messages="第";
        urlArray.forEach((item, index) => {

            if (!item) {
                urlArray.splice(index, 1);//删除空项
            }
            //检查是否为 http:// 或https://
            else
            {
                if(item.indexOf("https://")!==0 && item.indexOf("http://")!==0)
                {
                    flag=false;
                    messages+=index+1;
                    messages+="、";
                }
            }


        });
        console.log(urlArray);

        if(urlArray.length===0)
        {
            message.error("输入不能为空");
            return;
        }

        //格式不正确则打印错误
        if(!flag)
        {
            messages = messages.substr(0,messages.length-1);
            message.error(messages+"条长链接格式不正确");
        }


        //将数据发给后端
        const callBack=(rep)=>{
            console.log(rep.data.short);
            let result=[];
            urlArray.forEach(function (item,index) {
                result.push({
                    long:urlArray[index],
                    short:rep.data.short
                })
            });
            this.setState({
                showData:result,
                tableVisible_manyToOne: true,
            });
            console.log(result);
        };

        // 格式正确则将数据发回后端
        if(flag)
        {
            getBatchManyToOne(this.state.urls,callBack);


        }

        // 先在没有后端，先只显示数据
        // if(flag)
        // {
        //     let result=[];
        //     urlArray.forEach(function(item,index){
        //         result.push({
        //             long:item,
        //             short:"hhhh",
        //         })
        //     });
        //
        //     this.setState({
        //         showData:result
        //     });
        //     this.setState({
        //         value:""
        //     });
        //
        // }

    };
    oneToOne = () => {
        //先将manyToOne隐藏
        this.setState({
            tableVisible_manyToOne: false,
        });

        //按换行符分割输入的字符串
        let s = this.state.value;
        let urlArray = s.split(/[\n,]/g);

        let flag=true;
        let messages="第";
        urlArray.forEach((item, index) => {

            if (!item) {
                urlArray.splice(index, 1);//删除空项
            }
            //检查是否为 http:// 或https://
            else
            {
                if(item.indexOf("https://")!=0 && item.indexOf("http://")!=0)
                {
                    flag=false;
                    messages+=index+1;
                    messages+="、";
                }
            }


        });

        if(urlArray.length===0)
        {
            message.error("输入不能为空");
            return;
        }
        console.log(urlArray);

        //格式不正确则打印错误
        if(!flag)
        {
            messages = messages.substr(0,messages.length-1);
            message.error(messages+"条长链接格式不正确");
        }


        //将数据发给后端
        const callBack=(res)=>{
            let result=[];
            console.log(res);
            // res.data.forEach(function(item,index){
            //     result.push({
            //         long:urlArray[index],
            //         short:item,
            //     })
            // });
            //
            // this.setState({
            //     showData:result
            // })
        };

        // 格式正确则将数据发回后端
        if(flag)
        {
            getBatchOneToOne(this.state.urls,callBack);

            this.setState({
                tableVisible_oneToOne: true,
            });
        }

        // 先在没有后端，先只显示数据
        if(flag)
        {
            let result=[];
            urlArray.forEach(function(item,index){
                result.push({
                    long:item,
                    short:" ",
                })
            });

            this.setState({
                showData:result
            });
            this.setState({
                value:""
            });

        }

    };

    onChange = ({target: {value}}) => {
        this.setState({value});
        // console.log(this.state.value);
        this.setState({
            tableVisible_oneToOne: false,
            tableVisible_manyToOne:false,
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
                    }
                    else  obj.props.rowSpan=0;
                    return obj;
                },
            },

        ];
        return (
            <Layout style={{ backgroundColor:'#001529' }}>
                <Header>

                    <Row>
                        <Col span={20} offset={2}>
                            <Navigation/>
                        </Col>

                    </Row>
                </Header>

                <Content  style={{ padding: '0 50px' }}>
                    <br/>  <br/>
                    <Row>
                                 <Col span={2} offset={4}>
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

                         <br/>

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


                </Content>
                <br/> <br/> <br/>  <br/>      <br/>  <br/><br/>

                <Footer style={{ textAlign: 'center',backgroundColor:'#001529',color:'#d8e3e7' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>

            // <div>
            //     <Row>
            //         <Col span={20} offset={2}>
            //             <Navigation/>
            //         </Col>
            //
            //     </Row>
            //
            //     <Row>
            //         <Col span={2} offset={4}>
            //             <Button type="primary" onClick={this.oneToOne}>一对一生成</Button>
            //
            //         </Col>
            //         <Col span={6}>
            //
            //             <Button type="primary" onClick={this.manyToOne}>多对一生成</Button>
            //         </Col>
            //
            //
            //     </Row>
            //
            //     <br/>
            //     <Row>
            //         <Col span={16} offset={4}>
            //
            //             <div className="shadow">
            //                 <TextArea
            //                     value={this.state.value}
            //                     onChange={this.onChange}
            //                     placeholder="请输入长链接，以换行符分割"
            //                     autoSize={{minRows: 6, maxRows: 100}}
            //
            //                 />
            //             </div>
            //
            //
            //
            //         </Col>
            //
            //     </Row>
            //
            //     <br/>
            //
            //     <Row>
            //         <Col span={16} offset={4}>
            //             {this.state.tableVisible_oneToOne ?
            //                 // <div className="shadow">
            //                     <Table
            //                         columns={columns_for_oneToOne}
            //                         dataSource={this.state.showData}
            //                     />
            //                 // </div>
            //
            //                 : null}
            //             {this.state.tableVisible_manyToOne ?
            //                 // <div className="shadow">
            //                     <Table
            //                         columns={columns_for_manyToOne}
            //                         dataSource={this.state.showData}
            //                     />
            //                 // </div>
            //
            //                 : null}
            //         </Col>
            //
            //     </Row>
            //
            //
            // </div>
        );
    }
}
