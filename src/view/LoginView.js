import React, { Component } from "react";
import { Button, Col, Form, Input, Layout, message, Row } from "antd";
import * as userService from "../services/userService";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const { Content } = Layout;

/**
LoginView
@author Shuchang Liu
@date July 8th 2020
@description Login View
*/
class LoginView extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            username: null,
        };
    }

    componentDidMount() {
        if (sessionStorage.getItem("user")) {
            this.props.history.go(-1);
        }
    }

    render() {
        const callback = (res) => {
            if (res.data.loginStatus) {
                let ans = { ...res.data, userName: this.state.username };
                sessionStorage.setItem("user", JSON.stringify(ans));
                // sessionStorage.setItem("user", JSON.stringify(res.data));
                // sessionStorage.setItem("userName",this.state.username);
                if (sessionStorage.getItem("user")) {
                    console.log(JSON.parse(sessionStorage.getItem("user")));
                    console.log(this.props.history);

                    message.success("登录成功");
                    this.props.history.go(-1);
                    // window.location.reload();
                    // this.props.history.goBack();
                } else {
                    console.log("no data");
                }

                // window.location.href = "/";
            } else {
                if (res.data.type === 1) {
                    message.error("用户名或密码错误");
                } else if (res.data.type === 2) {
                    message.error("您已被禁用");
                } else {
                    message.error("登陆失败：不会出现此情况");
                }
            }
        };
        const onFinish = (values) => {
            console.log("Received values of form: ", values);

            this.setState({
                username: values.name,
            });
            userService.login(values, callback);
        };

        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };

        const goToReg = () => {
            window.location.replace("/register");
        };
        return (
            <Content>
                <Row justify="center">
                    <div className="login">
                        <Row style={{ padding: "25px" }}>
                            <Col
                                lg={{ span: 14, offset: 5 }}
                                xs={{ span: 18, offset: 3 }}
                                md={{ span: 16, offset: 4 }}
                            >
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
                                                <Button onClick={goToReg} ghost>
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

export default withRouter(LoginView);
// withRouter(LogInBlock);
