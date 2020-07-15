import React, { Component } from "react";
import { Button, Input, message, Popconfirm, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {getAllUser} from "../../Services/adminManageService"

class UserTable extends React.Component {


    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "用户名",
                dataIndex: "name",
                width: "5%",
                align: "center",
                ...this.getColumnSearchProps("name")
            },
            {
                title: "访问次数",
                dataIndex: "visit_count",
                width: "5%",
                align: "center",
                ...this.getColumnSearchProps("visit_count")
            },
            {
                title: "用户类型",
                dataIndex: "role",
                width: "5%",
                align: "center",
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <div>
                            {record.userType === 0 ? <Button>管理员</Button> : record.userType===1?<Button>普通用户</Button> :<Button>已禁用用户</Button>}
                        </div>
                    ) : null,
                ...this.getColumnSearchProps("role")
            },
            {
                title: "禁用/启用",
                dataIndex: "role",
                align: "center",
                width: "5%",
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="确认修改?" onConfirm={() => this.handleBan(record)}>
                            {record.isBanned !==2 ? <Button type="primary">禁用</Button> :
                                <Button type="primary">解除</Button>}
                        </Popconfirm>
                    ) : null
            }
        ];
        this.state = {
            dataSource: [],
            rowData: [],
            searchText: "",
            searchedColumn: "",
            visible: false
        };

    }

    componentDidMount() {
        const callback = (data) => {
            this.setState({ dataSource: data, rowData: data });
            // console.log(JSON.stringify(data));
        };

        // getAllUser(callback);

    }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    hide = () => {
        this.setState({
            visible: false
        });
    };
    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    handle = () => {
        const w = window.open("about:blank");
        w.location.href = "/login";
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }}/>,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        }


    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: "" });
    };
    handleBan = row => {
        const dataSource = [...this.state.dataSource];
        //alert(key);
        if (row.isBanned === 1) {
            //说明被禁用了 点按钮要解除禁用
            row.isBanned = 0;
        } else if (row.isBanned === 0) {
            row.isBanned = 1;
        }

        this.handleSave(row);
    };


    handleSave = row => {
        message.config({
            top: 55,
            duration: 5,
            maxCount: 3,
            rtl: true
        });
        if (row.userType === "管理员") {
            row.userType = 1;
        } else if (row.userType === "普通用户") {
            row.userType = 0;
        } else if (row.userType !== 1 && row.userType !== 0) {
            message.error("输入形式错误：请输入 管理员 或 普通用户 ； 或输入 1（代表管理员） 或 0（代表普通用户)");
            return;
        }

        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.userId === item.userId);
        const item = newData[index];

        newData.splice(index, 1, { ...item, ...row });
        const callback = (data) => {
            message.config({
                top: 55,
                duration: 2,
                maxCount: 3,
                rtl: true
            });
            if (data.status > 0) {
                this.setState({
                    dataSource: newData
                });
                // message.success(data.msg)
            } else message.error(data.msg);
        };


    };

    render() {
        return (
            <div>
                <Table
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                />
            </div>
        );
    }
}


class userManage extends Component {

    render() {


        return (
            <div>
                <br/>
                <UserTable/>
            </div>


        );
    }
}

export default userManage;
