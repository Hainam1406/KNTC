import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Row, message } from "antd";
import {
  FooterPageAction,
  ButtonList,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonPrint,
  ButtonCancelForm,
} from "./styled";
import filter from "../SoTiepDanTrucTiep/img/filter.svg";
import {
  DatePicker,
  Option,
  Select,
  Input,
} from "../../../../components/uielements/exportComponent";
import Form from "../../../../components/uielements/form";
import api from "./config";
import dayjs from "dayjs";
const { Item, useForm } = Form;

export default function formSearchData({ dataSearch, ...props }) {
  const [form] = useForm();

  const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([]);

  useEffect(() => {
    getDanhSachLoaiKhieuToCha();
  }, []);

  const getDanhSachLoaiKhieuToCha = async () => {
    let res = await api.DanhSachLoaiKhieuToCha();
    setDanhSachLoaiDon(res.data.Data);
  };
  const onFinish = (values) => {
    console.log(values, "value");
    let valuesConvert = {
      ...values,
      TuNgay: values.TuNgay
        ? dayjs(values.TuNgay).format("YYYY-MM-DD")
        : undefined,
      DenNgay: values.DenNgay
        ? dayjs(values.DenNgay).format("YYYY-MM-DD")
        : undefined,
    };
console.log(valuesConvert,"valuesConvert")
    // if (valuesConvert.LoaiKhieuToID) {
    dataSearch(valuesConvert );
    // } else {
    //   dataSearch({
    //     key: 1,
    //   });
    // }
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
      form={form}
      name="formlocdulieu"
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
      autoComplete="off"
    >
      <Row span={24} gutter={8}>
        <Col span={6}>
          <Form.Item label="Loại đơn" name={"LoaiKhieuToID"}>
            <Select allowClear placeholder="Chọn loại đơn">
              {danhSachLoaiDon.map((value, index) => (
                <Option key={index} value={value.LoaiKhieuToID}>
                  {value.TenLoaiKhieuTo}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Từ ngày" name={"TuNgay"}>
            <DatePicker
              allowClear
              style={{ height: "32px" }}
              placeholder="Từ ngày"
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Đến ngày" name={"DenNgay"}>
            <DatePicker
              allowClear
              style={{ height: "32px" }}
              placeholder="Đến ngày"
            />
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item
            label="Tìm đối tượng tiếp hoặc nội dung tiếp"
            name={"KeyWord"}
          >
            <Input
              allowClear
              placeholder="Nhập thông tin đối tượng hoặc nội dung tiếp"
            />
          </Form.Item>
        </Col>
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
