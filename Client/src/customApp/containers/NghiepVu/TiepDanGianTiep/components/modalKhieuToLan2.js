import Modal from "../../../../../components/uielements/modal";
import {
    ModalBodyWrapper,
    ModalForm,
    ModalTable,
    ModalTableBody,
    ModalTableHeader,
} from "../styled";
import Form from "../../../../../components/uielements/form";
import { Col, Row, message } from "antd";
import {
    Button,
    Input,
} from "../../../../../components/uielements/exportComponent";
import { FilterOutlined } from "@ant-design/icons";
import BoxTable from "../../../../../components/utility/boxTable";
import { useEffect, useState } from "react";
import api from "../config";
import { useDispatch } from "react-redux";
import actions from "../../../../redux/NghiepVu/TiepDanGianTiep/action";

function ModalKiemTraTrungDon({ isModalOpen, onCancel, onOk, data, ...props }) {
    const [danhSachLoaiKhieuToLan2, setDanhSachLoaiKhieuToLan2] = useState([]);
    const [dataFilter, setDataFilter] = useState();

    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const { hoTen, fullAddress } = data;

    const columns = [
        {
            title: "STT",
            key: "STT",
            render: (_, record, index) => index + 1,
            align: "center",
        },
        {
            title: "Số lần giải quyết",
            dataIndex: "LanGQ",
            key: "LanGQ",
            align: "center",
        },
        {
            title: "Cơ quan tiếp nhận",
            dataIndex: "TenCoQuan",
            key: "TenCoQuan",
        },
        {
            title: "Họ và Tên",
            dataIndex: "HoTen",
            key: "HoTen",
        },
        {
            title: "Địa chỉ",
            dataIndex: "DiaChiCT",
            key: "DiaChiCT",
        },
        {
            title: "Nội dung đơn",
            dataIndex: "NoiDungDon",
            key: "NoiDungDon",
        },
        {
            title: "Loại đơn",
            dataIndex: "TenLoaiKhieuTo",
            key: "TenLoaiKhieuTo",
        },
        {
            title: "Thao tác",
            key: "ThaoTac",
            render: (_, record) => (
                <Button onClick={() => handleLoaiKhieuToLan2(record)}>
                    Khiếu tố lần 2
                </Button>
            ),
            align: "center",
        },
    ];

    const handleLoaiKhieuToLan2 = (record) => {
        let { DonThuID, XuLyDonID } = record;
        dispatch(
            actions.setDonThuID({
                DonThuID,
                XuLyDonID,
            })
        );
        onCancel();
    };

    const getListLoaiKhieuToLan2 = async (data) => {
        try {
            let res = await api.DanhSachLoaiKhieuToLan2(data);
            let { Data, Status, Message } = res.data;
            if (Status === 1) {
                setDanhSachLoaiKhieuToLan2(Data);
            } else {
                message.error(Message);
                setDanhSachLoaiKhieuToLan2([]);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleSubmit = (values) => {
        let newValues = Object.entries(values).filter(
            ([name, value]) => value !== undefined && value !== ""
        );
        let dataFilter = {};
        newValues.forEach(([name, value]) => {
            dataFilter[name] = value;
        });

        if (Object.values(values).find((item) => item !== undefined))
            dataFilter = {
                ...dataFilter,
                stateID: 10,
            };
        getListLoaiKhieuToLan2(dataFilter);
    };

    const handleCancel = () => {
        form.resetFields();
        setDanhSachLoaiKhieuToLan2([]);
        onCancel();
    };

    useEffect(() => {
        let filterData = { hoTen: hoTen, diachi: fullAddress, stateID: 10 };
        form.setFieldsValue(filterData);
        if (isModalOpen)
            if (hoTen) {
                getListLoaiKhieuToLan2(filterData);
            } else {
                setDanhSachLoaiKhieuToLan2([]);
            }
    }, [isModalOpen, hoTen]);

    return (
        <Modal
            title="Kiểm tra khiếu tố lần 2"
            open={isModalOpen}
            onCancel={handleCancel}
            onOk={onOk}
            width={1000}
        >
            <ModalBodyWrapper>
                <ModalForm>
                    <Form
                        name="formModalKiemTraKhieuToLan2"
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Row gutter={[24, 0]}>
                            <Col className="gutter-row" span={12}>
                                <Form.Item name="hoTen" label="Họ và Tên">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Form.Item
                                    name="noidungdon"
                                    label="Nội dung đơn"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24, 0]}>
                            <Col className="gutter-row" span={12}>
                                <Form.Item name="cmnd" label="CCCD/CMTND">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Form.Item name="diachi" label="Địa chỉ">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24, 0]}>
                            <Col className="gutter-row align-center" span={24}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<FilterOutlined />}
                                >
                                    Kiểm tra
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalForm>

                <ModalTable>
                    <ModalTableHeader>
                        Tổng số đơn tìm thấy: {danhSachLoaiKhieuToLan2.length}{" "}
                        đơn thư
                    </ModalTableHeader>
                    <ModalTableBody>
                        <BoxTable
                            columns={columns}
                            dataSource={danhSachLoaiKhieuToLan2}
                            rowKey={(record) => record.DonThuID}
                            // pagination={false}
                        />
                    </ModalTableBody>
                </ModalTable>
            </ModalBodyWrapper>
        </Modal>
    );
}

export default ModalKiemTraTrungDon;
