import React, { Component } from "react";
import {
    Col,
    Collapse,
    Input,
    List,
    message,
    Modal,
    Row,
    Select,
    Skeleton,
    Statistic,
    Typography
} from "antd";
import {
    CloseOutlined,
    CoffeeOutlined,
    EditOutlined,
    EyeOutlined,
    LinkOutlined,
    StarOutlined,
    StopOutlined
} from "@ant-design/icons";
import { getRequest, hostUrl } from "../../services/ajax";
import SnapShot from "./SnapShot";
import Loading from "../Loading";
import { BanUrl, EditUrl, GetUrl, LiftUrl } from "../../services/urlService";

const { Panel } = Collapse;

const { Option } = Select;
const IconText = ({ icon, text, action }) => (
    <span style={{ color: "white" }} onClick={action}>
        {React.createElement(icon, {
            style: { marginRight: 8, color: "white" }
        })}
        {text}
    </span>
);
export default class UrlManagePanelPageable extends Component {
    state = {
        loading: true,
        editing: false,
        editValue: "",
        prefix: "http://",
        editIndex: "",
        listData: [],
        confirmLoading: false,
        totalNum: null,
        currentPage: 1, // 1 base
        loadedPages: [], // 1 base
        pageSize: 10
    };

    async componentDidMount() {
        const callback = (res) => {
            let total = res.data.totalElements;
            console.log(total);
            this.setState({
                totalNum: total
            });
            let tableData = [];
            for (let i = 0; i < total; i++) {
                //根据总长度对表格数据初始化
                tableData.push({
                    key: i,
                    shortUrl: null,
                    longUrl: [],
                    count: null,
                    areaDistr: [],
                    timeDistr: [],
                    sourceDistr: []
                });
            }
            console.log("看看tableData");
            console.log(tableData);

            let data = res.data.data;
            console.log("看看data");
            console.log(data);
            data.forEach((short) => {
                let idle = 0;
                console.log("!");
                short.timeDistr.forEach((time) => {
                    //visit less than 2000 is seen as an idle hour
                    if (time.value <= 2000) idle++;
                });
                short.idle = idle;
            });
            for (let i = 0; i < data.length; i++) {
                tableData[i].key = i;
                tableData[i].shortUrl = data[i].shortUrl;
                tableData[i].longUrl = data[i].longUrl;
                tableData[i].count = data[i].count;
                tableData[i].areaDistr = data[i].areaDistr;
                tableData[i].timeDistr = data[i].timeDistr;
                tableData[i].sourceDistr = data[i].sourceDistr;
            }

            this.setState({
                listData: tableData,
                loadedPages: this.state.loadedPages.concat(1),
                loading: false
            });
        };
        getRequest("/getStatPageable", callback, {
            params: {
                pageCount: 0,
                pageSize: this.state.pageSize
            },
            errorCallback: this.handleError
        });
    }

    handleError = (error) => {
        import("antd").then(({ message }) => {
            message.error(error.toString());
        });
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
                    errorCallback: this.handleError
                });
            }
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
                    errorCallback: this.handleError
                });
            }
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
                errorCallback: this.handleError
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

    onPageChange(page) {
        console.log(page);
        this.setState({
            currentPage: page
        });
        this.getDevData(page);
    }

    async getDevData(page) {
        let self = this;
        const callback = (res) => {
            console.log(res.data);

            let tableData = this.state.listData;

            let data = res.data.data;

            for (let i = 0; i < data.length; i++) {
                let index = i + (page - 1) * this.state.pageSize;
                tableData[index].key = i;
                tableData[index].shortUrl = data[i].shortUrl;
                tableData[index].longUrl = data[i].longUrl;
                tableData[index].count = data[i].count;
                tableData[index].areaDistr = data[i].areaDistr;
                tableData[index].timeDistr = data[i].timeDistr;
                tableData[index].sourceDistr = data[i].sourceDistr;
            }

            self.setState({
                listData: tableData,
                loadedPages: this.state.loadedPages.concat(page)
            });
            this.state.listData.forEach((short) => {
                let idle = 0;
                short.timeDistr.forEach((time) => {
                    //visit less than 2000 is seen as an idle hour
                    if (time.value <= 2000) idle++;
                });
                short.idle = idle;
            });
        };

        console.log("看看page");
        console.log(this.state.loadedPages);
        if (this.state.loadedPages.indexOf(page) === -1) {
            getRequest("/getStatPageable", callback, {
                params: {
                    pageCount: page - 1,
                    pageSize: this.state.pageSize
                },
                errorCallback: this.handleError
            });
            // getAllUrlsPageable(page-1, this.state.pageSize, callback, (error) => console.log(error));
        }
    }

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
        if (this.state.loading)
            return (
                <Loading
                    style={{
                        height: 200,
                        marginTop: "calc(50vh - 226px)",
                        marginLeft: "calc(50vw - 101.667px"
                    }}
                />
            );
        if (this.state.listData.length === 0)
            return (
                <div
                    style={{
                        marginTop: "10vmin",
                        color: "#ffffff",
                        position: "relative",
                        textAlign: "center"
                    }}
                >
                    <img
                        src={`${hostUrl}/static/box.png`}
                        alt="nodata"
                        style={{
                            width: "30%",
                            marginLeft: "35%",
                            marginRight: "35%",
                            marginBottom: "3vh"
                        }}
                    />
                    你还没有短链接哦~
                    <a href="/create">创建一个</a>
                </div>
            );
        return (
            <div className="manage">

                <List
                    // pagination={pagination}
                    pagination={{
                        pageSize: this.state.pageSize,
                        total: this.state.totalNum,
                        onChange: this.onPageChange.bind(this),
                        current: this.state.currentPage
                        // position: ["bottomCenter"],
                        // size:"small"
                    }}
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={(item, index) => {
                        let longList = [];
                        if (item.longUrl !== null && item.longUrl.length === 0)
                            return null;
                        if (item.longUrl[0].url !== "BANNED")
                            item.longUrl.forEach((long, index) => {
                                longList.push(
                                    <Row key={index} align="middle">
                                        <span
                                            style={{
                                                padding: "7px",
                                                color: "#cccccc"
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
                                key={item.key}
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
                                        />
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
                                                        color: "#cccccc"
                                                    }}
                                                    prefix={
                                                        <EyeOutlined
                                                            style={{
                                                                marginLeft:
                                                                    "auto"
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
                                                        color: "#cccccc"
                                                    }}
                                                    prefix={<CoffeeOutlined/>}
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
                                            <Typography.Text
                                                copyable={{
                                                    tooltips: [
                                                        "复制",
                                                        "复制成功"
                                                    ]
                                                }}
                                                style={{ color: "white" }}
                                            >
                                                {hostUrl + "/" + item.shortUrl}
                                            </Typography.Text>
                                        }
                                    />
                                    <Collapse
                                        ghost
                                        style={{
                                            backgroundColor: "#011428",
                                            color: "white"
                                        }}
                                    >
                                        <Panel header="详情" key="1">
                                            {longList}
                                        </Panel>
                                    </Collapse>
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
                        prefix={<LinkOutlined/>}
                        onChange={(event) => {
                            this.setState({ editValue: event.target.value });
                        }}
                        allowClear
                    />
                </Modal>

            </div>
        );
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true
        });
        const { prefix, editValue, editIndex, listData } = this.state;
        EditUrl({
            url: listData[editIndex].shortUrl,
            newLong: prefix + editValue,
            callback: () => {
                let { listData } = this.state;
                this.setState({
                    editing: false,
                    confirmLoading: false
                });
                message.success("编辑成功");
                listData[editIndex].longUrl[0].url = prefix + editValue;

                console.log(listData[editIndex]);

                this.setState({ listData: listData });
            },
            errorCallback: this.handleError
        });
    };

    handleCancel = () => {
        console.log("Clicked cancel button");

        this.setState({
            editing: false
        });
    };
}
