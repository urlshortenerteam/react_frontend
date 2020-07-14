import React, {useContext, useEffect, useRef, useState,} from "react";

import {Button, Col, Divider, Form, Input, message, Popconfirm, Row, Table, Tooltip,} from "antd";
import "../../css/HomeCss.css";
import "../../css/CreateCss.css";
import {getBatchOneToOne} from "../../Services/CreateService";

const EditableContext = React.createContext();

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: string;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async (e) => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} 需填入`,
                    },
                ]}
            >
                <Input
                    ref={inputRef}
                    onPressEnter={save}
                    onBlur={save}
                />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

/*
OneToOneTable
@author Shuchang Liu
@date July 10th 2020
@description OneToOneTable used in CreateView.js
*/
export default class OneToOneTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "长链接",
                dataIndex: "long",
                editable: true,
                align: "center",
                colSpan: 2,
                ellipsis: {
                    showTitle: false,
                },
                width: "60%",
                render: (long) => (
                    <Tooltip placement="topLeft" title={long}>
                        {long}
                    </Tooltip>
                ),
            },
            {
                title: "删除",
                dataIndex: "operation",
                align: "center",
                width: "10%",
                colSpan: 0,
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm
                            title="确定删除此长链接？"
                            onConfirm={() => this.handleDelete(record.key)}
                        >
                            {!this.state.created ? (
                                <Button type="primary">删除</Button>
                            ) : (
                                <Button type="primary" disabled>
                                    删除
                                </Button>
                            )}
                        </Popconfirm>
                    ) : null,
            },
            {
                title: "短链接",
                dataIndex: "short",
                align: "center",
                width: "30%",
                render: short => (
                    <Tooltip placement="topLeft" title={short}>
                        {short}
                    </Tooltip>
                ),
            },
        ];

        this.state = {
            dataSource: [
                {
                    key: 1,
                    long: "请输入长链接,可输入多个，以空格切分",
                    short: "",
                },
            ],
            count: 1,
            created: false,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
        console.log(this.state.dataSource);
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: this.state.count + 1,
            long: "以http://或https://开头",

            short: " ",
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: this.state.count + 1,
        });
        console.log(this.state.dataSource);
    };

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);

        // partition long urls
        let urlArray = row.long.split(/\s+/);
        let newRow = [];

        //check the format
        let flag = true;
        urlArray.forEach((item, index) => {
            newRow.push({
                key: index + this.state.count,
                long: item,
                short: "",
            });
            if (!item) {
                urlArray.splice(index, 1); //删除空项
            }
            //check indexOf http:// 或https://
            else {
                if (
                    item.indexOf("https://") !== 0 &&
                    item.indexOf("http://") !== 0
                ) {
                    flag = false;
                }
            }
        });
        this.setState({
            count: this.state.count + urlArray.length - 1,
        });
        if (!flag) {
            message.error("长链接格式错误，请以http://或https://开头");
        }

        newData.splice(index, 1, ...newRow);

        this.setState({ dataSource: newData });
    };

    reset = () => {
        this.setState({
            dataSource: [
                {
                    key: 0,
                    long: "请输入长链接，可输入多个，以空格切分",
                    short: "",
                },
            ],
            count: 1,
            created: false,
        });
    };
    oneToOne = () => {
        let urlArray = this.state.dataSource;
        let req = [];
        //check the format
        let flag = true;
        let messages = "第";
        urlArray.forEach((item, index) => {
            if (!item) {
                urlArray.splice(index, 1); //删除空项
            }
            //检查是否为 http:// 或https://
            else {
                if (
                    item.long.indexOf("https://") !== 0 &&
                    item.long.indexOf("http://") !== 0
                ) {
                    flag = false;
                    messages += index + 1;
                    messages += "、";
                }
                req.push(item.long);
            }
        });

        if (urlArray.length === 0) {
            message.error("输入不能为空");
            return;
        }

        //格式不正确则打印错误
        if (!flag) {
            messages = messages.substr(0, messages.length - 1);
            message.error(messages + "条长链接格式不正确");
        }

        //将数据发给后端
        const callBack = (res) => {
            console.log(res.data);
            let result = [];
            let shorts=res.data;
            urlArray.forEach(function (item, index) {
                result.push({
                    long: urlArray[index].long,
                    short: shorts[index],
                });
            });
            this.setState({
                dataSource: result,
                created: true,
            });
            console.log(result);
        };

        // 格式正确则将数据发回后端
        if (flag) {
            getBatchOneToOne(req, callBack);
        }
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ position: ['bottomCenter'] }}
                    footer={() =>
                        <Row>
                            <Col span={8}></Col>
                            <Col span={2} offset={1}>
                                {!this.state.created ?
                                    <Button
                            onClick={this.handleAdd}
                            type="primary"
                            style={{ marginBottom: 16 }}
                        >
                                        添加
                                    </Button>:
                                    <Button type="primary" disabled>添加</Button>
                                }

                    </Col>
                    <Col span={2}>
                        {!this.state.created ?
                            <Button type="primary" onClick={this.oneToOne}>
                                生成
                            </Button> :
                            <Button type="primary" disabled>生成</Button>
                        }
                    </Col>
                    <Col span={1}>
                        <Button type="primary" onClick={this.reset}>
                            重置
                        </Button>
                    </Col>
                    <Col span={9} offset={1}>
                        <Divider  dashed />
                    </Col>
                </Row>}
                />

                <br/>
                <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ position: ['bottomCenter'] }}
                />

            </div>
        );
    }
}
