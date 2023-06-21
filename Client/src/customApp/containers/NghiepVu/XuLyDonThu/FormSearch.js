import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Row } from "antd";
import {
  FooterPageAction,
  ButtonList,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonPrint,
  ButtonCancelForm,
} from "../SoTiepDanTrucTiep/styled";
import filter from "./img/filter.svg";
import {
  DatePicker,
  Option,
  Select,
  Input,
} from "../../../../components/uielements/exportComponent";
import Form from "../../../../components/uielements/form";
import api from "./config"
import dayjs from "dayjs";

const { Item, useForm } = Form;

export default function FormSearch (props) {
  const [form] = useForm();
  const { setFilterData } = props;

  const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([]);
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();

  useEffect(() => {
    getDanhSachLoaiKhieuToCha();
  }, []);
  
  const getDanhSachLoaiKhieuToCha = async () => {
    await api.DanhSachKhieuTo()
    .then(res => setDanhSachLoaiDon(res.data.Data));
  };
  const onFinish = (values) => {
    let valuesConvert = {
      ...values,
      TuNgay: dateTo || "",
      DenNgay: dateFrom || "",
    };

    setFilterData(valuesConvert);
    // console.log(values)
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
  const ChangeDateTo = (date, dateString) => {
    setDateTo(dayjs(date).format("DD-MM-YYYY"));
  };
  const ChangeDateFrom = (date, dateString) => {
    setDateFrom(dayjs(date).format("DD-MM-YYYY"));
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
            <Select allowClear>
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
            <DatePicker onChange={ChangeDateTo} allowClear value={dateTo} />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Đến ngày" name={"DenNgay"}>
            <DatePicker onChange={ChangeDateFrom} allowClear value={dateFrom} />
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item
            label="Tìm đối tượng tiếp hoặc nội dung tiếp"
            name={"KeyWord"}
          >
            <Input allowClear />
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
