import { Card, Col, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import "../../css/AdminStatisticsCss.css";

/**
 * NumberCount
 * @author Shuchang Liu
 * @date July 16th 2020
 * @description NumberCountc used in adminManageService
 **/
export default class NumberCount extends Component {
    render() {
        return (
            <div className="number">
                <Row>
                    <Col span={5}>
                        <Card hoverable={true}>
                            <div style={{ margin: 10 }}>
                                <Statistic
                                    title="用户数"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: "#3f8600" }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </div>
                        </Card>
                    </Col>
                    <Col span={5} offset={1}>
                        <Card hoverable={true}>
                            <div style={{ margin: 10 }}>
                                <Statistic
                                    title="总短链接数"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: "#cf1322" }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </div>
                        </Card>
                    </Col>

                    <Col span={5} offset={1}>
                        <Card hoverable={true}>
                            <div style={{ margin: 10 }}>
                                <Statistic
                                    title="总访问量"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: "#cf1322" }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </div>
                        </Card>
                    </Col>
                    <Col span={5} offset={1}>
                        <Card hoverable={true}>
                            <div style={{ margin: 10 }}>
                                <Statistic
                                    title="最高访问量"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: "#cf1322" }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
