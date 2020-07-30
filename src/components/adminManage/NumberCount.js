import { Card, Col, Empty, message, Row, Statistic } from "antd";
import {
    BarChartOutlined,
    RiseOutlined,
    SmileOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import React, { Component } from "react";
import "../../css/AdminStatisticsCss.css";
import { getNumberCount } from "../../services/adminManageService";
import { hostUrl } from "../../services/ajax";

/**
 * NumberCount
 * @author Shuchang Liu
 * @date July 16th 2020
 * @description NumberCount used in adminManageService
 **/
export default class NumberCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount: null,
            shortUrlCount: null,
            visitCountTotal: null,
            shortUrl: null,
        };
    }
    componentDidMount() {
        const callback = (res) => {
            if (res.not_administrator) {
                if (sessionStorage.getItem("user")) {
                    sessionStorage.removeItem("user");
                }
                window.location.href = "/login";
                message.error("您不是管理员！！！");
                return;
            }
            let data = res.data;
            this.setState({
                userCount: data.userCount,
                shortUrlCount: data.shortUrlCount,
                visitCountTotal: data.visitCountTotal,
                shortUrl: data.shortUrl,
            });
        };
        getNumberCount(callback, (error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <div className="number">
                <Row>
                    <Col span={5}>
                        <Card hoverable={true}>
                            <div style={{ margin: 10 }}>
                                {this.state.userCount ? (
                                    <Statistic
                                        title="用户数"
                                        value={this.state.userCount}
                                        valueStyle={{ color: "#55acee" }}
                                        prefix={<TeamOutlined />}
                                    />
                                ) : (
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description={false}
                                    />
                                )}
                            </div>
                        </Card>
                    </Col>
                    <Col span={5} offset={1}>
                        <Card hoverable={true}>
                            <div style={{ margin: 10 }}>
                                {this.state.shortUrlCount ? (
                                    <Statistic
                                        title="总短链接数"
                                        value={this.state.shortUrlCount}
                                        valueStyle={{ color: "#55acee" }}
                                        prefix={<BarChartOutlined />}
                                    />
                                ) : (
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description={false}
                                    />
                                )}
                            </div>
                        </Card>
                    </Col>

                    <Col span={5} offset={1}>
                        <Card hoverable={true}>
                            <div style={{ margin: 10 }}>
                                {this.state.visitCountTotal !== null ? (
                                    <Statistic
                                        title="总访问量"
                                        value={this.state.visitCountTotal}
                                        valueStyle={{ color: "#55acee" }}
                                        prefix={<RiseOutlined />}
                                    />
                                ) : (
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description={false}
                                    />
                                )}
                            </div>
                        </Card>
                    </Col>
                    <Col span={5} offset={1}>
                        <Card hoverable={true}>
                            <div style={{ margin: 10 }}>
                                {this.state.shortUrl ? (
                                    <Statistic
                                        title="最受欢迎短链接"
                                        value={this.state.shortUrl}
                                        valueStyle={{ color: "#55acee" }}
                                        prefix={<SmileOutlined />}
                                    />
                                ) : (
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description={false}
                                    />
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
