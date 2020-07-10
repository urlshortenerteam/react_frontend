import React from "react";
import {Col, Row, Button, message} from "antd";
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

/*
SearchBar
@author Shuchang Liu
@date July 6th 2020
@description Search Bar
*/
export default class SearchBar extends React.Component{
    show=()=>{
        message.error("请先登录");
    };

    render() {
        return(
            <Row>
                <Col span={15} offset={4}>
                    <Search
                        placeholder="请输入需转换网址"

                        size="large"
                        onSearch={value => console.log(value)}
                        style={{ width:700 }}
                    />
                </Col>

                <Col span={4}>
                    <Button ghost size="large" onClick={this.show}>生成短链接</Button>
                </Col>

            </Row>


        );
    }
}
