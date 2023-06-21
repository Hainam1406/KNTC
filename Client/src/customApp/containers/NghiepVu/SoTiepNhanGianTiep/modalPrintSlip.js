import React, { useEffect, useState } from "react";
import { Button, Modal, Radio, Col, Row } from "antd";
import preview from "./img/preview - wihte.png";
import { ButtonPrint, TitleModal } from "../SoTiepDanTrucTiep/styled";
import err from "./img/error.svg";
import download from "./img/download - white.png";
import api from "./config";
const ErrorIcon = (image) => {
  return (
    <img
      src={image}
      alt=""
      style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
    />
  );
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

const PrintSlip = (props) => {
  const { showModalPreview, open, onOk, onCancel, dataRadio } = props;
  const [selectedValue, setSelectedValue] = useState("1");
  const [fileIds, setFileIds] = useState([]);
  const handleRadioChange = (e) => {
    const value = e.target.value;
    dataRadio(value);
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

  return (
    <>
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
            <ButtonPrint
              type="primary"
              onClick={showModalPreview}
              icon={FileIcon(preview)}
            >
              Xem trước
            </ButtonPrint>
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                fileIds.forEach((fileId) => handleDownloadClick(fileId));
              }}
              icon={FileIcon(download)}
              style={{
                margin: "10px 0 10px 30px",
              }}
            >
              Tải file
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
                7. Phiếu hướng dẫn đơn có nhiều nội dung khác thuộc nhiều cơ
                quan có thẩm quyền giải quyết
              </Radio>
            </Col>
          </Row>
        </Radio.Group>
      </TitleModal>
    </>
  );
};

export default PrintSlip;
