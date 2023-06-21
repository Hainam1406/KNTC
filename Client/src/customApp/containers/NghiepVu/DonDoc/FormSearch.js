import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Row } from "antd";
import {
  FooterPageAction,
  ButtonList,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonPrint,
  ButtonCancelForm,
} from "../DonThuDaTiepNhan/styled";
import filter from "../SoTiepDanTrucTiep/img/filter.svg";
import {
  DatePicker,
  Option,
  Select,
  Input,
  TreeSelect,
} from "../../../../components/uielements/exportComponent";
import Form from "../../../../components/uielements/form";
import api from "../SoTiepDanTrucTiep/config";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
const { Item, useForm } = Form;

export default function formSearchData({ dataSearch, ...props }) {
  const [form] = useForm();

  const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([]);
  const [danhSachCoQuanDonVi, setDanhSachCoQuanDonVi] = useState([]);
  const DanhSachCoQuanDonVi = useSelector(
    (state) => state.DMCoQuan.DanhSachCoQuan
  );
  useEffect(() => {
    getDanhSachLoaiKhieuToCha();
  }, []);
  useEffect(() => {
    getListCoQuanDonVi(DanhSachCoQuanDonVi);
  }, [DanhSachCoQuanDonVi]);

  const getDanhSachLoaiKhieuToCha = async () => {
    let res = await api.DanhSachLoaiKhieuToCha();
    setDanhSachLoaiDon(res.data.Data);
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
        setDanhSachCoQuanDonVi(newData);
      }
    } catch (error) {
      message.error(error.message);
    }
  }
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

    dataSearch(valuesConvert);
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
        <Col span={4}>
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
            <DatePicker allowClear style={{ height: "32px" }} />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Đến ngày" name={"DenNgay"}>
            <DatePicker allowClear style={{ height: "32px" }} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Cơ quan chuyển" name="CQChuyenDonDenID">
            <TreeSelect
              // treeDefaultExpandAll
              dropdownMatchSelectWidth={false}
              treeData={danhSachCoQuanDonVi}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Chọn hướng xử lý" name="HuongGiaiQuyetID">
            <Select allowClear>
              <Option>123</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Chọn hướng xử lý" name="HuongGiaiQuyetID">
            <Select allowClear>
              <Option>123</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
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
