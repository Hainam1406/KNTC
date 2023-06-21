// import React from "react";
// import Modal from "../../../../components/uielements/modal";
// import Form from "../../../../components/uielements/form";
// import Collapse from "../../../../components/uielements/collapse";

// import { Button } from "../../../../components/uielements/exportComponent";
// import { useEffect, useState } from "react";

// import { Avatar, Card, Col, InputNumber, Row } from "antd";

// import ThongTinChiTietDT from "./ThongTinChiTietDT";
// import pdf from "../SoTiepDanTrucTiep/img/pdf.png";
// import HoSoDonThu from "./HoSoDonThu";
// import TienTrinhXuLy from "./TienTrinhXuLy";
// import api from "./config";
// const { Meta } = Card;

// export default function modalChiTiet(props) {
//   const { open, onOk, onCancel, dataEdit, title, danhSachKhieuTo } = props;
//   const { Item, useForm } = Form;
//   const { Panel } = Collapse;
//   const [ThongTinChiTietDonThu] = useForm();
//   const [HoSoDonThuForm] = useForm();
//   const [data, setData] = useState();
//   useEffect(() => {
//     if (dataEdit) {
//       api
//         .ChiTietDonThu({
//           DonThuID: dataEdit.DonThuID,
//           XuLyDonID: dataEdit.XuLyDonID,
//         })
//         .then((res) => setData(res.data.Data));
//     }
//   }, [dataEdit]);
//   console.log("test1chien ", data);
//   return (
//     <Modal
//       title={title}
//       open={open}
//       onCancel={onCancel}
//       width={1500}
//       footer={[
//         <Button>Sửa</Button>,
//         <Button onClick={onOk} style={{ color: "red" }}>
//           Xóa
//         </Button>,
//         <Button key="back" onClick={onCancel} htmlType="submit" type="primary">
//           Trở về
//         </Button>,
//       ]}
//     >
//       <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
//         <Panel header={"Thông tin tiếp nhận đơn thư "} key={"1"}>
//           <ThongTinChiTietDT form={ThongTinChiTietDonThu} data={data} />
//         </Panel>
//         {/* ------   2     */}
//         <Panel
//           header={"Hồ sơ đơn thư"}
//           key={"2"}
//           className="collapse-item-reverse"
//         >
//           <HoSoDonThu data={data} danhSachKhieuTo={danhSachKhieuTo} />
//         </Panel>
//         {/* -------- 3 */}
//         <Panel header={"Tiến trình xử lý"} key={"3"}>
//           <TienTrinhXuLy data={data} />
//         </Panel>
//       </Collapse>
//     </Modal>
//   );
// }
