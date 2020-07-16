import React, { Component } from "react";
import { Card, Col, List, message, Row, Skeleton, Tag } from "antd";
import { StopOutlined } from "@ant-design/icons";
import "../../css/AdminStatisticsCss.css";
import { getTopTen } from "../../Services/adminManageService";
import SnapShot from "../url-manage/SnapShot";
import { hostUrl } from "../../Services/ajax";
import DonutPlot from "./DonutPlot";

const IconText = ({ icon, text, action }) => (
    <span style={{ color: "white" }} onClick={action}>
        {React.createElement(icon, {
            style: { marginRight: 8, color: "white" },
        })}
        {text}
    </span>
);

export default class VisitRankingList extends Component {
    state = {
        loading: true,
        prefix: "http://",
        listData: [],
        confirmLoading: false,
        showData: [],
    };

    componentDidMount() {
        getTopTen(this.handleData, this.handleError);
    }

    handleData = (response) => {
        console.log(response);

        console.log(this.state);

        let temp = [];
        response.data.forEach(function (item) {
            temp.push({
                value: item.count,

                type: item.shortUrl,
            });
        });
        console.log(temp);
        this.setState({
            listData: response.data,
            loading: false,
            showData: temp,
        });
    };
    handleError = (error) => {
        message.error(error);
    };

    render() {
        const { loading, listData } = this.state;

        return (
            <div className="topRank">
                <Row>
                    <Col span={12}>
                        <div className="number">
                            <Card title="访问量排行榜--TOP 10">
                                <List
                                    pagination={{
                                        pageSize: 2,
                                        size: "small",
                                    }}
                                    itemLayout="vertical"
                                    size="large"
                                    dataSource={listData}
                                    renderItem={(item) => {
                                        let longList = [];
                                        if (item.longUrl[0].url !== "BANNED")
                                            item.longUrl.forEach(
                                                (long, index) => {
                                                    longList.push(
                                                        <Row
                                                            key={index}
                                                            align="middle"
                                                        >
                                                            <span
                                                                style={{
                                                                    marginLeft: 20,
                                                                    marginBottom: 4,
                                                                    color:
                                                                        "#cccccc",
                                                                }}
                                                            >
                                                                {long.url}
                                                            </span>
                                                            <SnapShot
                                                                value={long.url}
                                                                black={false}
                                                            />
                                                        </Row>
                                                    );
                                                }
                                            );
                                        else
                                            longList.push(
                                                <IconText
                                                    key="banned"
                                                    icon={StopOutlined}
                                                    text={"该链接已被禁用"}
                                                />
                                            );
                                        return (
                                            <List.Item key={item.shortUrl}>
                                                <Skeleton
                                                    loading={loading}
                                                    active
                                                >
                                                    <List.Item.Meta
                                                        style={{
                                                            color: "white",
                                                        }}
                                                        title={
                                                            <div>
                                                                <Tag color="#3b5999">
                                                                    <a
                                                                        href={
                                                                            item
                                                                                .longUrl[0]
                                                                                .url
                                                                        }
                                                                        style={{
                                                                            color:
                                                                                "white",
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.shortUrl
                                                                        }
                                                                    </a>
                                                                </Tag>
                                                                <Tag
                                                                    color="#87d068"
                                                                    style={{
                                                                        marginLeft: 10,
                                                                    }}
                                                                >
                                                                    {item.count}
                                                                </Tag>
                                                            </div>
                                                        }
                                                        description={
                                                            <span
                                                                style={{
                                                                    color:
                                                                        "white",
                                                                }}
                                                            >
                                                                <Tag color="#55acee">
                                                                    {hostUrl +
                                                                        "/" +
                                                                        item.shortUrl}
                                                                </Tag>
                                                            </span>
                                                        }
                                                    />
                                                    {longList}
                                                </Skeleton>
                                            </List.Item>
                                        );
                                    }}
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col span={10} offset={1}>
                        <div className="donutPlot">
                            {this.state.showData.length > 1 ? (
                                <DonutPlot data={this.state.showData} />
                            ) : null}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
