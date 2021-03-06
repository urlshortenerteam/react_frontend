import React, { Component } from "react";
import {
    Button,
    Input,
    message,
    Popconfirm,
    Table,
    Tag,
    ConfigProvider,
} from "antd";
import {
    FrownOutlined,
    SearchOutlined,
    SmileOutlined,
    UserAddOutlined,
    RedoOutlined,
} from "@ant-design/icons";
import { banUser, getAllUser } from "../../services/adminManageService";
import zhCN from "antd/es/locale/zh_CN";
import Loading from "../Loading";
import { primaryColor } from "../../css/theme.js";

/**
 * UserTable
 * @author Shuchang Liu
 * @date July 16th 2020
 * @description a table used for user management
 **/
class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            rowData: [],
            searchText: "",
            searchedColumn: "",
            visible: false,
        };
        this.columns = [
            {
                title: "用户名",
                dataIndex: "name",
                width: "5%",
                align: "center",
                ...this.getColumnSearchProps("name", "用户名"),
            },
            {
                title: "访问次数",
                dataIndex: "visitCount",
                width: "5%",
                align: "center",
                sorter: {
                    compare: (a, b) => a.visitCount - b.visitCount,
                },
            },
            {
                title: "用户类型",
                dataIndex: "role",
                width: "5%",
                align: "center",
                filters: [
                    { text: "管理员", value: 0 },
                    { text: "普通用户", value: 1 },
                    { text: "禁用用户", value: 2 },
                ],
                onFilter: (value, record) => record.role === value,
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <div>
                            {record.role === 0 ? (
                                <Tag icon={<UserAddOutlined />} color="#87d068">
                                    管理员
                                </Tag>
                            ) : record.role === 1 ? (
                                <Tag icon={<SmileOutlined />} color="#55acee">
                                    普通用户
                                </Tag>
                            ) : (
                                <Tag icon={<FrownOutlined />} color="#cd201f">
                                    已禁用用户
                                </Tag>
                            )}
                        </div>
                    ) : null,
            },
            {
                title: "禁用/启用",
                dataIndex: "role",
                align: "center",
                width: "5%",
                filters: [
                    { text: "未禁用", value: 1 },
                    { text: "已禁用", value: 2 },
                    { text: "无法禁用", value: 0 },
                ],
                onFilter: (value, record) => record.role === value,
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        record.role === 0 ? (
                            <Button type="primary" disabled>
                                禁用
                            </Button>
                        ) : (
                            <Popconfirm
                                title="确认修改?"
                                okText="确认"
                                cancelText="取消"
                                onConfirm={() => this.handleBan(record)}
                            >
                                {record.role !== 2 ? (
                                    <Button type="primary">禁用</Button>
                                ) : (
                                    <Button type="primary" danger>
                                        解除
                                    </Button>
                                )}
                            </Popconfirm>
                        )
                    ) : null,
            },
        ];
    }

    componentDidMount() {
        const callback = (res) => {
            if (res.not_administrator) {
                if (sessionStorage.getItem("user")) {
                    sessionStorage.removeItem("user");
                }
                window.location.href = "/login";
                message.error("您不是管理员");
                return;
            }

            console.log(res);

            this.setState({
                dataSource: res.data,
                rowData: res.data,
                loading: false,
            });
            // console.log(JSON.stringify(data));
        };

        getAllUser(callback);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handle = () => {
        const w = window.open("about:blank");
        w.location.href = "/login";
    };
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
                style={{ color: filtered ? primaryColor : undefined }}
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
    handleBan = (row) => {
        let ban = false;
        if (row.role === 2) {
            //说明被禁用了 点按钮要解除禁用
            row.role = 1;
            ban = false;
        } else if (row.role === 0) {
            message.error("您不能禁用管理员");
            return;
        } else if (row.role === 1) {
            row.role = 2;
            ban = true;
        }

        this.handleSave(row, ban);
    };

    handleSave = (row, ban) => {
        // console.log(row);
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];

        newData.splice(index, 1, { ...item, ...row });
        const callback = (res) => {
            if (res.not_administrator) {
                message.error("您不是管理员:无法禁用用户");
                return;
            }
            if (res.data.status) {
                this.setState({
                    dataSource: newData,
                });
                message.success("修改成功");
            } else message.error("修改失败");
        };
        banUser(ban, row.id, callback);
    };

    render() {
        if (this.state.loading)
            return (
                <Loading
                    style={{
                        height: 200,
                        marginTop: "calc(50vh - 226px)",
                        marginLeft: "calc(40vw - 101.667px)",
                    }}
                />
            );
        return (
            <div>
                <ConfigProvider locale={zhCN}>
                    <Table
                        pagination={{ position: ["bottomCenter"] }}
                        rowClassName={() => "editable-row"}
                        bordered
                        rowKey="id"
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                    />
                </ConfigProvider>
            </div>
        );
    }
}

/**
 * userManage
 * @author Shuchang Liu
 * @date July 16th 2020
 * @description userManage used in adminManageService
 **/
class userManage extends Component {
    render() {
        return (
            <div>
                <br />
                <UserTable />
            </div>
        );
    }
}

export default userManage;
