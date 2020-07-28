import { Layout, Select, Typography } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import MapBox from "../components/MapBox";
import OverView from "../components/statistics/OverView";
import StatisticsBar from "../components/statistics/StatisticsBar";
import TrendingLines from "../components/statistics/TrendingLines";
import "../css/Statistics.css";
import { getRequest, hostUrl } from "../services/ajax";
const { Sider, Content } = Layout;
const { Text } = Typography;
/**
 StatisticsView
 @author Zhuohao Shen <ao7777@sjtu.edu.cn>
 @date July 7th 2020
 @description Statistics page
 */
class StatisticsView extends React.Component {
    state = {
        display: "overview",
        data: [],
        lineData: [],
        children: [],
        collapsed: false,
        mapDisplay: [],
    };
    toggleSwitch = ({ key }) => {
        this.setState({ display: key });
    };

    async componentDidMount() {
        getRequest("/getStat", this.handleData, {
            params: { id: 0 },
            errorCallback: this.handleError,
        });
    }
    handleChangeSelector = (value) => {
        if (value.length === 0) {
            this.setState({ mapDisplay: [] });
            return;
        }
        let display = [];
        let { data } = this.state;
        console.log(data);
        value.forEach((short) => {
            if (display.length > 0)
                data.find((url) => url.shortUrl === short).areaDistr.forEach(
                    (area, index) => {
                        display[index].value += area.value;
                    }
                );
            else
                display = JSON.parse(
                    JSON.stringify(
                        data.find((url) => url.shortUrl === short).areaDistr
                    )
                );
        });
        this.setState({
            mapDisplay: display,
        });
        console.log(display[0].value);
    };
    handleData = (response) => {
        this.setState({ data: response.data });
        let lines = [];
        this.state.data.forEach((url) => {
            this.state.children.push(
                <Select.Option key={url.shortUrl} value={url.shortUrl}>
                    {url.shortUrl}
                </Select.Option>
            );
            url.timeDistr.forEach((time) => {
                time.url = hostUrl + "/" + url.shortUrl;
                lines.push(time);
            });
        });
        this.setState({ lineData: lines });

        console.log(this.state);

        this.setState({
            lineData: lines,
            mapDisplay: this.state.data[0].areaDistr
                ? this.state.data[0].areaDistr
                : null,
        });
    };
    handleError = (error) => {
        console.log(error);
    };
    render() {
        return (
            <Layout justify="space-between">
                <Sider
                    style={{ background: "black", maxWidth: "20%" }}
                    breakpoint="lg"
                    collapsed={this.state.collapsed}
                    collapsible
                    collapsedWidth="0"
                    onCollapse={(collapsed) => {
                        this.setState({ collapsed });
                    }}
                >
                    <StatisticsBar toggleSwitch={this.toggleSwitch} />
                </Sider>
                <Content
                    flex="auto"
                    style={{
                        marginLeft: "40px",
                        marginRight: "2vmin",
                        float: "right",
                        background: "black",
                    }}
                >
                    {this.state.display === "time" ? (
                        <TrendingLines data={this.state.lineData} />
                    ) : null}
                    {this.state.display === "area" ? (
                        this.state.data.length > 0 ? (
                            <>
                                <Select
                                    mode="multiple"
                                    placeholder="选择短链接"
                                    style={{
                                        width: "40vw",
                                        position: "absolute",
                                        zIndex: 3,
                                        backdropFilter:
                                            "saturate(180%) blur(20px)",
                                        opacity: 0.7,
                                    }}
                                    defaultValue={[this.state.data[0].shortUrl]}
                                    onChange={this.handleChangeSelector}
                                >
                                    {this.state.children}
                                </Select>
                                <MapBox data={this.state.mapDisplay} />
                            </>
                        ) : (
                            <Text> 暂无数据 </Text>
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
export default withRouter(StatisticsView);
