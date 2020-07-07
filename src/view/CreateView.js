import React, {Component, useReducer} from "react";
import Navigation from "../components/Navigation";
import {Row, Col} from 'antd';
import "../css/HomeCss.css"
import {Input, Button} from 'antd';
import {AudioOutlined} from '@ant-design/icons';
import SearchBar from "../components/SearchBar";
import {Table} from 'antd';
import {getBatchOneToOne} from "../Services/CreateService"
const {TextArea} = Input;
const columns = [
    {
        title: '长链接',
        dataIndex: 'long',
        align: 'center',
        key: 'long',
        render: text => <a>{text}</a>,
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
export default class CreateView extends Component {

    state = {
        value: '',
        tableVisible: false,
        showData:[],
    };
    manyToOne = () => {

    };
    oneToOne = () => {
        //按换行符分割输入的字符串
        let s = this.state.value;
        let urlArray = s.split(/[\n,]/g);

        urlArray.forEach((item, index) => {

            if (!item) {
                urlArray.splice(index, 1);//删除空项
            }
            //检查是否为 http:// 或https://

        });
        console.log(urlArray);

        //检查长链接正确性



        //将数据发给后端
        const callBack=(data)=>{
            let result=[];
            data.forEach(function(item,index){
                result.push({
                    long:urlArray[index],
                    short:item,
                })
            });

            this.setState({
                showData:result
            })
        };
        getBatchOneToOne(this.state.urls,callBack);

        this.setState({
            tableVisible: true,
        });
    };
    onChange = ({target: {value}}) => {
        this.setState({value});
        // console.log(this.state.value);
        this.setState({
            tableVisible: false,
        })
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={20} offset={2}>
                        <Navigation/>
                    </Col>

                </Row>

                <Row>
                    <Col span={16} offset={4}>
                        <TextArea

                            onChange={this.onChange}
                            placeholder="请输入长链接，以换行符分割"
                            autoSize={{minRows: 5, maxRows: 100}}
                        />
                    </Col>

                </Row>

                <br/>
                <Row>
                    <Col span={2} offset={4}>
                        <Button type="primary" onClick={this.oneToOne}>一对一生成</Button>

                    </Col>
                    <Col span={6}>

                        <Button type="primary">多对一生成</Button>
                    </Col>


                </Row>

                <br/>
                <Row>
                    <Col span={16} offset={4}>
                        {this.state.tableVisible ?
                            <Table
                                columns={columns}
                                dataSource={this.state.showData}
                            />
                            : null}
                    </Col>

                </Row>


            </div>
        );
    }
}
