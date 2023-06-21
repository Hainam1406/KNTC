// import React from "react";
// import Modal from "../../../../components/uielements/modal";
// import Form from "../../../../components/uielements/form";
// import Collapse from "../../../../components/uielements/collapse";
// import Box from "../../../../components/utility/box";
// import {
//     UploadOutlined,
//     DownloadOutlined,
//     DeleteOutlined,
//     PlusOutlined
// } from "@ant-design/icons";
// import {
//     Input,
//     Selectv4,
//     DatePicker,
//     Button,
//     Select,
//     Option,
//     TreeSelect,
// } from "../../../../components/uielements/exportComponent";
// import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
// import { useEffect, useState } from "react";
// import { InputFormatSpecific } from "../../../../components/uielements/exportComponent";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import { useSelector } from "react-redux";
// import Inputnumber from "../../../../components/uielements/InputNumber";
// import TableCustom from "../../../../components/uielements/table";
// import { Avatar, Card, Col, InputNumber, Row, Divider, Upload, Tooltip } from "antd";
// // import { NoneBorder, PaddingCardChiTietDonThu } from "./styled";
// import ChiTietDonThu from "../SoTiepDanTrucTiep/modalChiTiet"
// import BoxTable from "../../../../components/utility/boxTable";
// import AddHoSo from "../TiepDanGianTiep/components/modalThemFileDinhKem";
// import api from "./config";

// const { Meta } = Card;

// export default function modalChiTiet(props) {
//     const { open, onOk, onCancel, dataEdit, title } = props;
//     const { Item, useForm } = Form;
//     const { Panel } = Collapse;
//     const [ThongTinChiTietDonThu] = useForm();
//     const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([]);
//     const [loaiCoQuan, setLoaiCoQuan] = useState([]);
//     const [danhSachCoQuan, setDanhSachCoQuan] = useState([]);
//     const [listFileHoSo, setListFileHoSo] = useState([])

//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleAdd = () => {
//         setIsModalOpen(true);
//     };

//     const handleOk = () => {
//         setIsModalOpen(false);
//     };
//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };

//     useEffect(() => {
//         ThongTinChiTietDonThu.setFieldsValue({ ...dataEdit });
//     }, [dataEdit]);

//     useEffect(() => {
//         getDanhSachCoQuan();
//     }, []);
//     const getDanhSachCoQuan = async () => {
//         await api.DanhSachCoQuan()
//             .then(res => setLoaiCoQuan(res.data.Data))
//     };
//     function handleTreeCoQuanDonVi(list) {
//         return list.map((item) => {
//             if (item.Children.length > 0) {
//                 return {
//                     title: item.Ten,
//                     value: item.ID,
//                     children: handleTreeCoQuanDonVi(item.Children),
//                 };
//             } else {
//                 return {
//                     title: item.Ten,
//                     value: item.ID,
//                 };
//             }
//         });
//     }

//     function getListCoQuanDonVi(list) {
//         try {
//             if (list) {
//                 let newData = handleTreeCoQuanDonVi(list);
//                 setDanhSachCoQuan(newData);
//             }
//         } catch (error) {
//             message.error(error.message);
//         }
//     }

//     function onSubmit(data) {
//         setListFileHoSo(data[1])
//         handleCancel()
//     }

//     const renderThaoTac = (record) => {
//         return (
//             <div className={"action-btn"}>
//                 {/* {role.delete ? */}
//                 <Tooltip title={"Xóa"}>
//                     <DeleteOutlined onClick={() => handleDeleteFile(record)} />
//                 </Tooltip>
//                 {/* : ""} */}
//             </div>
//         );
//     };

//     const renderFileDinhKem = (record) => {
//         return (
//             <div className={"action-btn"}>
//                 {/* {role.delete ? */}
//                 <Tooltip title={"Tải xuống"}>
//                     <DownloadOutlined
//                         onClick={() => handleDownload(record)}
//                         style={{ color: "blue" }}
//                     />
//                 </Tooltip>
//                 {/* : ""} */}
//             </div>
//         );
//     };

//     const handleDownload = (record) => {
//         console.log(record.FileUrl, "fileUrl");
//         message.success("Download success!");
//     };

//     const handleDeleteFile = (record) => {
//         setListFileHoSo((pre) => pre.filter((item) => item.ID !== record.ID));
//     };

//     useEffect(() => {
//         getListCoQuanDonVi(loaiCoQuan)
//     }, [loaiCoQuan])

//     const ThemHoSo = [
//         {
//             title: "STT",
//             width: "10%",
//             align: "center",
//             render: (text, record, index) => <span>{index + 1}</span>,
//         },
//         {
//             title: "Ngày cập nhật",
//             width: "20%",
//             align: "center",
//             dataIndex: "NgayUp",
//         },
//         {
//             title: "Tên hồ sơ/tài liệu",
//             width: "45%",
//             align: "center",
//             dataIndex: "TenFile",
//         },
//         {
//             title: "File đính kèm",
//             width: "15%",
//             align: "center",
//             dataIndex: "FileUrl",
//             render: (_, record) => renderFileDinhKem(record),
//         },
//         {
//             title: "Thao tác",
//             width: "10%",
//             align: "center",
//             render: (_, record) => renderThaoTac(record),
//         },
//     ];

//     const genExtra = () => (
//         <>
//             <Button
//                 icon={<PlusOutlined />}
//                 onClick={(e) => handleAdd(e)}
//                 type="primary"
//             >
//                 Thêm tài liệu
//             </Button>
//         </>
//     );
//     return (
//         <Modal
//             title="Xử lý đơn thư"
//             open={open}
//             onOk={onOk}
//             width="100%"
//             onCancel={onCancel}
//             footer={[
//                 <Button
//                     key="submit"
//                     type="primary"
//                     htmlType="submit"
//                     form={"formModalthemmoifiledinhkem"}
//                     onClick={onCancel}
//                 >
//                     Lưu
//                 </Button>,
//                 <Button key="back" onClick={onCancel}>
//                     Hủy bỏ
//                 </Button>,
//             ]}
//         >
//             <>
//                 <Collapse collapsible="header" defaultActiveKey={['1']} ghost>
//                     <Panel
//                         header="Hồ sơ/ tài liệu đính kèm"
//                         key="1"
//                         extra={genExtra()}
//                     >
//                         <>
//                             <BoxTable
//                                 onClick={handleOk}
//                                 columns={ThemHoSo}
//                                 dataSource={listFileHoSo}
//                             />
//                             <AddHoSo
//                                 isModalOpen={isModalOpen}
//                                 onCancel={handleCancel}
//                                 onOk={onSubmit}
//                             />
//                         </>
//                     </Panel>
//                 </Collapse>
//             </>

//         </Modal>
//     );
// }
