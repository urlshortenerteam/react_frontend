import React, {Component} from "react";
import Navigation from "../components/Navigation";
import { Row, Col } from 'antd';
import "../css/HomeCss.css"
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import SearchBar from "../components/SearchBar";

const { Search } = Input;
class HomeView extends Component{
    render() {
        return (
            <div>
                <Row>
                    <Col span={20} offset={2}>
                        <Navigation/>
                    </Col>

                </Row>
                <div className="Block">
                    <br/><br/>
                    <div className="title">
                        简单易用的渠道短链接统计工具
                    </div>
                    <br/><br/><br/>
                <div>
                    <Row>
                        <Col span={18} offset={3}>

                            <SearchBar/>


                        </Col>

                    </Row>
                </div>

            </div>

            </div>
        );
    }

}

export default HomeView;
