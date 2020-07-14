import React, {Component} from "react";

import {Button, Col, Form, Input, Row} from 'antd';
import '../css/LoginCss.css'
import 'antd/dist/antd.css';
import * as userService from "../Services/userService"
import { LockOutlined, UserOutlined} from '@ant-design/icons';
import {withRouter} from "react-router-dom";

class LogInBlock extends React.Component {
    formRef = React.createRef();


    render() {
        // const { getFieldDecorator } = this.props.form;
        const onFinish = values => {
            console.log('Received values of form: ', values);
            userService.login(values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return (
            <div className="login">
                <Row style={{padding: "25px"}}>
                    <Col span={6}>

                    </Col>
                    <Col span={12}>
                        <div>
                            <div className="title">登录</div>
                            <Form
                                name="basic"
                                initialValues={{remember: true}}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                ref={this.formRef}
                            >

                                <Form.Item
                                    name="username"
                                    rules={[{required: true, message: '请输入用户名!'}]}
                                >

                                    <Input placeholder="请输入用户名" prefix={<UserOutlined
                                        style={{color: "white"}}
                                    />}/>


                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{required: true, message: '请输入密码!'}]}>

                                    <Input.Password placeholder="请输入密码" prefix={<LockOutlined
                                        style={{color: "white"}}
                                    />}/>

                                </Form.Item>


                                <Row justify='space-between'>

                                    <Col> <a href='#/register'> <Button ghost><span>注册</span></Button></a></Col>
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
                    <LogInBlock/>
            </div>


        );
    }
}

export default withRouter(LoginView);
