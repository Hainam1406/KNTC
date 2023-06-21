import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Checkbox, Form, Input, Col, Row } from "antd";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/NghiepVu/SoTiepDanTrucTiep/action";
import {
  FooterPageAction,
  ButtonList,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonPrint,
  ButtonCancelForm,
} from "./styled";
import filter from "./img/filter.svg";
import file from "./img/xlsx.svg";
import err from "./img/error.svg";
import { DatePicker } from "../../../../components/uielements/exportComponent";
import { TitleModal, BgrFilterModal } from "./styled";
import api from "./config";
import { useDispatch, useSelector } from "react-redux";

const FilterIcon = (image) => {
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
  const dispatch = useDispatch();
  const lanhdaoData = useSelector(
    (res) => res.SoTiepDanTrucTiep.DanhSachLanhDao
  );
  const { open, onOk, onCancel } = props;
  // if (lanhdaoData === undefined) {
  //   dispatch(actions.getDataDanhSachLanhDao({ id: 1 }));
  // }

  const columnList = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên chủ đơn",
      dataIndex: "HoTen",
      align: "left",
      width: "10%",
    },
    {
      title: "Địa chỉ chủ đơn",
      dataIndex: "DiaChi",
      align: "left",
      width: "25%",
    },
    {
      title: "Nội dung vụ việc",
      dataIndex: "NoiDungTiep",
      align: "left",
      width: "35%",
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo",
      align: "left",
      width: "15%",
    },
    {
      title: "Ngày tiếp nhận",
      dataIndex: "NgayTiep",
      align: "left",
      width: "10%",
    },
    {
      title: "Tên lãnh đạo",
      dataIndex: "TenLanhDaoTiep",
      width: "15%",
      align: "center",
    },
  ];
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <TitleModal
      title="Danh sách công dân gặp lãnh đạo"
      open={open}
      onOk={onOk}
      width="80%"
      onCancel={onCancel}
      footer={[
        <div
          style={{
            textAlign: "center",
            border: "1px solid #FF0000",
            margin: "10px 0 10px",
          }}
        >
          <Button
            key="submit"
            type="primary"
            onClick={onOk}
            icon={FileIcon(file)}
          >
            Xuất file exel
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
            Đóng
          </Button>
        </div>,
      ]}
    >
      <BgrFilterModal>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          style={{
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row span={24}>
            <Col span={5}></Col>
            <Col span={6}>
              <Form.Item label="Từ ngày">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={6}>
              <Form.Item label="Đến ngày">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={5}></Col>
          </Row>

          <Form.Item
            wrapperCol={{
              offset: 11,
              span: 2,
            }}
          >
            <ButtonCancelPrimary
              type="primary"
              htmlType="submit"
              icon={FilterIcon(filter)}
              style={{ marginBottom: "19px" }}
            >
              Lọc dữ liệu
            </ButtonCancelPrimary>
          </Form.Item>
        </Form>
      </BgrFilterModal>
      <BoxTable
        columns={columnList}
        dataSource={lanhdaoData}
        scroll={{
          y: 500,
        }}
      />
    </TitleModal>
  );
};
