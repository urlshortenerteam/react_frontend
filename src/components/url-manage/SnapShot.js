import { Popover, Spin } from "antd";
import React from "react";
import { PictureFilled } from "@ant-design/icons";
import { primaryColor } from "../../css/theme.js";

export default class SnapShot extends React.Component {
    state = {
        loaded: false,
    };
    handleShot = () => {
        this.setState({ loaded: true });
    };
    AsyncSnapShot = (value) => {
        return (
            <Spin
                spinning={!this.state.loaded}
                size="large"
                style={{ textAlign: "center" }}
            >
                <img
                    src={"https://blinky.nemui.org/shot?" + value}
                    onLoad={this.handleShot}
                    alt={"snapshot"}
                />
            </Spin>
        );
    };
    render() {
        return (
            <Popover
                content={this.AsyncSnapShot(this.props.value)}
                title="网页预览"
            >
                {this.props.black ? (
                    <PictureFilled
                        style={{ color: primaryColor, marginLeft: 8 }}
                    />
                ) : (
                    <PictureFilled style={{ color: "white", marginLeft: 8 }} />
                )}
            </Popover>
        );
    }
}
