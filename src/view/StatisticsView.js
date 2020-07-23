import React from "react";
import StatisticsBar from "../components/statistics/StatisticsBar";
import { Layout, Typography } from "antd";
import MapBox from "../components/MapBox";
import TrendingLines from "../components/statistics/TrendingLines";
import "../css/Statistics.css";
import OverView from "../components/statistics/OverView";
import { getRequest } from "../Services/ajax";

const { Sider, Content } = Layout;
const { Text } = Typography;
/**
 StatisticsView
 @author Zhuohao Shen
 @date July 7th 2020
 @description Statistics page
 */
export default class StatisticsView extends React.Component {
    state = {
        display: "overview",
        data: [],
        lineData: [],
        collapsed: true,
    };
    toggleSwitch = ({ key }) => {
        this.setState({ display: key });
    };

    async componentDidMount() {
        getRequest("/getStat", this.handleData, {
            params: { id: JSON.parse(sessionStorage.getItem("user")).id },
            errorCallback: this.handleError,
        });
    }

    handleData = (response) => {
        this.setState({ data: response.data });
        let lines = [];
        this.state.data.forEach((url) => {
            url.timeDistr.forEach((time) => {
                time.url = "short.cn/" + url.shortUrl;
                lines.push(time);
            });
        });
        this.setState({ lineData: lines });
        console.log(this.state);
    };
    handleError = (error) => {
        console.log(error);
    };

    render() {
        return (
            <Layout justify="space-between">
                <Sider
                    style={{ background: "black", maxWidth: "20%" }}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={(collapsed) => {
                        this.setState({ collapsed });
                    }}
                >
                    <StatisticsBar toggleSwitch={this.toggleSwitch} />
                </Sider>
                <Content
                    flex="auto"
                    style={{
                        marginLeft: 30,
                        marginRight: 30,
                        float: "right",
                        background: "black",
                    }}
                >
                    {this.state.display === "time" ? (
                        <TrendingLines data={this.state.lineData} />
                    ) : null}
                    {this.state.display === "area" ? (
                        this.state.data === null ? (
                            <MapBox data={this.state.data[0].areaDistr} />
                        ) : (
                            <Text>暂无数据</Text>
                        )
                    ) : null}
                    {this.state.display === "overview" ? (
                        <OverView data={this.state.lineData} />
                    ) : null}
                </Content>
            </Layout>
        );
    }
}
