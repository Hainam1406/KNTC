import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Col, Row } from "antd";
import {
  FooterPageAction,
  ButtonList,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonPrint,
  ButtonCancelForm,
} from "./styled";
import filter from "./img/filter.svg";
import {
  DatePicker,
  Option,
  Select,
  Input,
} from "../../../../components/uielements/exportComponent";
import dayjs from "dayjs";

export default function formListLeader(props) {


  const { setFilterData } = props;

  const onFinish = (values) => {
    let valuesConvert = {
      ...values,
      TuNgay: values.TuNgay
        ? dayjs(values.TuNgay).format("YYYY-MM-DD")
        : undefined,
      DenNgay: values.DenNgay
        ? dayjs(values.DenNgay).format("YYYY-MM-DD")
        : undefined,
    };

    setFilterData(valuesConvert);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
 
  const FilterIcon = (image) => {
    return (
      <img
        src={image}
        alt=""
        style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
      />
    );
  };
  return (
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
      <Row span={24} gutter={24}>
        <Col span={4}></Col>
        <Col span={4}>
          <Form.Item label="Từ ngày" name={"TuNgay"} >
            <DatePicker  allowClear  placeholder="Từ ngày"/>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Đến ngày" name={"DenNgay"}>
            <DatePicker allowClear placeholder="Đến ngày"/>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Tìm theo tên lãnh đạo" name={"Keyword"} placeholder="Nhập tên lãnh đạo">
            <Input allowClear style={{height:"35px"}}/>
          </Form.Item>
        </Col>
        <Col span={4}></Col>
      </Row>

      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 2,
        }}
      >
        <ButtonCancelPrimary
          key="submit"
          type="primary"
          htmlType="submit"
          icon={FilterIcon(filter)}
          style={{ marginBottom: "-30px" }}
        >
          Lọc dữ liệu
        </ButtonCancelPrimary>
      </Form.Item>
    </Form>
  );
}
