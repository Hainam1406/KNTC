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
  const { open, onOk, onCancel, SoTiepDanGianTiep } = props;
  // const dataSoTiepDanGianTiep = useSelector(
  //   (state) => state.SoTiepDanGianTiep.SoTiepDanGianTiep
  // );

  const columnSoTiepDanGianTiep = [
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
      dataIndex: "NguonDonDen",
      align: "left",
      width: "10%",
    },
    {
      title: "Sổ công văn",
      dataIndex: "SoCongVan",
      align: "left",
      width: "10%",
    },
    {
      title: "Ngày tiếp nhận",
      align: "center",
      width: "10%",
      render: (_, record) => {
        const formattedDate = moment(record.NgayNhapDon).format("DD-MM-YYYY");
        return <p>{formattedDate}</p>;
      },
    },
    {
      title: "Thông tin chủ đơn",
      dataIndex: "DiaChiCT",
      width: "20%",
      align: "left",
    },
    {
      title: "Nội dung công việc",
      dataIndex: "NoiDungDon",
      width: "25%",
      align: "left",
    },

    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo",
      width: "10%",
      align: "left",
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      width: "10%",
      align: "left",
    },
    {
      title: "Kết quả",
      dataIndex: "KetQua",
      width: "10%",
      align: "left",
    },
  ];
  const handleDownloadClick = () => {
    const ExportFile =
      "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepNhan_GianTiep/Exportexcel";
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
      title="In sổ tiếp nhận gián tiếp"
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
          Danh sách đơn thư tiếp nhận gián tiếp <br />
          <DateNew />
        </Header>
        <Content>
          <BoxTable
            columns={columnSoTiepDanGianTiep}
            dataSource={SoTiepDanGianTiep}
          />
        </Content>
      </Layout>
    </TitleModal>
  );
};
