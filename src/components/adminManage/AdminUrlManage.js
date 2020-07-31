import React, { Component } from "react";
import {
    Button,
    Input,
    List,
    message,
    Popconfirm,
    Row,
    Table,
    Tag,
    ConfigProvider,
} from "antd";
import { getAllUrls } from "../../services/adminManageService";
import SnapShot from "../url-manage/SnapShot";
import { RedoOutlined, SearchOutlined, StopOutlined } from "@ant-design/icons";
import { BanUrl, GetUrl, LiftUrl } from "../../services/urlService";
import { hostUrl } from "../../services/ajax";
import zhCN from "antd/es/locale/zh_CN";
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
                if (sessionStorage.getItem("user")) {
                    sessionStorage.removeItem("user");
                }
                message.error("您不是管理员");
                window.location.href = "/login";
                // window.location.href='/404';
                return;
            }
            console.log(res.data);
            this.setState({
                dataSource: res.data,
                rawData: res.data,
            });
        };
        getAllUrls(callback, (error) => {
            import("antd").then(({ message }) => {
                message.error(error.toString());
            });
        });
    }

    getColumnSearchProps = (dataIndex, title) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 ${title}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Button
                    type="primary"
                    onClick={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                    icon={<RedoOutlined />}
                >
                    重置
                </Button>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: "" });
    };
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
                    this.state.dataSource.length >= 1 ? (
                        record.longUrl.length === 0 ? (
                            <Tag color="#3b5999">{record.shortUrl}</Tag>
                        ) : (
                            <Tag
                                color={
                                    record.longUrl[0].url === "BANNED"
                                        ? "#cb0000"
                                        : "#3b5999"
                                }
                            >
                                <a
                                    style={{ color: "white" }}
                                    href={hostUrl + "/" + record.shortUrl}
                                >
                                    {record.shortUrl}
                                </a>
                            </Tag>
                        )
                    ) : null,
                ...this.getColumnSearchProps("shortUrl", "短链接"),
            },
            {
                title: "访问量",
                align: "center",
                dataIndex: "count",
                sorter: {
                    compare: (a, b) => a.count - b.count,
                },
            },
            {
                title: "创建用户",
                align: "center",
                dataIndex: "creatorName",
                ...this.getColumnSearchProps("creatorName", "创建用户"),
            },
            {
                title: "创建日期",
                align: "center",
                dataIndex: "createTime",
                render: (text, record) => {
                    let time =
                        new Date(record.createTime)
                            .toLocaleDateString()
                            .replace(/\//g, "-") +
                        " " +
                        new Date(record.createTime).toTimeString().substr(0, 8);
                    return <span> {time}</span>;
                },
            },
            {
                title: "禁用/启用",
                align: "center",
                filters: [
                    { text: "未禁用", value: "UNBANNED" },
                    { text: "已禁用", value: "BANNED" },
                ],
                onFilter: (value, record) =>
                    value === "BANNED"
                        ? record.longUrl[0].url === value
                        : record.longUrl[0].url !== "BANNED",
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        record.longUrl.length === 0 ||
                        record.longUrl[0].url !== "BANNED" ? (
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
                <ConfigProvider locale={zhCN}>
                    <Table
                        className="components-table-demo-nested"
                        columns={columns}
                        expandable={{
                            expandedRowRender: this.expandedRowRender,
                        }}
                        dataSource={this.state.dataSource}
                        rowKey="shortUrl"
                    />
                </ConfigProvider>
            </div>
        );
    }
}

export default AdminUrlManage;
