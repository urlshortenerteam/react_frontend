import React, { Component } from "react";
import { Button, List, message, Popconfirm, Row, Table, Tag } from "antd";
import { getAllUrls } from "../../Services/adminManageService";
import SnapShot from "../url-manage/SnapShot";
import { StopOutlined } from "@ant-design/icons";
import { BanUrl, GetUrl, LiftUrl } from "../../Services/urlService";

const IconText = ({ icon, text, action }) => (
    <span onClick={action} style={{ marginLeft: 32, color: "red" }}>
        {React.createElement(icon, {
            style: { marginRight: 16 },
        })}
        {text}
    </span>
);
/**
 * AdminUrlManage
 * @author Shuchang Liu
 * @date July 16th 2020
 * @description Admin Url Management
 **/
class AdminUrlManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            rawData: [],
            subTabData: [],
            search: 0,
            editShort: null,
        };
    }

    componentDidMount() {
        const callback = (res) => {
            if (res.not_administrator) {
                message.error("您不是管理员");
                return;
            }
            console.log(res.data);
            this.setState({
                dataSource: res.data,
                rawData: res.data,
            });
        };
        getAllUrls(callback, (error) => {
            console.log(error);
        });
    }

    handleToggleLift = (item) => {
        this.setState({ editShort: item.shortUrl });
        LiftUrl({
            url: item.shortUrl,
            callback: this.handleLift,
            errorCallback: this.handleError,
        });
    };
    handleLift = (response) => {
        console.log(response.data);
        let listData = this.state.dataSource;
        if (response.data.status === true) {
            message.success("解禁成功");
            let index = listData.findIndex((item) => {
                return item.shortUrl === this.state.editShort;
            });
            GetUrl({
                url: this.state.editShort,
                callback: (res) => {
                    listData[index].longUrl = res.data.longUrl;
                    this.setState({ dataSource: listData });
                },
                errorCallback: this.handleError,
            });
        } else message.error("解禁失败，状态码" + response.status);
    };

    handleToggleBan = (item) => {
        this.setState({ editShort: item.shortUrl });
        BanUrl({
            url: item.shortUrl,
            callback: this.handleBan,
            errorCallback: this.handleError,
        });
    };
    handleError = (error) => {
        message.error(error);
    };
    handleBan = (response) => {
        console.log(response.data);
        let listData = this.state.dataSource;
        if (response.data.status === true) {
            message.success("禁用成功");
            let index = listData.findIndex(
                (item) => item.shortUrl === this.state.editShort
            );
            listData[index].longUrl[0].url = "BANNED";
            this.setState({ dataSource: listData });
        } else message.error("禁用失败，状态码" + response.status);
    };
    expandedRowRender = (record) => {
        let banned = record.longUrl[0].url === "BANNED";

        return banned ? (
            <IconText
                key="banned"
                icon={StopOutlined}
                text={"该链接已被禁用"}
            />
        ) : (
            <List
                size="small"
                bordered
                dataSource={record.longUrl}
                renderItem={(item) => {
                    return (
                        <List.Item>
                            <Row align="middle">
                                <SnapShot value={item.url} black={true} />
                                <span
                                    style={{
                                        marginLeft: 20,
                                        marginBottom: 4,
                                    }}
                                >
                                    {item.url}
                                </span>
                            </Row>
                        </List.Item>
                    );
                }}
            />
        );
    };

    render() {
        const columns = [
            {
                title: "短链接",
                align: "center",
                dataIndex: "shortUrl",
                render: (text, record) =>
                    this.state.dataSource.length >= 1? (
                        record.longUrl.length===0 ||record.longUrl[0].url === "BANNED" ? (
                            <Tag color="#cb0000">{record.shortUrl}</Tag>
                        ) : (
                            <Tag color="#3b5999">
                                <a
                                    href={record.longUrl[0].url}
                                    style={{ color: "white" }}
                                >
                                    {record.shortUrl}
                                </a>
                            </Tag>
                        )
                    ) : null,
            },
            { title: "访问量", align: "center", dataIndex: "count" },
            { title: "创建用户", align: "center", dataIndex: "creatorName" },
            { title: "创建日期", align: "center", dataIndex: "createTime" },
            {
                title: "禁用/启用",
                align: "center",
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        record.longUrl.length===0||record.longUrl[0].url !== "BANNED" ? (
                            <Popconfirm
                                title="确认禁用?"
                                okText="确认"
                                cancelText="取消"
                                onConfirm={() => this.handleToggleBan(record)}
                            >
                                <Button type="primary">禁用</Button>
                            </Popconfirm>
                        ) : (
                            <Popconfirm
                                title="确认启用?"
                                okText="确认"
                                cancelText="取消"
                                onConfirm={() => this.handleToggleLift(record)}
                            >
                                <Button type="primary" danger>
                                    启用
                                </Button>
                            </Popconfirm>
                        )
                    ) : null,
            },
        ];

        return (
            <div>
                <br />
                <Table
                    className="components-table-demo-nested"
                    columns={columns}
                    expandable={{
                        expandedRowRender: this.expandedRowRender,
                    }}
                    dataSource={this.state.dataSource}
                    rowKey="shortUrl"
                />
            </div>
        );
    }
}

export default AdminUrlManage;
