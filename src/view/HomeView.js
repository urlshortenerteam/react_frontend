import React, {Component} from "react";
import Navigation from "../components/Navigation";
import { Row, Col } from 'antd';
import "../css/HomeCss.css"
import SearchBar from "../components/SearchBar";
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

/*
HomeView
@author Shuchang Liu
@date July 6th 2020
@description Home View
*/
class HomeView extends Component{
    render() {
        return (

            <Layout style={{ backgroundColor:'#001529' }}>
                <Header>

                    <Row>
                        <Col span={20} offset={2}>
                            <Navigation/>
                        </Col>

                    </Row>
                </Header>
                {/*style={{ padding: '0 50px' }}*/}
                {/*<Content >*/}
                <div style={{backgroundColor:'#001529'}}>
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
                {/*</Content>*/}
                <br/> <br/> <br/>  <br/>      <br/>  <br/><br/>

                <Footer style={{ textAlign: 'center',backgroundColor:'#001529',color:'#d8e3e7' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>

        );
    }

}

export default HomeView;
