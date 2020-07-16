import React, { Component } from "react";
import { hostUrl } from "../../Services/ajax";
import { Popover, Spin } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
/**
* ShortWithQR:
* @author Zhuohao Shen <ao7777@sjtu.edu.cn>
* @date July 14th 2020
* @description a little icon transfer links into QR code, using API from qrserver
* @params {String} short - short link identifier code
* @contents {DOM} - an icon with popover showing a QR code
*/
export default class ShortWithQR extends Component {
    state = {
        loaded: false,
    };
    handleQRload = () => {
        this.setState({ loaded: true });
    };

    AsyncQRcode = (value) => {
        return (
            <Spin
                spinning={!this.state.loaded}
                size="large"
                style={{ textAlign: "center" }}
            >
                <img
                    src={
                        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                        hostUrl +
                        "/" +
                        value
                    }
                    onLoad={this.handleQRload}
                    alt={""}
                />
            </Spin>
        );
    };
    render() {
        return (
            <div>
                {this.props.value}
                {this.props.value === "" ? null : (
                    <Popover
                        content={this.AsyncQRcode(this.props.value)}
                        title="生成二维码"
                    >
                        <QrcodeOutlined />
                    </Popover>
                )}{" "}
            </div>
        );
    }
}
