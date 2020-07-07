import React from "react";
import {Col,Row,Button} from "antd";
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;
export default class SearchBar extends React.Component{
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
                    <Button ghost size="large">生成短链接</Button>
                </Col>

            </Row>


        );
    }
}
