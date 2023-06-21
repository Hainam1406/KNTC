import React, { useState } from "react";
import { Button, Modal, Checkbox, Col, Row, Layout, Radio } from "antd";
import print from "./img/printer.svg";
import { ButtonPrint, TitleModal } from "./styled";
import err from "../SoTiepNhanGianTiep/img/error.svg";
// import file from "../SoTiepDanGianTiep/img/xlsx.svg";
import download from "../SoTiepNhanGianTiep/img/download - white.png";

export default function ModalInPhieu(props) {
  const { open, onOk, onCancel } = props;

  const [selectedValue, setSelectedValue] = useState("1");

  const PrintIcon = (image) => {
    return (
      <img
        src={image}
        alt=""
        style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
      />
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

  const [fileIds, setFileIds] = useState([]);
  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    setFileIds(
      fileIds.includes(value)
        ? fileIds.filter((id) => id !== value)
        : [...fileIds, value]
    );
  };

  const handleDownloadClick = (id) => {
    const downloadUrl = `https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepNhan_GianTiep/GetFile?id=${id}`;
    const link = Object.assign(document.createElement("a"), {
      href: downloadUrl,
      download: "Xuat-FILE",
      rel: "noopener noreferrer",
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
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
  return (
    <TitleModal
      title="Chọn phiếu in"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width="60%"
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
            style={{
              margin: "10px 0 10px 30px",
            }}
            icon={FileIcon(download)}
            onClick={() => {
              fileIds.forEach((fileId) => handleDownloadClick(fileId));
            }}
          >
            Tải file
            {/* <a href={`${SoTiepDanGianTiepPrint.Link}`}>Tải file</a> */}
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
      <Radio.Group
        onChange={handleRadioChange}
        value={selectedValue}
        defaultValue={"1"}
        style={{
          width: "100%",
        }}
      >
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <Radio value={"1"}>1. Phiếu đề xuất thụ lý đơn</Radio>
          </Col>
          <Col span={24}>
            <Radio value={"2"}>
              2. Thông báo về việc khiếu nại không đủ điều kiện thụ lý giải
              quyết
            </Radio>
          </Col>
          <Col span={24}>
            <Radio value={"3"}>3. Đơn không thuộc thẩm quyền xử lý</Radio>
          </Col>
          <Col span={24}>
            <Radio value={"4"}>
              4. Phiếu trả đơn chuyển không đủ thẩm quyền
            </Radio>
          </Col>
          <Col span={24}>
            <Radio value={"5"}>5. Phiếu chuyển đơn tố cáo</Radio>
          </Col>
          <Col span={24}>
            <Radio value={"6"}>6. phiếu chuyển đơn</Radio>
          </Col>
          <Col span={24}>
            <Radio value={"7"}>
              7. Phiếu hướng dẫn đơn có nhiều nội dung khác thuộc nhiều cơ quan
              có thẩm quyền giải quyết
            </Radio>
          </Col>
        </Row>
      </Radio.Group>
    </TitleModal>
  );
}
