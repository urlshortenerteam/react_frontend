import React, { Component } from "react";

import { Row, Col } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import "../css/LoginCss.css";
import "antd/dist/antd.css";

import {
    AccountBookOutlined,
    LockOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const onFinish = (values) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

class LogInBlock extends React.Component {
    formRef = React.createRef();

    render() {
        // const { getFieldDecorator } = this.props.form;
        const onFinish = (values) => {
            console.log("Received values of form: ", values);
            userService.login(values);
        };

        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };
        return (
            <div className="login">
                <Row style={{ padding: "25px" }}>
                    <Col span={6}></Col>
                    <Col span={12}>
                        <div>
                            <div className="title">登录</div>
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                ref={this.formRef}
                            >
                                {/*<span className="myh4">Username  </span>*/}
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your username!",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="请输入用户名"
                                        prefix={
                                            <UserOutlined
                                                style={{ color: "white" }}
                                            />
                                        }
                                    />
                                </Form.Item>

                                {/*<span className="myh4">Password   </span>*/}
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="请输入密码"
                                        prefix={
                                            <LockOutlined
                                                style={{ color: "white" }}
                                            />
                                        }
                                    />
                                </Form.Item>


                                <Row justify="space-between">
                                    <Col>
                                    {" "}
                                        <a href="#/register">
                                            {" "} <Button ghost><span>注册</span></Button></a></Col>
                                    <Col>
                                        <Form.Item>
                                            <Button ghost htmlType="submit">
                                                登录
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>

                    <Col span={6}></Col>
                </Row>


            </div>
        );
    }
}

/*
LoginView
@author Shuchang Liu
@date July 8th 2020
@description Login View
*/
class LoginView extends Component {
    render() {
        return (
            <div>
                <div className="myBack">
                    <LogInBlock/>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginView);
