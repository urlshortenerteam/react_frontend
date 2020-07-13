import React, { Component } from "react";
import {
    AutoComplete,
    Button,
    Col,
    Form,
    Input,
    message,
    Row,
    Steps,
} from "antd";
import "../css/RegisterCss.css";
import { register } from "../Services/userService";

const { Step } = Steps;

const AutoCompleteOption = AutoComplete.Option;

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
        console.log("Received val" + "ues of form: ", values);

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
                        message: "Please input your username!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="nickname"
                label="Nickname"
                rules={[
                    {
                        required: true,
                        message: "Please input your nickname!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="tel"
                label="Phone"
                rules={[
                    {
                        required: true,
                        message: "Please input your phone number!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="address"
                label="Address"
                rules={[
                    {
                        required: true,
                        message: "Please input your phone address!",
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
                        message: "Please input your password!",
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
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                "The two passwords that you entered do not match!"
                            );
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
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <br />
            <Form.Item {...tailFormItemLayout}>
                <Row>
                    <Col span={6}></Col>
                    <Col span={8}>
                        <Button ghost htmlType="submit">
                            注册
                        </Button>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </Form.Item>
        </Form>
    );
};

/*
RegisterView
@author Shuchang Liu
@date July 8th 2020
@description Register View
*/
class RegisterView extends Component {
    render() {
        return (
            <div>
                <div className="container ">
                    <div className="col-md-12 column">
                        <br /> <br /> <br />
                        {/*<StepBar  num={0}/>*/}
                        <br />
                        <br />
                    </div>
                    {/*<br/><br/><br/><br/><br/><br/><br/><br/>*/}

                    <div className="registerBlock">
                        <div className="registerTitle">
                            <span>注册</span>
                        </div>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={14}>
                                <br />
                                <br />
                                <div className="register">
                                    <RegistrationForm />
                                </div>
                            </Col>
                            <Col span={6}></Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterView;
