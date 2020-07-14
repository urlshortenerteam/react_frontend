import React, { Component } from "react";
import Navigation from "../components/Navigation";
import { Row, Col } from "antd";
import "../css/HomeCss.css";
import SearchBar from "../components/SearchBar";
import { Layout } from "antd";

const {Header, Content, Footer} = Layout;

/*
HomeView
@author Shuchang Liu
@date July 6th 2020
@description Home View
*/
class HomeView extends Component {
    render() {
        return (
            <Layout style={{ backgroundColor: "#001529" }}>
                <Header>
                    <Row>
                        <Col span={20} offset={2}>
                            <Navigation />
                        </Col>
                    </Row>
                </Header>
                <Content style={{display:'flex',height:'100%'}}>
                    <h1 className="centerDesc">
                        短链接<br/>
                        从未如此<br/>
                        简单易用<br style={{padding: 0}}/>
                        <Button icon={<RightOutlined/>} href='#/create' ghost>开始探索</Button>
                    </h1>
                    <img className="leftDesc" src={hostUrl + "/flow.png"} alt={''}/>
                    <img className="rightBottomDesc" src={hostUrl + "/people.png"} alt={''}/>
                    <img className="rightTopDesc" src={hostUrl + "/trans.png"} alt={''}/>
                </Content>
                <Footer style={{textAlign: 'center', backgroundColor: '#001529', color: '#d8e3e7'}}>Reevoo ShortLink
                    ©2020 Created by Reevoo Team</Footer>
            </Layout>
        );
    }
}

export default HomeView;
