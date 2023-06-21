import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Row } from "antd";
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
import Form from "../../../../components/uielements/form";
import api from "./config";
import apiCanBo from "../../NghiepVu/PhanXuLyDonThu/config";

import dayjs from "dayjs";
const { Item, useForm } = Form;

export default function formSearchData(props) {
  const [form] = useForm();
  const { setFilterData, setDanhSachKhieuTo } = props;
  const [danhSachCanBo, setDanhSachCanBo] = useState([]);
  const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([]);

  useEffect(() => {
    getDanhSachLoaiKhieuToCha();
    getListCanBo()
  }, []);

  const getDanhSachLoaiKhieuToCha = async () => {
    let res = await api.DanhSachLoaiKhieuToCha();
    setDanhSachLoaiDon(res.data.Data);
    setDanhSachKhieuTo(res.data.Data)
  };
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
  const FilterIcon = (image) => {
    return (
      <img
        src={image}
        alt=""
        style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
      />
    );
  };
  const getListCanBo = async () => {
    try {
      let res = await apiCanBo.DanhSachCanBo();

      let { Status, Data, Message } = res.data;

      if (Status === 1) {
        let listCanBo = Data.map((item) => ({
          value: item.CanBoID,
          label: item.TenCanBo,
        }));
        setDanhSachCanBo(listCanBo);
      } else {
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
    }
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
      <Row span={24} gutter={16}>
        <Col span={3}>
          <Form.Item label="Loại đơn" name={"LoaiKhieuToID"}>
            <Select allowClear placeholder="Loại đơn">
              {danhSachLoaiDon.map((value, index) => (
                <Option key={index} value={value.LoaiKhieuToID}>
                  {value.TenLoaiKhieuTo}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item label="Trạng thái đơn" name={"TrangThaiDon"}>
            <Select allowClear placeholder="Trạng thái đơn">
              <Option value="mới nhất">Mới nhất</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item label="Trạng thái rút đơn" name={"LoaiRutDon"}>
            <Select allowClear placeholder="Trạng thái rút đơn">
              <Option value="Danh sách rút đơn">Danh sách rút đơn</Option>
              <Option value="Danh sách chưa rút">Danh sách chưa rút</Option>

            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Cán bộ tiếp" name={"LoaiCanBoTiep"}>
            <Select allowClear options={danhSachCanBo} placeholder="Chọn cán bộ tiếp">
            </Select>
          </Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item label="Từ ngày" name={"TuNgay"}>
            <DatePicker allowClear style={{ height: "32px" }} placeholder="Từ ngày"/>
          </Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item label="Đến ngày" name={"DenNgay"} >
            <DatePicker allowClear style={{ height: "32px" }} placeholder="Đến ngày"/>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item
            label="Tìm đối tượng hoặc nội dung tiếp"
            name={"KeyWord"}
          >
            <Input allowClear placeholder="Nhập thông tin đối tượng hoặc nội dung" />
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
