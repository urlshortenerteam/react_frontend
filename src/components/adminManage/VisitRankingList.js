import React, { Component } from "react";
import { Card, Col, List, message, Row, Skeleton, Tag, Tooltip } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { getTopTen } from "../../services/adminManageService";
import SnapShot from "../url-manage/SnapShot";
import { hostUrl } from "../../services/ajax";
import DonutPlot from "./DonutPlot";
import Loading from "../Loading";

const IconText = ({ icon, text, action }) => (
    <span style={{ color: "white" }} onClick={action}>
        {React.createElement(icon, {
            style: { marginRight: 8, color: "white" },
        })}
        {text}
    </span>
);

/**
 * VisitRankingList
 * @author Shuchang Liu
 * @date July 16th 2020
 * @description show the top ten urls
 **/
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
        if (response.not_administrator) {
            message.error("您不是管理员！！！");
            return;
        }

        console.log(this.state);

        let lists = [];
        let temp = [];
        response.data.forEach(function (item, index) {
            temp.push({
                value: item.count,
                type: item.shortUrl,
            });
            lists.push({
                ...item,
                index: index + 1,
            });
        });

        console.log(temp);

        this.setState({
            listData: lists,
            loading: false,
            showData: temp,
        });
    };
    handleError = (error) => {
        import("antd").then(({ message }) => {
            message.error(error.toString());
        });
    };

    render() {
        const { loading, listData } = this.state;
        if (this.state.loading)
            return (
                <Loading
                    style={{
                        height: 200,
                        marginTop: "calc(40vh - 226px)",
                        marginLeft: "calc(40vw - 101.667px)",
                    }}
                />
            );
        return (
            <Row>
                <Col xs={23} lg={14} md={23}>
                    <div className="topRank">
                        <div className="number">
                            <Card title="访问量排行榜--TOP 10">
                                <List
                                    style={{
                                        outline: " none",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                    }}
                                    pagination={{
                                        pageSize: 2,
                                        size: "small",
                                    }}
                                    itemLayout="vertical"
                                    size="large"
                                    dataSource={listData}
                                    renderItem={(item) => {
                                        let longList = [];
                                        if (item.longUrl.length !== 0) {
                                            if (
                                                item.longUrl[0].url !== "BANNED"
                                            )
                                                item.longUrl.forEach(
                                                    (long, index) => {
                                                        longList.push(
                                                            <Row
                                                                key={index}
                                                                align="middle"
                                                            >
                                                                <SnapShot
                                                                    value={
                                                                        long.url
                                                                    }
                                                                    black={
                                                                        false
                                                                    }
                                                                />
                                                                <span
                                                                    style={{
                                                                        marginLeft: 8,
                                                                        marginBottom: 4,
                                                                        color:
                                                                            "#cccccc",
                                                                    }}
                                                                >
                                                                    <Tooltip
                                                                        placement="topLeft"
                                                                        title={
                                                                            long.url
                                                                        }
                                                                    >
                                                                        {
                                                                            long.url
                                                                        }
                                                                    </Tooltip>
                                                                </span>
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
                                        }

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
                                                                {item.longUrl
                                                                    .length ===
                                                                0 ? (
                                                                    <Tag color="#3b5999">
                                                                        <span
                                                                            style={{
                                                                                color:
                                                                                    "white",
                                                                                fontSize: 16,
                                                                                fontWeight:
                                                                                    "bold",
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.shortUrl
                                                                            }
                                                                        </span>
                                                                    </Tag>
                                                                ) : item
                                                                      .longUrl[0]
                                                                      .url ===
                                                                  "BANNED" ? (
                                                                    <Tag
                                                                        color="#cb0000"
                                                                        style={{
                                                                            height:
                                                                                "auto",
                                                                        }}
                                                                    >
                                                                        <a
                                                                            style={{
                                                                                color:
                                                                                    "white",
                                                                                fontSize: 16,
                                                                                fontWeight:
                                                                                    "bold",
                                                                            }}
                                                                            href={
                                                                                // hostUrl +
                                                                                // "/" +
                                                                                // item
                                                                                //     .longUrl[0]
                                                                                //     .url
                                                                                hostUrl +
                                                                                "/" +
                                                                                item.shortUrl
                                                                            }
                                                                        >
                                                                            {
                                                                                item.shortUrl
                                                                            }
                                                                        </a>
                                                                    </Tag>
                                                                ) : (
                                                                    <Tag color="#3b5999">
                                                                        <a
                                                                            href={
                                                                                hostUrl +
                                                                                "/" +
                                                                                item.shortUrl
                                                                            }
                                                                            style={{
                                                                                color:
                                                                                    "white",
                                                                                fontSize: 17,
                                                                                fontWeight:
                                                                                    "bold",
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.shortUrl
                                                                            }
                                                                        </a>
                                                                    </Tag>
                                                                )}
                                                                <Tag
                                                                    color="#f39142"
                                                                    style={{
                                                                        marginLeft: 10,
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            fontWeight:
                                                                                "lighter",
                                                                            fontSize: 10,
                                                                        }}
                                                                    >
                                                                        NO.{" "}
                                                                        {
                                                                            item.index
                                                                        }
                                                                    </span>
                                                                </Tag>
                                                                <Tag
                                                                    color="#87d068"
                                                                    style={{
                                                                        marginLeft: 10,
                                                                    }}
                                                                >
                                                                    访问量：
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

                        {/*<Col span={10} offset={1}>*/}
                        {/*    <div className="donutPlot">*/}
                        {/*        {this.state.showData.length >= 1 ? (*/}
                        {/*            <DonutPlot data={this.state.showData} />*/}
                        {/*        ) : null}*/}
                        {/*    </div>*/}
                        {/*</Col>*/}
                    </div>
                </Col>
                <Col
                    xs={{ span: 0, offset: 0 }}
                    md={{ span: 0, offset: 0 }}
                    lg={{ span: 9, offset: 1 }}
                >
                    <div className="topRankDonutPlot">
                        <br />
                        <br />
                        <br />
                        <div className="donutPlot">
                            {this.state.showData.length >= 1 ? (
                                <DonutPlot data={this.state.showData} />
                            ) : null}
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}
