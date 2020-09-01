import { Layout, Select, Typography } from "antd";
import React, { lazy } from "react";
import { withRouter } from "react-router-dom";
import OverView from "../components/statistics/OverView";
import StatisticsBar from "../components/statistics/StatisticsBar";
import TrendingLines from "../components/statistics/TrendingLines";
import Loading from "../components/Loading";
import { getRequest, hostUrl } from "../services/ajax";
const { Sider, Content } = Layout;
const { Text } = Typography;
const MapBox = lazy(() => import("../components/MapBox.js"));
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
        loading: true,
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
    };
    handleData = (response) => {
        this.setState({ data: response.data });
        let lines = [];
        if (response.data.length > 0) {
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
            this.setState({
                mapDisplay: this.state.data[0].areaDistr
                    ? this.state.data[0].areaDistr
                    : null,
            });
        }
        this.setState({ lineData: lines });

        console.log(this.state);

        this.setState({
            lineData: lines,
            loading: false,
        });
    };
    handleError = (error) => {
        import("antd").then(({ message }) => {
            message.error(error.toString());
        });
        this.setState({ loading: false });
    };
    render() {
        let content;
        if (!this.state.loading && this.state.data.length > 0)
            content = (
                <>
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
                                    className="MapSelector"
                                    defaultValue={[this.state.data[0].shortUrl]}
                                    onChange={this.handleChangeSelector}
                                >
                                    {this.state.children}
                                </Select>
                                <MapBox data={this.state.mapDisplay} />
                            </>
                        ) : (
                            <Text style={{ color: "#ffffff" }}> 暂无数据 </Text>
                        )
                    ) : null}
                    {this.state.display === "overview" ? (
                        <OverView data={this.state.lineData} />
                    ) : null}
                </>
            );
        else if (!this.state.loading)
            content = (
                <div
                    style={{
                        marginTop: "10vmin",
                        color: "#ffffff",
                        position: "relative",
                        textAlign: "center",
                    }}
                >
                    <img
                        src={`${hostUrl}/static/box.png`}
                        alt="nodata"
                        style={{
                            width: "30%",
                            marginLeft: "35%",
                            marginRight: "35%",
                            marginBottom: "10vh",
                        }}
                    />
                    你还没有短链接哦~
                    <a href="/create">创建一个</a>
                </div>
            );
        else
            content = (
                <Loading
                    style={{
                        height: 200,
                        marginTop: "calc(50vh - 167px)",
                        marginLeft: "calc(50% - 93px)",
                    }}
                />
            );
        console.log(this.state.loading);
        return (
            <Layout justify="space-between">
                <Sider
                    style={{ background: "#001121", maxWidth: "20%" }}
                    breakpoint="lg"
                    collapsed={this.state.collapsed}
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
                        background: "#001121",
                    }}
                >
                    {content}
                </Content>
            </Layout>
        );
    }
}
export default withRouter(StatisticsView);
