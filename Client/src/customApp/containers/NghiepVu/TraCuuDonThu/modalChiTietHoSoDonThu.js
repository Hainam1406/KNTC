import React from "react";
import Modal from "../../../../components/uielements/modal";
import Form from "../../../../components/uielements/form";
import Collapse from "../../../../components/uielements/collapse";
import Box from "../../../../components/utility/box";
import {DeleteOutlined,EditOutlined,PlusOutlined,DownloadOutlined,SaveOutlined,} from "@ant-design/icons";
import {
  Input,
  Selectv4,
  DatePicker,
  Button,
  Select,
  Option,
} from "../../../../components/uielements/exportComponent";
import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";
import Inputnumber from "../../../../components/uielements/InputNumber";
import TableCustom from "../../../../components/uielements/table";
import { Avatar, Card, Col, InputNumber, Row, Divider } from "antd";
// import { NoneBorder, PaddingCardChiTietDonThu } from "./styled";
import ChiTietDonThu from "../SoTiepDanTrucTiep/modalChiTiet";
import api from "./config";
import BoxTable from "../../../../components/utility/boxTable";

const { Meta } = Card;

export default function modalChiTiet(props) {
  const { open, onOk, onCancel, dataEdit, title } = props;
  const { Item, useForm } = Form;
  const { Panel } = Collapse;
  const [ThongTinChiTietDonThu] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewDetails, setIsViewDetails] = useState(true)
  const [data, setData] = useState()
  const [danhSachDonThu, setDanhSachDonThu] = useState([]);

  const showModalChiTiet = (record) => {
    setIsModalOpen(true);
    setData(record)
  };
  const handleOk = () => {
    setIsModalOpen(false);

  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    ThongTinChiTietDonThu.setFieldsValue({ ...dataEdit });
  }, [dataEdit]);

  useEffect(() => {
    if (dataEdit) {
      api
        .DanhSachDonThuChiTiet({
          DonThuID: dataEdit.DonThuID,
          XuLyDonID: dataEdit.XuLyDonID,
        })
        .then((res) => setDanhSachDonThu(res.data.Data));
    }
  }, [dataEdit]);


  const newArr = (value) => {
    console.log(value, "consso")
    let data = []
   if(value)
   data.push({
    HoTen:value.HoTen,
    NoiDungDon: value.NoiDungDon,
    TenCanBoTiepNhan :value.TenCanBoTiepNhan,
    DiaChiCT:value.DiaChiCT,
    SoDonThu: value.SoDonThu,
    NgayNhapDon:value.NgayNhapDon,
    TenLoaiKhieuTo1:value.TenLoaiKhieuTo1,
    TenCoQuanTiepNhan:value.TenCoQuanTiepNhan,
    DonThuID: value.DonThuID,
    XuLyDonID: value.XuLyDonID
   })
   
   return data
  } 

  // useEffect(() => {
  //   getDanhSachDonThu();
  // }, []);

  // const getDanhSachDonThu = async () => {
  //   await api.DanhSachDonThuChiTiet({DonThuID: dataEdit.DonThuID,XuLyDonID: dataEdit.XuLyDonID})
  //     .then(res => setDanhSachDonThu(res.data.Data))
  // };
  let formatDate = ["YYYY-MM-DD", "DD/MM/YYYY"];

  const handleDate = (dateString) => {
    let dateTime = undefined;

    if (dateString) {
      let newDateString = dateString.split("T")[0];

      if (dayjs(newDateString, formatDate[0], true).isValid())
        dateTime = dayjs(newDateString, formatDate[0], true);
      else if (dayjs(newDateString, formatDate[1], true).isValid())
        dateTime = dayjs(newDateString, formatDate[1], true);
      else dateTime = undefined;

      return newDateString;
    }

    return dateTime;
  };

  
  const NguoiDaiDien = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Họ và tên ",
      dataIndex: "HoTen",
      align: "center",
      width: "15%",
    },
    {
      title: "CMND ",
      dataIndex: "CMND",
      align: "center",
      width: "15%",
    },
    {
      title: "Giới tính ",
      dataIndex: "GioiTinh",
      align: "center",
      width: "5%",
    },
    {
      title: "Nghề nghiệp ",
      dataIndex: "NgheNghiep",
      align: "center",
      width: "10%",
    },
    {
      title: "Quốc tịch",
      dataIndex: "QuocTich",
      align: "center",
      width: "5%",
    },
    {
      title: "Dân tộc ",
      dataIndex: "DanToc",
      align: "center",
      width: "5%",
    },
    {
      title: "Địa chỉ ",
      dataIndex: "DiaChiCT",
      align: "center",
      width: "40%",
    },
  ]
  const data1 = [
    {
      key: 1,
      HoTen: "Võ Đức Vĩnh",
      SoDonThu: "TCD12485",
      NguonDon: "Trực tiếp",
      NgayNhap: "23/03/2023",
      NoiDungDon: "khiếu nại về bồi thường thuộc CT mở rộng nâng cấp đường Bàu Bàng, xã Bình Châu, Xuyên Mộc",
      LoaiDon: "Khiếu nại",
      CoQuanTiepNhan: "Ban tiếp công dân tỉnh",
      GioiTinh: "Nam",
      DanToc: "Kinh",
      DiaChi: "Bà Rịa- Vũng Tàu",
      DonThuID: 39587,
      XuLyDonID: 44961,
    },
  ]

  const DSTrungTiepNhan = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Số đơn thư ",
      dataIndex: "SoDonThu",
      align: "center",
      width: "10%",
    },
    {
      title: " # ",
      dataIndex: "TrungDon",
      align: "center",
      width: "5%",
    },
    {
      title: "Nguồn đơn",
      dataIndex: "NguonDon",
      align: "center",
      width: "10%",
    },
    {
      title: "Ngày nhập ",
      dataIndex: "NgayNhapDon",
      align: "center",
      width: "10%",
      render: (_, record) => handleDate(record.NgayNhapDon),

    },
    {
      title: "Họ tên",
      dataIndex: "HoTen",
      align: "center",
      width: "10%",
    },
    {
      title: "Nội dung đơn ",
      dataIndex: "NoiDungDon",
      align: "center",
      width: "20%",
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo1",
      align: "center",
      width: "10%",
    },
    {
      title: "Cơ quan tiếp nhận",
      dataIndex: "TenCoQuanTiepNhan",
      align: "center",
      width: "10%",
    },
    {
      title: "Hướng xử lý",
      dataIndex: "HuongXuLy",
      align: "center",
      width: "10%",
    },
  ]

  const DanhSachCanGiaiQuyet = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Số đơn thư ",
      dataIndex: "SoDonThu",
      align: "center",
      width: "10%",
    },
    {
      title: " Lần GQ ",
      dataIndex: "LanGiaiQuyet",
      align: "center",
      width: "5%",
    },
    {
      title: "Nguồn đơn",
      dataIndex: "NguonDon",
      align: "center",
      width: "10%",
    },
    {
      title: "Ngày nhập ",
      dataIndex: "NgayNhapDon",
      align: "center",
      width: "10%",
      render: (_, record) => handleDate(record.NgayNhapDon),

    },
    {
      title: "Họ tên",
      dataIndex: "HoTen",
      align: "center",
      width: "10%",
    },
    {
      title: "Nội dung đơn ",
      dataIndex: "NoiDungDon",
      align: "center",
      width: "20%",
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo1",
      align: "center",
      width: "10%",
    },
    {
      title: "Cơ quan tiếp nhận",
      dataIndex: "TenCoQuanTiepNhan",
      align: "center",
      width: "10%",
    },
    {
      title: "Hướng xử lý",
      dataIndex: "HuongXuLy",
      align: "center",
      width: "10%",
    },
  ]

  return (
    <Modal
      // title={` Xem chi tiết hồ sơ đơn thư`}
      // width={1800}
      // visible={true}
      // onOk={onOk}
      // footer={[
      //   <Button key="back" onClick={onCancel} htmlType="submit" type="primary">
      //     Trở về
      //   </Button>,
      // ]}
      title="Danh sách trùng đơn/ các lần tiếp nhận"
      open={open}
      onOk={onOk}
      width="100%"
      onCancel={onCancel}
      footer={[
        <div style={{ textAlign: "center", margin: "10px 0 10px" }}>
          <Button
            key="back"
            onClick={onCancel}
            style={{ background: "#FF0000", color: "#fff", margin: "10px 0 10px 30px" }}
          >
            Đóng
          </Button>
        </div>
      ]}
    >
      {/* <Box>Xem chi tiết hồ sơ đơn thư</Box> */}
      <p style={{ fontWeight: 600, margin: "10px 0px 10px", fontSize: "16px" }}>Xem chi tiết thông tin đơn thư</p>
      <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
        <Panel header={"Thông tin chung "} key={"1"}>
          <p style={{ fontWeight: 600 }}>Đối tượng khiếu nại</p>
          <div style={{ display: "flex" }}>
            <p style={{ fontWeight: 600 }}>Đối tượng khiếu nại :</p>
            <p>Cá nhân</p>
          </div>
          <Divider plain></Divider>
          <p style={{ fontWeight: 600 }}>Người đại diện (1)</p>
          <BoxTable
            columns={NguoiDaiDien}
            // dataSource={data1}
            dataSource={newArr(danhSachDonThu.DonThu)}
          />
        </Panel>
        {/* ------   2     */}
        <>
        </>
        <Panel
          header={"Danh sách đơn thư trùng/ các lần tiếp nhận"}
          key={"2"}
        // className="collapse-item-reverse"
        >
          <TableCustom
            columns={DSTrungTiepNhan}
            dataSource={newArr(danhSachDonThu.DonThu)}
            // dataSource={data1}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => showModalChiTiet(record),
              };
            }}
          />
          <ChiTietDonThu
            title="Chi tiết đơn thư"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            dataEdit={data}
          />


        </Panel>
        {/* -------- 3 */}
        <Panel header={"Danh sách cần giải quyết"} key={"3"}>
          <TableCustom
            columns={DanhSachCanGiaiQuyet}
            dataSource={newArr(danhSachDonThu.DonThu)}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => showModalChiTiet(record),
              };
            }}
          />
          <ChiTietDonThu
            title="Chi tiết đơn thư"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            dataEdit={data}
          />
        </Panel>
      </Collapse>
    </Modal>
  );
}
