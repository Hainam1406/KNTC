// import React from "react";
// import Modal from "../../../../components/uielements/modal";
// import Form from "../../../../components/uielements/form";
// import PanelBox, { PanelBoxSection } from "./PanelBox";
// import Collapse from "../../../../components/uielements/collapse";
// import {
//   DeleteOutlined,
//   EditOutlined,
//   PlusOutlined,
//   DownOutlined,
//   UpOutlined,
// } from "@ant-design/icons";
// import {
//   Input,
//   Selectv4,
//   DatePicker,
//   Button,
// } from "../../../../components/uielements/exportComponent";
// import { ITEM_LAYOUT_HALF, REQUIRED } from "../../../../settings/constants";
// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import { useSelector } from "react-redux";

// import Inputnumber from "../../../../components/uielements/InputNumber";
// import TableCustom from "../../../../components/uielements/table";
// import { Col, InputNumber, Row } from "antd";
// import { NoneBorder } from "../SoTiepDanTrucTiep/styled";
// import BoxTable from "../../../../components/utility/boxTable";
// const { Item, useForm } = Form;
// const ThongTinChiTietDT = ({ form, data, ...props }) => {
//   const [checkInfor, SetCheckInFor] = useState(false);
//   const [donThu, setDonThu] = useState();

//   useEffect(() => {
//     if (data) {
//       setDonThu(data?.DonThu);
//     }
//   }, [data]);
//   console.log("donthu", donThu);
//   const addInFor = () => {
//     SetCheckInFor(true);
//   };
//   const hiddenInFor = () => {
//     SetCheckInFor(false);
//   };

//   return (
//     <Form
//       form={form}
//       name={"formchitietdonthu"}
//       initialValues={{
//         TrangThai: 1,
//       }}
//       disabled="true"
//     >
//       <NoneBorder>
//         <Row gutter={[16, 16]}>
//           <Col span={4}>
//             <strong>Số đơn:</strong>
//           </Col>
//           <Col span={8}>{donThu?.SoDonThu}</Col>
//           {/*  */}
//           <Col span={4}>
//             <strong>Ngày tiếp nhận:</strong>
//           </Col>
//           <Col span={8}>{donThu?.NgayNhapDon}</Col>
//           {/*  */}
//           <Col span={4}>
//             <strong>Họ và tên:</strong>
//           </Col>
//           <Col span={18}>{donThu?.HoTen}</Col>
//           {/*  */}
//           <Col span={4}>
//             <strong>Địa chỉ:</strong>
//           </Col>
//           <Col span={18}>{donThu?.DiaChiCT}</Col>
//           {/*  */}
//           <Col span={4}>
//             <strong>Loại khiếu tố:</strong>
//           </Col>
//           <Col span={18}>{donThu?.TenLoaiKhieuTo1}</Col>
//           {/*  */}
//           <Col span={4}>
//             <strong>Nội dung đơn:</strong>
//           </Col>
//           <Col span={18}>{donThu?.NoiDungDon}</Col>
//           {/*  */}
//           <Col span={4}>
//             <strong>Hạn xử lý:</strong>
//           </Col>
//           <Col span={18}>{donThu?.HanXuLy}</Col>
//           {/*  */}
//           <Col span={4}>
//             <strong>Trạng thái:</strong>
//           </Col>
//           <Col span={8}>{donThu?.TrangThai}</Col>
//           {/*  */}
//           <Col span={4}>
//             <strong>Hạn giải quyết:</strong>
//           </Col>
//           <Col span={8}>{donThu?.HanGiaiQuyetMoi}</Col>
//           {/*  */}
//           <Col span={4}>
//             <strong>Trạng thái:</strong>
//           </Col>
//           <Col span={8}>{donThu?.TrangThai}</Col>
//         </Row>
//       </NoneBorder>
//       <hr />

//       <p
//         onClick={addInFor}
//         style={{
//           color: "#fa8c16",
//           marginTop: "10px",
//           cursor: "pointer",
//           fontSize: "15px",
//         }}
//       >
//         <DownOutlined /> Xem chi tiết
//       </p>

//       {checkInfor == true ? (
//         <>
//           <NoneBorder>
//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <strong className="detail_header">1. Thông tin chung</strong>
//               </Col>
//               <Col span={4}>
//                 <strong>Nguồn đơn đến:</strong>
//               </Col>
//               <Col span={8}>{donThu?.NguonDonDen}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Cán bộ tiếp nhận:</strong>
//               </Col>
//               <Col span={8}>{donThu?.TenCanBoTiepNhan}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Số đơn:</strong>
//               </Col>
//               <Col span={8}>{donThu?.SoDonThu}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Ngày tiếp nhận:</strong>
//               </Col>
//               <Col span={8}>{donThu?.NgayTiepNhan}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Đối tượng khiếu tố:</strong>
//               </Col>
//               <Col span={18}>{donThu?.DoiTuongBiKNID}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Họ và tên:</strong>
//               </Col>
//               <Col span={8}>{donThu?.HoTen}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Giới tính:</strong>
//               </Col>
//               <Col span={8}></Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Dân tộc:</strong>
//               </Col>
//               <Col span={18}></Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Địa chỉ:</strong>
//               </Col>
//               <Col span={18}>{donThu?.DiaChiCT}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Loại khiếu tố:</strong>
//               </Col>
//               <Col span={18}>{donThu?.TenLoaiKhieuTo2}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Nơi phát sinh:</strong>
//               </Col>
//               <Col span={18}>{donThu?.DiaChiPhatSinh}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Nội dung đơn:</strong>
//               </Col>
//               <Col span={18}>{donThu?.NoiDungDon}</Col>
//             </Row>
//             {/* --------            */}
//             <hr></hr>
//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <strong className="detail_header">2. Thông tin xử lý</strong>
//               </Col>
//               <Col span={4}>
//                 <strong>Ngày phân công:</strong>
//               </Col>
//               <Col span={8}>{donThu?.NgayPhan}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Hạn xử lý:</strong>
//               </Col>
//               <Col span={8}>{donThu?.HanXuLy}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Cơ quan xử lý:</strong>
//               </Col>
//               <Col span={8}>{donThu?.TenCoQuanXL}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>cán bộ xử lý:</strong>
//               </Col>
//               <Col span={8}>{donThu?.TenCanBoXuLy}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Ngày xử lý:</strong>
//               </Col>
//               <Col span={8}>{donThu?.NgayXuLy}</Col>
//               {/*  */}
//               <Col span={4}>
//                 <strong>Hướng xử lý:</strong>
//               </Col>
//               <Col span={8}>{donThu?.HuongXuLy}</Col>
//               {/*  */}
//             </Row>
//             {/* <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 <strong className="detail_header">
//                   3. Thông tin giải quyết
//                 </strong>
//               </Col>
//               <Col span={4}>
//                 <strong>Cơ quan giao:</strong>
//               </Col>
//               <Col span={8}>{donThu?.NguonDonDen}</Col>
//               <Col span={4}>
//                 <strong>Ngày giao:</strong>
//               </Col>
//               <Col span={8}></Col>
//               <Col span={4}>
//                 <strong>Cơ quan phụ trách:</strong>
//               </Col>
//               <Col span={8}>{donThu?.SoDonThu}</Col>
//               <Col span={4}>
//                 <strong>Cơn quan phối hợp:</strong>
//               </Col>
//               <Col span={8}>{donThu?.NgayTiep}</Col>
//               <Col span={4}>
//                 <strong>Hạn giải quyết:</strong>
//               </Col>
//               <Col span={8}>{donThu?.DoiTuongBiKNID}</Col>
//               <Col span={4}>
//                 <strong>Trạng thái:</strong>
//               </Col>
//               <Col span={8}>{donThu?.HoTen}</Col>
//               <Col span={24}>
//                 <strong>Thông tin tổ xác minh</strong>
//               </Col>
//               <Col span={4}>
//                 <strong>- Cán bộ phụ trách:</strong>
//               </Col>
//               <Col span={18}>{donThu?.HoTen}</Col>
//               <Col span={4}>
//                 <strong>- Cán bộ phối hợp:</strong>
//               </Col>
//               <Col span={18}>{donThu?.HoTen}</Col>
//               <Col span={4}>
//                 <strong>- Cán bộ theo dõi:</strong>
//               </Col>
//               <Col span={18}>{donThu?.HoTen}</Col>
//               <Col span={24}>
//                 <strong>Kết quả ban hành</strong>
//               </Col>
//               <Col span={4}>
//                 <strong>Số quyết định:</strong>
//               </Col>
//               <Col span={8}>{donThu?.HoTen}</Col>
//               <Col span={4}>
//                 <strong>Ngày quyết định:</strong>
//               </Col>
//               <Col span={8}>{donThu?.HoTen}</Col>
//               <Col span={4}>
//                 <strong>Cơ quan ban hành:</strong>
//               </Col>
//               <Col span={8}>{donThu?.HoTen}</Col>
//               <Col span={4}>
//                 <strong>Quyết định:</strong>
//               </Col>
//               <Col span={8}>{donThu?.HoTen}</Col>
//               <Col span={4}>
//                 <strong>Phân tích kết quả:</strong>
//               </Col>
//               <Col span={8}>{donThu?.HoTen}</Col>
//               <Col span={4}>
//                 <strong>Kết quả QĐ lần 2:</strong>
//               </Col>
//               <Col span={8}>{donThu?.HoTen}</Col>
//               <Col span={24}>
//                 <strong>
//                   Nội dung quyết định và kết quả theo dõi thực thi QĐ:{" "}
//                 </strong>
//               </Col>
//               <BoxTable columns={columns}></BoxTable>
//             </Row> */}
//             <p
//               onClick={hiddenInFor}
//               style={{
//                 color: "#fa8c16",
//                 marginTop: "20px",
//                 cursor: "pointer",
//                 fontSize: "15px",
//               }}
//             >
//               <UpOutlined /> Ẩn chi tiết
//             </p>
//           </NoneBorder>
//         </>
//       ) : (
//         <></>
//       )}
//     </Form>
//   );
// };
// export default ThongTinChiTietDT;
