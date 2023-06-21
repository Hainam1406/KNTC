import React from "react";
import Modal from "../../../../components/uielements/modal";
import Form from "../../../../components/uielements/form";
import Collapse from "../../../../components/uielements/collapse";
import Box from "../../../../components/utility/box";
import {
    UploadOutlined,
    DownloadOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import {
    Input,
    Selectv4,
    DatePicker,
    Button,
    Select,
    Option,
    TreeSelect,
} from "../../../../components/uielements/exportComponent";

import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
import { useEffect, useState } from "react";
import { InputFormatSpecific } from "../../../../components/uielements/exportComponent";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";
import Inputnumber from "../../../../components/uielements/InputNumber";
import TableCustom from "../../../../components/uielements/table";
import { Avatar, Card, Col, InputNumber, Row, Divider, Upload, Tooltip, message } from "antd";
// import { NoneBorder, PaddingCardChiTietDonThu } from "./styled";
import ChiTietDonThu from "../SoTiepDanTrucTiep/modalChiTiet"
import BoxTable from "../../../../components/utility/boxTable";
import AddHoSo from "../TiepDanGianTiep/components/modalThemFileDinhKem";
import api from "./config";
import apiFileHoSo from "../TiepDanGianTiep/config";
import apiFileXL from "../PhanXuLyDonThu/config";
import apiTransfer from "./config";


const { Meta } = Card;

export default function modalChiTiet(props) {
    const { open, onOk, onCancel, dataEdit, title, data } = props;
    const { Item, useForm, form } = Form;
    const { Panel } = Collapse;
    const [ThongTinChiTietDonThu] = useForm();
    const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([]);
    const [loaiCoQuan, setLoaiCoQuan] = useState([]);
    const [danhSachCoQuan, setDanhSachCoQuan] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [coQuanID, setCoQuanID] = useState();
    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState("");
    const [fileMau, setFileMau] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdd = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCancelParent = () => {
        onCancel(), form.resetFields();
    };

    useEffect(() => {
        ThongTinChiTietDonThu.setFieldsValue({ ...dataEdit });
    }, [dataEdit]);

    useEffect(() => {
        getDanhSachCoQuan();
    }, []);
    const getDanhSachCoQuan = async () => {
        await api.DanhSachCoQuan()
            .then(res => setLoaiCoQuan(res.data.Data))
    };
    function handleTreeCoQuanDonVi(list) {
        return list.map((item) => {
            if (item.Children.length > 0) {
                return {
                    title: item.Ten,
                    value: item.ID,
                    children: handleTreeCoQuanDonVi(item.Children),
                };
            } else {
                return {
                    title: item.Ten,
                    value: item.ID,
                };
            }
        });
    }

    function getListCoQuanDonVi(list) {
        try {
            if (list) {
                let newData = handleTreeCoQuanDonVi(list);
                setDanhSachCoQuan(newData);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();

            let [files, data] = values;
            setFile(files);

            files.forEach((file) => {
                formData.append("files", file);
            });

            setFile(files);
            let res = await apiFileHoSo.ThemFileHoSo(formData);

            let { Status, Data, Message } = res.data;

            if (Status === 1) {
                let newData = data.map((item, index) => ({
                    ID: dataSource.length + index + 1,
                    ...item,
                    FileUrl: setFileUrl(Data[index].FileUrl),
                }));
                setDataSource((pre) => {
                    let res = pre;
                    return [...pre, ...newData];
                });

                setFileMau({
                    ...Data,
                    // FileID: 0,
                    // NghiepVuID: 0,
                    // DMTenFileID: 0,
                    // TenFile: "",
                    // TomTat: "",
                    // TenFileGoc: "",
                    // NgayCapNhat: "2023-03-02",
                    // XuLyDonID: dataEdit.XuLyDonID,
                    // DonThuID: dataEdit.DonThuID,
                    // ChonCoQuan: coQuanID,
                    // FileType: 0,
                    // TrangThai: 0,
                    // FolderPath: "",
                    // FileUrl: fileUrl,
                    // NoiDung: "",
                    // IsBaoMat: true,
                    // IsMaHoa: true,
                });

                message.success(Message);
            } else {
                let newData = data.map((item, index) => ({
                    ID: dataSource.length + index + 1,
                    ...item,
                }));
                setDataSource((pre) => {
                    return [...pre, ...newData];
                });
                message.error(Message);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            handleCancel()
        }
    };

    const submitForm = async () => {
       api.ChuyenDon(
        {
          CoQuanID: data.CoQuanID,
          XuLyDonID: data.XuLyDonID,
          DonThuID: data.DonThuID,
          SoDonThu: "",
          NguonDonDen: data.NguonDonDen,
          TenNguonDonDen: "",
          HoTen: "",
          DiaChiCT: "",
          TenLoaiKhieuTo: "",
          TenHuongGiaiQuyet: "",
          NoiDungDon: "",
          StateName: "",
          TransitionID: 0,
          StateID: 0,
          NgayQuaHan: "2023-06-13T03:31:03.421Z",
          NgayGui: "2023-06-13T03:31:03.421Z",
          FileUrl: "",
          TenFile: "",
          YKienXuLy: "",
          NgayXuLy: "2023-06-13T03:31:03.421Z",
          CanBoXuLyID: data.CanBoID,
          TenCanBoXuLy: "",
          Check: true
          }
       ). then((res)=>{
        if(res.data.Status > 0){
            message.success(res.data.Message)
            handleCancel()
        }
        else{
            message.error(res.data.Message)
            handleCancel()
        }
       })
    };

    const renderThaoTac = (record) => {
        return (
            <div className={"action-btn"}>
                {/* {role.delete ? */}
                <Tooltip title={"Xóa"}>
                    <DeleteOutlined onClick={() => handleDeleteFile(record)} />
                </Tooltip>
                {/* : ""} */}
            </div>
        );
    };

    const renderFileDinhKem = (record) => {
        return (
            <div className={"action-btn"}>
                {/* {role.delete ? */}
                <Tooltip title={"Tải xuống"}>
                    <DownloadOutlined
                        onClick={() => handleDownload(record)}
                        style={{ color: "blue" }}
                    />
                </Tooltip>
                {/* : ""} */}
            </div>
        );
    };
    const handleDownload = (record) => {
        console.log(record.FileUrl, "fileUrl");
        message.success("Download success!");
    };

    const handleDeleteFile = (record) => {
        setDataSource((pre) => pre.filter((item) => item.ID !== record.ID));
    };

    useEffect(() => {
        getListCoQuanDonVi(loaiCoQuan)
    }, [loaiCoQuan])

    const ThemHoSo = [
        {
            title: "STT",
            width: "10%",
            align: "center",
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: "Ngày cập nhật",
            width: "20%",
            align: "center",
            dataIndex: "NgayUp",
        },
        {
            title: "Tên hồ sơ/tài liệu",
            width: "45%",
            align: "center",
            dataIndex: "TenFile",
        },
        {
            title: "File đính kèm",
            width: "15%",
            align: "center",
            dataIndex: "FileUrl",
            render: (_, record) => renderFileDinhKem(record),
        },
        {
            title: "Thao tác",
            width: "10%",
            align: "center",
            render: (_, record) => renderThaoTac(record),
        },
    ];

    const handleChange = (value) => {
        setCoQuanID(value);
    };

    return (
        <Modal
            title="Chuyển"
            open={open}
            onOk={onOk}
            width="40%"
            onCancel={onCancel}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    htmlType="submit"
                    // form={"formModalthemmoifiledinhkem"}
                    onClick={submitForm}
                    // onClick={onCancel}

                >
                    Lưu
                </Button>,
                <Button key="back" onClick={onCancel}>
                    Hủy bỏ
                </Button>,
            ]}
        >
            {/* <>
                <Row gutter={24}>
                    <Col span={16}>
                        <Form.Item label="Cơ quan " name="CoQuan" rules={[REQUIRED]}>
                            <Select />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item
                            name={[name, "NgayUp"]}
                            label="Ngày cập nhật"
                            rules={[REQUIRED]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>

                    <Col>
                        <Form.Item
                            name={[name, "File"]}
                            label="Chọn file đính kèm"
                            rules={[REQUIRED]}
                        >
                            <Button onClick={handleAdd}>Thêm hồ sơ</Button>
                            <p>Ðịnh dạng cho phép: .jpg; .jpeg; .gif; .png; .doc; .docx; .pdf; .xls; .xlsx</p>
                        </Form.Item>
                    </Col>
                </Row>
                <AddHoSo
                    isModalOpen={isModalOpen}
                    onCancel={handleCancel}
                    onOk={handleAdd} />
                <BoxTable
                    columns={ThemHoSo}
                />
            </> */}

            <>
                <Row>
                    <Col span={6}>
                        <Form.Item label="Chọn Cơ quan " name="CoQuanID" rules={[REQUIRED]} onChange={handleChange}>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <TreeSelect
                            style={{ width: "100%" }}
                            allowClear
                            placeholder="Chọn cơ quan"
                            // treeDefaultExpandAll
                            dropdownMatchSelectWidth={false}
                            treeData={danhSachCoQuan}
                        />
                    </Col>
                </Row>
                <Row >
                    <Col span={6}>
                        <Form.Item
                            name={[name, "NgayUp"]}
                            label="Ngày cập nhật"
                        // rules={[REQUIRED]}
                        >
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <DatePicker style={{ width: "100%" }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item
                            name={[name, "File"]}
                            label="Chọn file đính kèm"
                        // rules={[REQUIRED]}
                        >
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        <Button type="primary" onClick={handleAdd}>Thêm hồ sơ</Button>
                        <p>Ðịnh dạng cho phép: .jpg; .jpeg; .gif; .png; .doc; .docx; .pdf; .xls; .xlsx</p>
                    </Col>
                </Row>

                <BoxTable
                    onClick={handleOk}
                    columns={ThemHoSo}
                    dataSource={dataSource}
                />
                <AddHoSo
                    isModalOpen={isModalOpen}
                    onCancel={handleCancel}
                    onOk={onSubmit}
                />
            </>

            {/* <>
                <Item
                    label="Mã dân tộc"
                    name={"MaDanToc"}
                    {...ITEM_LAYOUT}
                    rules={[REQUIRED]}
                >
                    <InputFormatSpecific />
                </Item>
            </> */}
        </Modal>
    );
}
