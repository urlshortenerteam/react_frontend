import React, { Component } from "react";
import {
    Col,
    Input,
    List,
    message,
    Modal,
    Row,
    Select,
    Skeleton,
    Statistic,
} from "antd";
import {
    CloseOutlined,
    CoffeeOutlined,
    EditOutlined,
    EyeOutlined,
    LinkOutlined,
    StarOutlined,
    StopOutlined,
} from "@ant-design/icons";
import { getRequest, hostUrl } from "../../services/ajax";
import SnapShot from "./SnapShot";
import { BanUrl, EditUrl, GetUrl, LiftUrl } from "../../services/urlService";

const { Option } = Select;
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
        editing: false,
        editValue: "",
        prefix: "http://",
        editIndex: "",
        listData: [],
        confirmLoading: false,
    };

    async componentDidMount() {
        getRequest("/getStat", this.handleData, {
            params: {
                id: sessionStorage.getItem("user")
                    ? JSON.parse(sessionStorage.getItem("user")).id
                    : null,
            },
            errorCallback: this.handleError,
        });
    }

    handleData = (response) => {
        this.setState({ listData: response.data, loading: false });
        this.state.listData.forEach((short) => {
            let idle = 0;
            short.timeDistr.forEach((time) => {
                //visit less than 2000 is seen as an idle hour
                if (time.value <= 2000) idle++;
            });
            short.idle = idle;
        });
        console.log(JSON.stringify(this.state));
    };
    handleError = (error) => {
        console.log(error);
    };

    handleToggleBan = (item, index) => {
        Modal.confirm({
            content: "确定禁用这条链接吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                this.setState({ editIndex: index });
                BanUrl({
                    url: item.shortUrl,
                    callback: this.handleBan,
                    errorCallback: this.handleError,
                });
            },
        });
    };
    handleToggleLift = (item, index) => {
        Modal.confirm({
            content: "确定解禁这条链接吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                this.setState({ editIndex: index });
                LiftUrl({
                    url: item.shortUrl,
                    callback: this.handleLift,
                    errorCallback: this.handleError,
                });
            },
        });
    };
    handleBan = (response) => {
        console.log(response.data);
        const { editIndex, listData } = this.state;
        if (response.data.status === true) {
            message.success("禁用成功");
            listData[editIndex].longUrl[0].url = "BANNED";
            this.setState({ listData: listData });
        } else message.error("禁用失败，状态码" + response.status);
    };
    handleLift = (response) => {
        console.log(response.data);
        const { editIndex, listData } = this.state;
        if (response.data.status === true) {
            message.success("解禁成功");
            GetUrl({
                url: listData[editIndex].shortUrl,
                callback: (res) => {
                    listData[editIndex].longUrl = res.data.longUrl;
                    this.setState({ listData: listData });
                },
                errorCallback: this.handleError,
            });
        } else message.error("解禁失败，状态码" + response.status);
    };

    handleEdit = (item, index) => {
        if (item.longUrl.length !== 1)
            message.warning("修改链接" + item.shortUrl + "的功能尚未开放");
        else {
            this.setState({ editing: true, editIndex: index });
        }
    };
    render() {
        const { loading, listData, editing, confirmLoading } = this.state;
        const selectBefore = (
            <Select
                defaultValue="http://"
                className="select-before"
                onChange={(value) => {
                    this.setState({ prefix: value });
                }}
            >
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
            </Select>
        );
        return (
            <>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={(item, index) => {
                        let longList = [];
                        if (item.longUrl[0].url !== "BANNED")
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
                                        <SnapShot
                                            value={long.url}
                                            black={false}
                                        />
                                    </Row>
                                );
                            });
                        else
                            longList.push(
                                <IconText
                                    key="banned"
                                    icon={StopOutlined}
                                    text={"该链接已被禁用"}
                                />
                            );
                        return (
                            <List.Item
                                key={item.shortUrl}
                                actions={
                                    !loading && [
                                        <IconText
                                            icon={CloseOutlined}
                                            text={
                                                item.longUrl[0].url === "BANNED"
                                                    ? "解禁"
                                                    : "禁用"
                                            }
                                            key="list-vertical-star-o"
                                            action={
                                                item.longUrl[0].url === "BANNED"
                                                    ? () =>
                                                          this.handleToggleLift(
                                                              item,
                                                              index
                                                          )
                                                    : () =>
                                                          this.handleToggleBan(
                                                              item,
                                                              index
                                                          )
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
                                            action={() =>
                                                this.handleEdit(item, index)
                                            }
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
                                                    precision={3}
                                                    valueStyle={{
                                                        color: "#cccccc",
                                                    }}
                                                    prefix={
                                                        <EyeOutlined
                                                            style={{
                                                                marginLeft:
                                                                    "auto",
                                                            }}
                                                        />
                                                    }
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
                                                href={
                                                    hostUrl +
                                                    "/" +
                                                    item.shortUrl
                                                }
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
                <Modal
                    title="编辑Url"
                    visible={editing}
                    onOk={this.handleOk}
                    okText="提交"
                    cancelText="取消"
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Input
                        addonBefore={selectBefore}
                        placeholder="请输入新Url"
                        prefix={<LinkOutlined />}
                        onChange={(event) => {
                            this.setState({ editValue: event.target.value });
                        }}
                        allowClear
                    />
                </Modal>
            </>
        );
    }
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        const { prefix, editValue, editIndex, listData } = this.state;
        EditUrl({
            url: listData[editIndex].shortUrl,
            newLong: prefix + editValue,
            callback: () => {
                let { listData } = this.state;
                this.setState({
                    editing: false,
                    confirmLoading: false,
                });
                message.success("编辑成功");
                listData[editIndex].longUrl[0].url = prefix + editValue;
                console.log(listData[editIndex]);
                this.setState({ listData: listData });
            },
            errorCallback: this.handleError,
        });
    };

    handleCancel = () => {
        console.log("Clicked cancel button");
        this.setState({
            editing: false,
        });
    };
}
