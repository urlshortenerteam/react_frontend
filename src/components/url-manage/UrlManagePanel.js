import React, { Component } from "react";
import { List, Skeleton, Row, Col, Statistic, message } from "antd";
import {
    CloseOutlined,
    StarOutlined,
    EditOutlined,
    EyeOutlined,
    CoffeeOutlined,
} from "@ant-design/icons";
import { getRequest } from "../../Services/ajax";
import SnapShot from "./SnapShot";
import { hostUrl } from "../../Services/ajax";
import { BanUrl } from "../../Services/urlService";

const IconText = ({ icon, text, action }) => (
    <span style={{ color: "white" }} onClick={action}>
        {React.createElement(icon, {
            style: { marginRight: 8, color: "white" },
        })}
        {text}
    </span>
);
export default class UrlManagePanel extends Component {
    state = {
        loading: true,
        listData: [],
    };

    async componentDidMount() {
        getRequest("/getStat", this.handleData, {
            params: { id: 1 },
            errorCallback: this.handleError,
        });
    }

    handleData = (response) => {
        this.setState({ listData: response.data, loading: false });
        this.state.listData.forEach((short) => {
            let idle = 0;
            short.time_distr.forEach((time) => {
                //visit less than 2000 is seen as an idle hour
                if (time.value <= 2000) idle++;
            });
            short.idle = idle;
        });
        console.log(this.state);
    };
    handleError = (error) => {
        console.log(error);
    };

    handleBan = (response) => {
        console.log(response.data);
        if (response.data.status === true) message.success("禁用成功");
        else message.error("禁用失败，状态码" + response.status);
    };

    handleEdit = (data) => {
        message.warning("修改链接" + data + "的功能尚未开放");
    };
    render() {
        const { loading, listData } = this.state;
        return (
            <>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={(item) => {
                        let longList = [];
                        item.longUrl.forEach((long, index) => {
                            longList.push(
                                <Row key={index} align="middle">
                                    <span
                                        style={{
                                            padding: "7px",
                                            color: "#cccccc",
                                        }}
                                    >
                                        {long.url}
                                    </span>
                                    <SnapShot value={long.url} />
                                </Row>
                            );
                        });
                        return (
                            <List.Item
                                key={item.shortUrl}
                                actions={
                                    !loading && [
                                        <IconText
                                            icon={CloseOutlined}
                                            text="禁用"
                                            key="list-vertical-star-o"
                                            action={() =>
                                                BanUrl({
                                                    url: item.shortUrl,
                                                    callback: this.handleBan,
                                                    errorCallback: this
                                                        .handleError,
                                                })
                                            }
                                        />,
                                        <IconText
                                            icon={StarOutlined}
                                            text="收藏"
                                            key="list-vertical-like-o"
                                        />,
                                        <IconText
                                            icon={EditOutlined}
                                            text="编辑"
                                            key="list-vertical-message"
                                            action={this.handleEdit}
                                        />,
                                    ]
                                }
                                extra={
                                    !loading && (
                                        <Row
                                            gutter={16}
                                            style={{ color: "white" }}
                                        >
                                            <Col span={12}>
                                                <Statistic
                                                    title="访问量"
                                                    value={item.count / 1000.0}
                                                    precision={2}
                                                    valueStyle={{
                                                        color: "#cccccc",
                                                    }}
                                                    prefix={<EyeOutlined />}
                                                    suffix="k"
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <Statistic
                                                    title="闲时"
                                                    style={{ color: "white" }}
                                                    value={item.idle}
                                                    valueStyle={{
                                                        color: "#cccccc",
                                                    }}
                                                    prefix={<CoffeeOutlined />}
                                                    suffix="h"
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                            >
                                <Skeleton loading={loading} active>
                                    <List.Item.Meta
                                        style={{ color: "white" }}
                                        title={
                                            <a
                                                href={item.longUrl[0].url}
                                                style={{ color: "white" }}
                                            >
                                                {item.shortUrl}
                                            </a>
                                        }
                                        description={
                                            <span style={{ color: "white" }}>
                                                {hostUrl + "/" + item.shortUrl}
                                            </span>
                                        }
                                    />
                                    {longList}
                                </Skeleton>
                            </List.Item>
                        );
                    }}
                />
            </>
        );
    }
}
