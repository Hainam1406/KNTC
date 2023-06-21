import React, { useState } from "react";
import { Button, Modal } from "antd";
import preview from "./img/preview - wihte.png";
import leftWihte from "./img/leftWihte.png";
import download from "./img/download - white.png";
import err from "./img/error.svg";
import { ButtonPrint, TitleModal } from "../SoTiepDanTrucTiep/styled";
const FileIcon = (image) => {
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
const PreviewSlip = (props) => {
  const { open, onCancel, onOK, data } = props;
  console.log("chien", data);

  return (
    <>
      <TitleModal
        title="Xem trước phiếu"
        open={open}
        onOk={onOK}
        onCancel={onCancel}
        width={700}
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
              icon={FileIcon(download)}
              onClick={onOK}
              style={{
                margin: "10px 0 10px 30px",
              }}
            >
              <a
                href={`https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepNhan_GianTiep/GetFile?id=${data}`}
              >
                Tải file
              </a>
            </Button>
            <Button
              key="submit"
              type="primary"
              icon={FileIcon(leftWihte)}
              onClick={onCancel}
              style={{
                margin: "10px 0 10px 30px",
                background: "orange",
              }}
            >
              Quay lại
            </Button>
            <Button
              key="back"
              icon={ErrorIcon(err)}
              onClick={onCancel}
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
        <iframe
          src={`https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepNhan_GianTiep/FileView_V2?id=${data}`}
          width="100%"
          height="600px"
          style={{ border: "none" }}
        ></iframe>
      </TitleModal>
    </>
  );
};

export default PreviewSlip;
