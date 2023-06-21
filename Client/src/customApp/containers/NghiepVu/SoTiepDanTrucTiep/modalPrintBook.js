import React, { useState, useEffect } from "react";
import { Button, Layout } from "antd";
import BoxTable from "../../../../components/utility/boxTable";
import file from "./img/xlsx.svg";
import err from "./img/error.svg";
import { TitleModal } from "../SoTiepDanTrucTiep/styled";
import api from "./config";
import moment from "moment";
import { useSelector } from "react-redux";
const { Header, Footer, Sider, Content } = Layout;
const today = new Date();
const headerStyle = {
  textAlign: "center",
  height: 75,
  paddingInline: 50,
  fontSize: 20,
  fontWeight: 700,
  lineHeight: "32px",
  backgroundColor: "white",
};
const DateStyle = {
  fontSize: 16,
  fontWeight: 400,
};
const FileIcon = (image) => {
  return (
    <img
      src={image}
      alt=""
      style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
    />
  );
};
const DateNew = () => {
  return (
    <div style={DateStyle}>
      <span>
        Đến ngày: {new Intl.DateTimeFormat(["ban", "id"]).format(today)}
      </span>
    </div>
  );
};
const ErrorIcon = (image) => {
  return (
    <img
      src={image}
      alt=""
      style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
    />
  );
};

export default (props) => {
  const { open, onOk, onCancel, SoTiepDan, action } = props;

  const renderHoTen = (record) => {
    let hoten = record.HoTen.replaceAll("<br/>", "-").split(",-");
    hoten[0] = hoten[0].replace("-", "");
    return (
      <ul>
        {hoten.map((item, index) => (
          <li key={index}>- {item.trim()}</li>
        ))}
      </ul>
    );
  };

  const columnSoTiepCongDan = [
    {
      title: "STT",
      width: "7%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Số đơn",
      dataIndex: "SoDon",
      align: "center",
      width: "10%",
    },
    {
      title: "Ngày tiếp",
      dataIndex: "NgayTiep",
      align: "left",
      width: "15%",
    },
    {
      title: "Họ tên - Địa Chỉ_ CMND/Hộ chiếu của công dân",
      align: "left",
      width: "20%",
      dataIndex: "HoTen",
      render: (_, record) => renderHoTen(record),
    },
    {
      title: "Nội dung vụ việc",
      dataIndex: "NoiDungDon",
      align: "left",
      width: "30%",
    },
    {
      title: "Phân loại đơn / Số người",
      dataIndex: "SoLuong",
      width: "10%",
      align: "center",
    },
    {
      title: "Cơ quan đã GQ",
      dataIndex: "TenCoQuan",
      width: "15%",
      align: "center",
    },
    {
      title: "Hướng xử lý",
      dataIndex: "HuongGiaiQuyetID",
      children: [
        {
          title: "Thụ lý để giải quyết",
          align: "center",
          render: (_, record) => (record.HuongGiaiQuyetID == 31 ? <>X</> : ""),
          key: "age",
          width: 70,
        },
        {
          title: "Trả lại đơn và hướng dẫn",
          align: "center",
          render: (_, record) => (record.HuongGiaiQuyetID == 33 ? <>X</> : ""),
          key: "age",
          width: 70,
        },
        {
          title: "Chuyển đơn đến cơ quan, tổ chức đơn vị có thẩm quyền",
          align: "center",
          render: (_, record) => (record.HuongGiaiQuyetID == 32 ? <>X</> : ""),
          key: "age",
          width: 80,
        },
      ],
      width: "15%",
      align: "center",
    },
    {
      title: "Theo dõi kết quả giải quyết",
      dataIndex: "TenLanhDaoTiep",
      width: "15%",
      align: "center",
    },
    {
      title: "Lãnh đạo tiếp",
      dataIndex: "TenLanhDaoTiep",
      width: "15%",
      align: "center",
    },
    {
      title: "Ghi chú",
      dataIndex: "TenLanhDaoTiep",
      width: "15%",
      align: "center",
    },
    {
      title: "Kết quả",
      dataIndex: "KetQuaTiep",
      width: "15%",
      align: "center",
    },
    // {
    //   title: "Thao tác",
    //   width: "15%",
    //   align: "center",
    //   render: (text, record) => renderThaoTacSoTiep(record),
    // },
  ];

  const DonThu = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Số đơn",
      dataIndex: "SoDonThu",
      align: "center",
      width: "10%",
    },
    {
      title: "Nguồn đơn đến",
      dataIndex: "NguonDonDens",
      align: "left",
      width: "15%",
    },
    {
      title: "Tên chủ đơn",
      dataIndex: "TenChuDon",
      align: "left",
      width: "20%",
      // render: (_, record) => renderHoTen(record),
    },
    {
      title: "Nội dung vụ việc",
      dataIndex: "NoiDungDon",
      align: "left",
      width: "30%",
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo",
      width: "10%",
      align: "center",
    },
    {
      title: "Ngày tiếp nhận",
      dataIndex: "NgayNhapDons",
      width: "15%",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "StateName",
      width: "15%",
      align: "center",
    },
    {
      title: "Kết quả",
      dataIndex: "KetQuaTiep",
      width: "15%",
      align: "center",
    },
  ];
  const handleDownloadClick = () => {
    const ExportFile =
      "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/Exportexcel";
    const link = Object.assign(document.createElement("a"), {
      href: ExportFile,
      download: "Xuat-FILE",
      rel: "noopener noreferrer",
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return (
    <TitleModal
      title="In sổ tiếp dân"
      open={open}
      onOk={onOk}
      width="80%"
      onCancel={onCancel}
      footer={[
        <div
          style={{
            textAlign: "center",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 0px 0px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
            margin: "10px 0 10px",
          }}
        >
          <Button
            key="submit"
            type="primary"
            onClick={handleDownloadClick}
            icon={FileIcon(file)}
            style={{
              margin: "10px 0 10px 30px",
            }}
          >
            Xuất file excel
          </Button>

          <Button
            key="back"
            onClick={onCancel}
            icon={ErrorIcon(err)}
            style={{
              background: "#FF0000",
              color: "#fff",
              margin: "10px 0 10px 30px",
            }}
          >
            Hủy bỏ
          </Button>
        </div>,
      ]}
    >
      <Layout>
        <Header style={headerStyle}>
          Danh sách đơn thư <br />
          <DateNew />
        </Header>
        <Content>
          <BoxTable
            columns={action == "DonTiepNhan" ? DonThu : columnSoTiepCongDan}
            dataSource={SoTiepDan}
          />
        </Content>
      </Layout>
    </TitleModal>
  );
};
