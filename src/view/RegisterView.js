import React, { Component } from "react";
import { Button, Col, Form, Input, Layout, message, Row } from "antd";
import "../css/RegisterCss.css";

import { register } from "../Services/userService";

const { Content } = Layout;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = () => {
    const [form] = Form.useForm();
    const callback = (res) => {
        if (res.data.success) {
            message.success("注册成功");
            window.location.href = "#/login";
        } else {
            message.error("注册失败:用户名重复");
        }
    };
    const onFinish = (values) => {
        console.log("Received values of form: ", values);

        register(values, callback);
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="name"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: "请输入您的用户名",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: "请输入您的密码",
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "请确认您的密码",
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject("密码不一致");
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: "email",
                        message: "请输入合法邮件格式",
                    },
                    {
                        required: true,
                        message: "请输入您的邮件",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <br />
            <Form.Item {...tailFormItemLayout}>
                <Row>
                    <Col span={8} offset={6}>
                        <Button ghost htmlType="submit">
                            注册
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
            <br />
        </Form>
    );
};

/**
RegisterView
@author Shuchang Liu
@date July 8th 2020
@description Register View
*/
class RegisterView extends Component {
    render() {
        return (
            <Content>
                <Row justify="center">
                    <div className="registerBlock">
                        <div className="registerTitle">
                            <span>注册</span>
                        </div>
                        <Row>
                            <Col span={14} offset={4}>
                                <br />
                                <br />
                                <div className="register">
                                    <RegistrationForm />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Content>
        );
    }
}

export default RegisterView;
