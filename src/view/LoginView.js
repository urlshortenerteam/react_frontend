import React, { Component } from "react";

import { Button, Col, Form, Input, Layout, Row } from "antd";
import "../css/LoginCss.css";
import "antd/dist/antd.css";
import * as userService from "../services/userService";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const { Content } = Layout;
class LogInBlock extends React.Component {
    formRef = React.createRef();

    render() {
        const onFinish = (values) => {
            console.log("Received values of form: ", values);
            userService.login(values);
        };

        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };
        return (
            <Content>
                {" "}
                <Row justify="center">
                    <div className="login">
                        <Row style={{ padding: "25px" }}>
                            <Col span={12} offset={6}>
                                <div>
                                    <div className="title">登录</div>
                                    <Form
                                        name="basic"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        ref={this.formRef}
                                    >
                                        <Form.Item
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "请输入用户名！",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="请输入用户名"
                                                prefix={
                                                    <UserOutlined
                                                        style={{
                                                            color: "white",
                                                        }}
                                                    />
                                                }
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "请输入密码！",
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder="请输入密码"
                                                prefix={
                                                    <LockOutlined
                                                        style={{
                                                            color: "white",
                                                        }}
                                                    />
                                                }
                                            />
                                        </Form.Item>

                                        <Row justify="space-between">
                                            <Col>
                                                {" "}
                                                <Button href="/register" ghost>
                                                    <span>注册</span>
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Form.Item>
                                                    <Button
                                                        ghost
                                                        htmlType="submit"
                                                    >
                                                        登录
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Content>
        );
    }
}

/**
LoginView
@author Shuchang Liu
@date July 8th 2020
@description Login View
*/
class LoginView extends Component {
    render() {
        return (
            <Content style={{ display: "flex", height: "100%" }}>
                <LogInBlock />
            </Content>
        );
    }
}

export default withRouter(LoginView);
