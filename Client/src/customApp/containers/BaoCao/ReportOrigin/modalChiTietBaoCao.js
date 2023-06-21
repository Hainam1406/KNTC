import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined, PrinterOutlined, ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import Constants from "../../../../settings/constants";
import { Form, Radio, Row, Col, Image, Tooltip, Popconfirm, Space, Upload, Divider, Input, DatePicker, Card, Table, Collapse, Steps, Layout, Avatar } from "antd";
import Wrapper from "./ModalDetailsReport.styled"
import { ColCustom } from "./table.styled"
import { But, FormCol, DateP, InputWrapper } from "./ModalDetailsReport.styled"
import anh from './img/u3965.png'


import {
    Button,
    Modal,
    // Input,
    Select,
    Option,
    // Textarea,
    // DatePicker,
    // ItemForm as Item
} from "../../../../components/uielements/exportComponent";
import Item from "antd/es/list/Item";

const { useForm } = Form;
const { TextArea } = Input;
const onChange1 = (date, dateString) => {
    console.log(date, dateString);
};

const { Panel } = Collapse;



export default (props) => {
    const [form] = useForm();
    const [isFormSuccess, setIsFormSuccess] = useState(true);
    const [isViewDetails, setIsViewDetails] = useState(false)

    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    const description = 'Nếu có nội dung.';

    const style = {
        background: '#0092ff',
        padding: '8px 0',
    };

    // const item = [
    //     {
    //         id:1,
    //         // index: 1,
    //         ten: 'TuanGidiva',
    //         ThoiGianThucHien: '20-02-2001',
    //         NguoiCapNhat:'Ngo Anh Long',
    //         ThaoTac:'Chuyen vien ban',
    //         YKienCanBoThucHien:'Khong co y kien gi'
    //     }
    // ]


    return (
        <Modal
            title={`Chi tiết thông tin đơn thư`}
            width={1800}
            visible={true}
            onCancel={props.onCancel}
            footer={[

                <>
                    <Button type="primary" ><PrinterOutlined />
                        In
                    </Button>
                    <Button type="primary" > <EditOutlined />
                        Sửa
                    </Button>
                    <Button type="" style={{ background: 'red', color: '#fff' }}><DeleteOutlined />
                        Xóa
                    </Button>
                    <Button type="" style={{ background: '#f0952c', color: '#fff' }}><ArrowLeftOutlined />
                        Trở về
                    </Button>
                </>

            ]}
        >
            <Wrapper>
                <Form
                    form={form}
                    name={"formhuonggiaiquyet"}
                    initialValues={{
                        TrangThai: 1,
                    }}
                >
                    <Collapse defaultActiveKey={['1']} ghost >
                        <Panel header="Thông tin đơn thư " key="1" color="red">
                            <>
                                <Row gutter={15}>
                                    <Col lg={6} md={12}>
                                        <Space.Compact
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <But type="primary">Số đơn thư</But>
                                            <Input defaultValue="Combine input and button" />
                                        </Space.Compact>
                                    </Col>
                                    <Col lg={5} md={12}>
                                        <Space.Compact
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <But type="primary">Ngày tiếp nhận</But>
                                            <Input defaultValue="Combine input and button" />
                                        </Space.Compact>
                                    </Col>
                                    <Col lg={5} md={12}>
                                        <Space.Compact
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <But type="primary">Họ và tên </But>
                                            <Input defaultValue="Combine input and button" />
                                        </Space.Compact>
                                    </Col>
                                    <Col lg={8} md={12}>
                                        <Space.Compact
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <But type="primary">Địa chỉ</But>
                                            <Input defaultValue="Combine input and button" />
                                        </Space.Compact>
                                    </Col>
                                </Row>
                                <Row gutter={25} >
                                    <Col span={24}>
                                        <Space.Compact
                                            style={{
                                                width: '100%',
                                                marginTop: '20px'
                                            }}
                                        >
                                            <But type="primary">Loại khiếu tố </But>
                                            <Input defaultValue="Combine input and button" />
                                        </Space.Compact>
                                    </Col>
                                    <Col span={24}>
                                        <Space.Compact
                                            style={{
                                                width: '100%',
                                                marginTop: '20px'
                                            }}
                                        >
                                            <But type="primary">Nội dung đơn  </But>
                                            <Input defaultValue="Combine input and button" />
                                            {/* <Input.TextArea /> */}

                                        </Space.Compact>
                                    </Col>
                                </Row>
                                <Row gutter={25} >
                                    <Col span={12}>
                                        <Space.Compact
                                            style={{
                                                width: '100%',
                                                marginTop: '20px'
                                            }}
                                        >
                                            <But type="primary">Hạn xử lý :</But>
                                            {/* <Input defaultValue="Combine input and button" /> */}
                                            <DatePicker style={{ width: '100%' }} />
                                        </Space.Compact>
                                    </Col>
                                    <Col span={12}>
                                        <Space.Compact
                                            style={{
                                                width: '100%',
                                                marginTop: '20px'
                                            }}
                                        >
                                            <But type="primary">Trạng thái sử lý </But>
                                            <Input defaultValue="Combine input and button" />
                                        </Space.Compact>
                                    </Col>
                                </Row>
                                <Row gutter={25} >
                                    <Col span={12}>
                                        <Space.Compact
                                            style={{
                                                width: '100%',
                                                marginTop: '20px'
                                            }}
                                        >
                                            <But type="primary">Hạn giải quyết </But>
                                            {/* <Input defaultValue="Combine input and button" /> */}
                                            <DatePicker style={{ width: '100%' }} />
                                        </Space.Compact>
                                    </Col>
                                    <Col span={12}>
                                        <Space.Compact
                                            style={{
                                                width: '100%',
                                                marginTop: '20px'
                                            }}
                                        >
                                            <But type="primary">Trạng thái giải quyết </But>
                                            <Input defaultValue="Combine input and button" />
                                        </Space.Compact>
                                    </Col>
                                </Row>
                                {/* <Form.Item name={['user', 'introduction']} label="Introduction" style={{ background: 'red' }}>
                        <Input.TextArea />
                    </Form.Item> */}
                            </>
                            <Divider style={{ color: 'red' }} onClick={() => setIsViewDetails(true)} orientation="lef">Xem chi tiết</Divider>
                            {/* <p style={{ marginTop: '30px', color: 'red' }} contentsub="123" position="top-left" type="second" onClick={() => setIsViewDetails(true)}>Xem chi tiết</p> */}
                            {
                                isViewDetails ? <div className="wrapper">
                                    <>
                                        <p className="wrapper-title">1.Thông tin chung</p>
                                        <Row gutter={15} style={{ marginTop: '20px' }}>
                                            <Col lg={6} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Nguồn đơn đến :</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={5} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Cán bộ tiếp dân :</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={5} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Số đơn </But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Ngày tiếp nhận :</But>
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Space.Compact>
                                            </Col>
                                        </Row>
                                        <Row gutter={25} >
                                            <Col span={24}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                        marginTop: '20px'
                                                    }}
                                                >
                                                    <But type="primary">Đối tượng khiếu tố  </But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                        </Row>
                                        <Row gutter={15} style={{ marginTop: '20px' }}>
                                            <Col lg={6} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',

                                                    }}
                                                >
                                                    <But type="primary">Họ và tên :</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={3} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Giới tính</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={3} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Dân tộc </But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={12} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Địa chỉ</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                        </Row>
                                        <Row gutter={25} style={{ marginTop: '20px' }}>
                                            <Col span={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary"> Loại khiếu tố:</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col span={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary"> Nơi phát sinh </But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col span={24}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                        marginTop: '20px'
                                                    }}
                                                >
                                                    <But type="primary">Nội dung đơn  </But>
                                                    <Input defaultValue="Combine input and button" />
                                                    {/* <Input.TextArea /> */}
                                                </Space.Compact>
                                            </Col>
                                        </Row>
                                    </>
                                    <p className="wrapper-title">2.Thông tin xử lý</p>
                                    <>
                                        <Row gutter={15} style={{ marginTop: '20px' }}>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Ngày phân công :</But>
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Hạn xử lý :</But>
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12} >
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Cơ quan xử lý :</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                        </Row>
                                        <Row gutter={15} style={{ marginTop: '20px' }}>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Cán bộ xử lý :</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Ngày xử lý :</But>
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12} >
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Hướng xử lý :</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                        </Row>
                                    </>
                                    <p className="wrapper-title">3.Thông tin giải quyết</p>
                                    <>
                                        <Row gutter={15} style={{ marginTop: '20px' }}>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Cơ quan giao :</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Thanh tra tỉnh :</But>
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12} >
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Hướng xử lý :</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                        </Row>
                                        <Row gutter={15} style={{ marginTop: '20px' }}>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Cơ quan phối hợp:</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Hạn giải quyết  :</But>
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12} >
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Trạng thái :</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                        </Row>
                                    </>
                                    <p className="wrapper-title">Thông tin tổ xác minh </p>
                                    <>
                                        <Row gutter={15} style={{ marginTop: '20px' }}>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Cán bộ phụ trách</But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12}>
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Cán bộ phối hợp</But>
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Space.Compact>
                                            </Col>
                                            <Col lg={8} md={12} >
                                                <Space.Compact
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <But type="primary">Cán bộ theo dõi </But>
                                                    <Input defaultValue="Combine input and button" />
                                                </Space.Compact>
                                            </Col>
                                        </Row>
                                    </>
                                    <Divider style={{ color: 'red' }} onClick={() => setIsFormSuccess(false)} orientation="lef">Ẩn chi tiết</Divider>

                                </div> : null
                            }
                        </Panel>
                        <Panel header="Thông tin đơn thư" key="2">
                            <Collapse defaultActiveKey={['4']} ghost>
                                <Panel style={{ backgroundColor: '#ECECEC' }} header="Hồ sơ, tài liệu chính" key="3" >
                                    <>
                                        <Row justify="space-around">
                                            <ColCustom span={7} >
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Don thu"
                                                                style={{
                                                                    width: '90%',
                                                                }}
                                                                // onChange={handleChange}
                                                                options={[
                                                                    {
                                                                        value: '1',
                                                                        label: 'donthu1',
                                                                    },
                                                                    {
                                                                        value: '2',
                                                                        label: 'donthu2',
                                                                    },
                                                                    {
                                                                        value: '3',
                                                                        label: 'donthu3',
                                                                    },
                                                                    {
                                                                        value: 'disabled',
                                                                        label: 'Disabled',
                                                                        disabled: true,
                                                                    },
                                                                ]}
                                                            />

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <SaveOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                            <ColCustom span={7} >
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Don thu"
                                                                style={{
                                                                    width: '90%',
                                                                }}
                                                                // onChange={handleChange}
                                                                options={[
                                                                    {
                                                                        value: '1',
                                                                        label: 'donthu1',
                                                                    },
                                                                    {
                                                                        value: '2',
                                                                        label: 'donthu2',
                                                                    },
                                                                    {
                                                                        value: '3',
                                                                        label: 'donthu3',
                                                                    },
                                                                    {
                                                                        value: 'disabled',
                                                                        label: 'Disabled',
                                                                        disabled: true,
                                                                    },
                                                                ]}
                                                            />

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <SaveOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                            <ColCustom span={7} >
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Đơn thư "
                                                                style={{
                                                                    width: '90%',
                                                                    borderRadius: 7,
                                                                }}>
                                                                <Option value="one">Đơn thư 2</Option>
                                                                <Option value="tow">Don thu 3</Option>
                                                            </Select>

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <EditOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                        </Row>

                                        <Row style={{ margin: '20px 0 20px' }} justify="space-around">
                                            <ColCustom span={7} >
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Đơn thư "
                                                                style={{
                                                                    width: '90%',
                                                                    borderRadius: 7,
                                                                }}>
                                                                <Option value="one">Đơn thư 2</Option>
                                                                <Option value="tow">Don thu 3</Option>
                                                            </Select>

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <EditOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                            <ColCustom span={7}>
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Đơn thư "
                                                                style={{
                                                                    width: '90%',
                                                                    borderRadius: 7,
                                                                }}>
                                                                <Option value="one">Đơn thư 2</Option>
                                                                <Option value="tow">Don thu 3</Option>
                                                            </Select>

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <EditOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                            <ColCustom span={7}>
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Đơn thư "
                                                                style={{
                                                                    width: '90%',
                                                                    borderRadius: 7,
                                                                }}>
                                                                <Option value="one">Đơn thư 2</Option>
                                                                <Option value="tow">Don thu 3</Option>
                                                            </Select>

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <EditOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                        </Row>
                                    </>
                                </Panel>
                            </Collapse>


                            <Collapse defaultActiveKey={['5']} ghost>
                                <Panel header="Hồ sơ, tài liệu liên quan" key="4">
                                    <>
                                        <Row style={{ margin: '20px 0 20px' }} justify="space-around">
                                            <ColCustom span={7} style={{ background: '#ECECEC' }}>
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Đơn thư "
                                                                style={{
                                                                    width: '90%',
                                                                    borderRadius: 7,
                                                                }}>
                                                                <Option value="one">Đơn thư 2</Option>
                                                                <Option value="tow">Don thu 3</Option>
                                                            </Select>

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <SaveOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                            <ColCustom span={7} style={{ background: '#ECECEC' }}>
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Đơn thư "
                                                                style={{
                                                                    width: '90%',
                                                                    borderRadius: 7,
                                                                }}>
                                                                <Option value="one">Đơn thư 2</Option>
                                                                <Option value="tow">Don thu 3</Option>
                                                            </Select>

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <EditOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                            <ColCustom span={7} style={{ background: '#ECECEC' }}>
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Đơn thư "
                                                                style={{
                                                                    width: '90%',
                                                                    borderRadius: 7,
                                                                }}>
                                                                <Option value="one">Đơn thư 2</Option>
                                                                <Option value="tow">Don thu 3</Option>
                                                            </Select>

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <EditOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                        </Row>

                                        <Row style={{ margin: '20px 0 20px' }} justify="space-around">
                                            <ColCustom span={7} style={{ background: '#ECECEC' }}>
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Đơn thư "
                                                                style={{
                                                                    width: '90%',
                                                                    borderRadius: 7,
                                                                }}>
                                                                <Option value="one">Đơn thư 2</Option>
                                                                <Option value="tow">Don thu 3</Option>
                                                            </Select>

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <EditOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                            <ColCustom span={7} style={{ background: '#ECECEC' }}>
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Đơn thư "
                                                                style={{
                                                                    width: '90%',
                                                                    borderRadius: 7,
                                                                }}>
                                                                <Option value="one">Đơn thư 2</Option>
                                                                <Option value="tow">Don thu 3</Option>
                                                            </Select>

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <EditOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                            <ColCustom span={7} style={{ background: '#ECECEC' }}>
                                                <div className="file-items">
                                                    <div className="file-items__image">
                                                        <img
                                                            width={90}
                                                            src={anh}
                                                        />
                                                    </div>
                                                    <div className="file-items__info">
                                                        <div className="file-items__type">
                                                            <Select
                                                                defaultValue="Đơn thư "
                                                                style={{
                                                                    width: '90%',
                                                                    borderRadius: 7,
                                                                }}>
                                                                <Option value="one">Đơn thư 2</Option>
                                                                <Option value="tow">Don thu 3</Option>
                                                            </Select>

                                                            <div className="file-items__ion">
                                                                <Tooltip title={"Luu"}>
                                                                    <EditOutlined style={{ fontSize: 30 }} onClick={() => showModalEdit(record.DanTocID)} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="file-items__desc">
                                                            {/* <p>{item?.ThongTin}</p> */}
                                                            <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân tỉnh ) 13/03/2023</p>
                                                            <p>File hồ sơ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ColCustom>
                                        </Row>
                                    </>
                                </Panel>
                            </Collapse>

                        </Panel>

                        <Panel header="Tiến trình xử lý" key="5">

                            <div className="wrapper-progress">
                                <div className="progress-item">
                                    <div className="progress-circle">
                                        <Avatar size={40}
                                            style={{ backgroundColor: '#177bea', color: 'white' }}>
                                            1
                                        </Avatar>
                                    </div>
                                    <div className="progress-title">
                                        <p> Chuyên viên tiếp nhận </p>
                                    </div>
                                    <div className="progress-time">
                                        <p>Thời gian thực hiện</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>12/02/2001</p>
                                    </div>
                                    <div className="progress-user__update">
                                        <p>Người cập nhật</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Vũ Thị An(Ban tiếp công dân tỉnh )</p>
                                    </div>
                                    <div className="progress-action">
                                        <p>Thao tác</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>Chuyên viên tiếp nhận trình kết quả xử lý lên LD</p>
                                    </div>
                                    <div className="progress-opinion">
                                        <p>Ý kiến của cán bộ thực hiện</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Nội dung ý kiến của cán bộ thực hiện </p>
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <div className="progress-circle">
                                        <Avatar size={40}
                                            style={{ backgroundColor: '#177bea', color: 'white' }}>
                                            2
                                        </Avatar>
                                    </div>
                                    <div className="progress-title">
                                        <p> Lãnh đạo duyệt xử lý</p>
                                    </div>
                                    <div className="progress-time">
                                        <p>Thời gian thực hiện</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>12/02/2001</p>
                                    </div>
                                    <div className="progress-user__update">
                                        <p>Người cập nhật</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Vũ Thị An(Ban tiếp công dân tỉnh )</p>
                                    </div>
                                    <div className="progress-action">
                                        <p>Thao tác</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>Duyệt kết quả xử lý LD</p>
                                    </div>
                                    <div className="progress-opinion">
                                        <p>Ý kiến của cán bộ thực hiện</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Nội dung ý kiến của cán bộ thực hiện </p>
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <div className="progress-circle">
                                        <Avatar size={40}
                                            style={{ backgroundColor: '#177bea', color: 'white' }}>
                                            3
                                        </Avatar>
                                    </div>
                                    <div className="progress-title">
                                        <p> Lãnh đaoh phân giải quyết </p>
                                    </div>
                                    <div className="progress-time">
                                        <p>Thời gian thực hiện</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>12/02/2001</p>
                                    </div>
                                    <div className="progress-user__update">
                                        <p>Người cập nhật</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Vũ Thị An(Ban tiếp công dân tỉnh )</p>
                                    </div>
                                    <div className="progress-action">
                                        <p>Thao tác</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>Lãnh đạo cơ quan cấp trên phân giải quyết cho cơ quan cấp dưới </p>
                                    </div>
                                    <div className="progress-opinion">
                                        <p>Ý kiến của cán bộ thực hiện</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Nội dung ý kiến của cán bộ thực hiện </p>
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <div className="progress-circle">
                                        <Avatar size={40}
                                            style={{ backgroundColor: '#177bea', color: 'white' }}>
                                            4
                                        </Avatar>
                                    </div>
                                    <div className="progress-title">
                                        <p> Lãnh đạo cơ quan cấp dưới phân giải quyết </p>
                                    </div>
                                    <div className="progress-time">
                                        <p>Thời gian thực hiện</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>12/02/2001</p>
                                    </div>
                                    <div className="progress-user__update">
                                        <p>Người cập nhật</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Vũ Thị An(Ban tiếp công dân tỉnh )</p>
                                    </div>
                                    <div className="progress-action">
                                        <p>Thao tác</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>Lãnh đạo cấp dưới phân phó chánh thanh tra hoặc trưởng phòng giải quyết</p>
                                    </div>
                                    <div className="progress-opinion">
                                        <p>Ý kiến của cán bộ thực hiện</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Nội dung ý kiến của cán bộ thực hiện </p>
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <div className="progress-circle">
                                        <Avatar size={40}
                                            style={{ backgroundColor: '#177bea', color: 'white' }}>
                                            5
                                        </Avatar>
                                    </div>
                                    <div className="progress-title">
                                        <p> Phó chánh thanh tra hoặc lãnh đạo phòng phân giải quyết </p>
                                    </div>
                                    <div className="progress-time">
                                        <p>Thời gian thực hiện</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>12/02/2001</p>
                                    </div>
                                    <div className="progress-user__update">
                                        <p>Người cập nhật</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Vũ Thị An(Ban tiếp công dân tỉnh )</p>
                                    </div>
                                    <div className="progress-action">
                                        <p>Thao tác</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>Phó chánh thanh tra hoặc trưởng phòng phân trưởng đoàn giải quyết</p>
                                    </div>
                                    <div className="progress-opinion">
                                        <p>Ý kiến của cán bộ thực hiện</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Nội dung ý kiến của cán bộ thực hiện </p>
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <div className="progress-circle">
                                        <Avatar size={40}
                                            style={{ backgroundColor: '#177bea', color: 'white' }}>
                                            6
                                        </Avatar>
                                    </div>
                                    <div className="progress-title">
                                        <p>Trưởng đoàn giải quyết </p>
                                    </div>
                                    <div className="progress-time">
                                        <p>Thời gian thực hiện</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>12/02/2001</p>
                                    </div>
                                    <div className="progress-user__update">
                                        <p>Người cập nhật</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Vũ Thị An(Ban tiếp công dân tỉnh )</p>
                                    </div>
                                    <div className="progress-action">
                                        <p>Thao tác</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>Trưởng đoàn trình kết quả giải quyết lên phó chánh thanh tra hoặc trưởng phòng</p>
                                    </div>
                                    <div className="progress-opinion">
                                        <p>Ý kiến của cán bộ thực hiện</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Nội dung ý kiến của cán bộ thực hiện </p>
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <div className="progress-circle">
                                        <Avatar size={40}
                                            style={{ backgroundColor: '#177bea', color: 'white' }}>
                                            7
                                        </Avatar>
                                    </div>
                                    <div className="progress-title">
                                        <p> Phó chánh thanh tra hoặc lãnh đạo phòng duyệt được giải quyết </p>
                                    </div>
                                    <div className="progress-time">
                                        <p>Thời gian thực hiện</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>12/02/2001</p>
                                    </div>
                                    <div className="progress-user__update">
                                        <p>Người cập nhật</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Vũ Thị An(Ban tiếp công dân tỉnh )</p>
                                    </div>
                                    <div className="progress-action">
                                        <p>Thao tác</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>Phó chánh thanh tra hoặc trưởng phòng trình kết qủa giải quyết lên lãnh đạo cấp dưới</p>
                                    </div>
                                    <div className="progress-opinion">
                                        <p>Ý kiến của cán bộ thực hiện</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Nội dung ý kiến của cán bộ thực hiện </p>
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <div className="progress-circle">
                                        <Avatar size={40}
                                            style={{ backgroundColor: '#177bea', color: 'white' }}>
                                            8
                                        </Avatar>
                                    </div>
                                    <div className="progress-title">
                                        <p>Lãnh đạo cấp dưới duyệt giải quyết </p>
                                    </div>
                                    <div className="progress-time">
                                        <p>Thời gian thực hiện</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>12/02/2001</p>
                                    </div>
                                    <div className="progress-user__update">
                                        <p>Người cập nhật</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Vũ Thị An(Ban tiếp công dân tỉnh )</p>
                                    </div>
                                    <div className="progress-action">
                                        <p>Thao tác</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>Lãnh đạo cấp dưới trình kết quả giải quyết lên lãnh đạo cấp trên</p>
                                    </div>
                                    <div className="progress-opinion">
                                        <p>Ý kiến của cán bộ thực hiện</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Nội dung ý kiến của cán bộ thực hiện </p>
                                    </div>
                                </div>
                                <div className="progress-item">
                                    <div className="progress-circle">
                                        <Avatar size={40}
                                            style={{ backgroundColor: '#177bea', color: 'white' }}>
                                            9
                                        </Avatar>
                                    </div>
                                    <div className="progress-title">
                                        <p> Lãnh đạo duyệt giải quyết</p>
                                    </div>
                                    <div className="progress-time">
                                        <p>Thời gian thực hiện</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>12/02/2001</p>
                                    </div>
                                    <div className="progress-user__update">
                                        <p>Người cập nhật</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Vũ Thị An(Ban tiếp công dân tỉnh )</p>
                                    </div>
                                    <div className="progress-action">
                                        <p>Thao tác</p>
                                        <p style={{ background: '#ff9800', color: 'white', borderRadius: '5px' }}>Duyệt kết quả giải quyết</p>
                                    </div>
                                    <div className="progress-opinion">
                                        <p>Ý kiến của cán bộ thực hiện</p>
                                        <p style={{ background: '#177bea', color: 'white', borderRadius: '5px' }}>Nội dung ý kiến của cán bộ thực hiện </p>
                                    </div>
                                </div>
                            </div>

                        </Panel>
                    </Collapse>
                </Form>
            </Wrapper>
        </Modal>
    );
};




