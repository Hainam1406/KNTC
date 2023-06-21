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
  TreeSelect,
} from "../../../../components/uielements/exportComponent";
import Form from "../../../../components/uielements/form";
import api from "./config"
import dayjs from "dayjs";

const { Item, useForm } = Form;

export default function FormSearch(props) {
  const [form] = useForm();
  const { setFilterData } = props;

  const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([]);
  const [loaiCoQuan, setLoaiCoQuan] = useState([]);
  const [danhSachCoQuan, setDanhSachCoQuan] = useState([]);
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();

  useEffect(() => {
    getDanhSachLoaiKhieuToCha();
    getDanhSachCoQuan();
  }, []);

  const getDanhSachLoaiKhieuToCha = async () => {
    await api.DanhSachKhieuTo()
      .then(res => setDanhSachLoaiDon(res.data.Data))
  };

  const getDanhSachCoQuan = async () => {
    await api.DanhSachCoQuan()
      .then(res => setLoaiCoQuan(res.data.Data))
  };

  function handleTreeCoQuanDonVi(list) {
    return list.map((item) => {
      if (item.Children.length > 0) {
        return {
          title: item.Ten,
          value: item.ID,
          children: handleTreeCoQuanDonVi(item.Children),
        };
      } else {
        return {
          title: item.Ten,
          value: item.ID,
        };
      }
    });
  }

  function getListCoQuanDonVi(list) {
    try {
      if (list) {
        let newData = handleTreeCoQuanDonVi(list);
        setDanhSachCoQuan(newData);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  const onFinish = (values) => {
    console.log(values, "values");
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
  useEffect(() => {
    getListCoQuanDonVi(loaiCoQuan)
  }, [loaiCoQuan])
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
        <Col span={8}>
          <Form.Item label="Chọn cơ quan" name={"CoQuanID"}>
            <TreeSelect
              allowClear
              // treeDefaultExpandAll
              dropdownMatchSelectWidth={false}
              treeData={danhSachCoQuan}
            />
          </Form.Item>
        </Col>
        <Col span={5}>
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
        <Col span={11}>
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

