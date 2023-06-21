import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Row } from "antd";
import { ButtonCancelPrimary } from "../SoTiepDanTrucTiep/styled";
import filter from "./img/filter.svg";
import {
  DatePicker,
  Option,
  Select,
  InputSearch,
} from "../../../../components/uielements/exportComponent";
import Form from "../../../../components/uielements/form";
import api from "./config";
import moment from "moment";
import dayjs from "dayjs";

const { Item, useForm } = Form;

export default function formSearchData(props) {
  const [form] = useForm();
  const { SoTiepDanGianTiepSearchData, filterData, setFilterData, onFilter, onSearch } = props;

  const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([]);
  const [danhSachCoQuan, setDanhSachCoQuan] = useState([]);
  const [dateTo, setDateTo] = useState();
  const [dateFrom, setDateFrom] = useState();
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
    getDanhSachLoaiKhieuToCha();
    getDanhSachCoQuan();
    console.log("chiendas", danhSachCoQuan);
  }, []);

  const getDanhSachLoaiKhieuToCha = async () => {
    let res = await api.DanhSachLoaiKhieuToCha();
    setDanhSachLoaiDon(res.data.Data);
  };
  const getDanhSachCoQuan = async () => {
    let res = await api.DanhSachCoQuan();
    setDanhSachCoQuan(res.data.Data);
  };
  const onFinish = (values) => {
    let valuesConvert = {
      ...values,
      TuNgay: dateTo ? moment(dateTo, "YYYY-MM-DD").toDate() : null,
      DenNgay: dateFrom ? moment(dateFrom, "YYYY-MM-DD").toDate() : null,
    };

    setFilterData(valuesConvert);
  };

  const ChangeDateTo = (date, dateString) => {
    if (dateString) {
      setDateTo(dayjs(date).format("YYYY-MM-DD"));
    } else {
      setDateTo(null);
    }
  };

  const ChangeDateFrom = (date, dateString) => {
    if (dateString) {
      setDateFrom(dayjs(date).format("YYYY-MM-DD"));
    } else {
      setDateFrom(null);
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
      <Row span={24} gutter={8}>
        <Col span={4}>
          <Form.Item label="Loại đơn" name={"Loaikhieuto"}>
            <Select
              allowClear
              placeholder="Chọn loại đơn"
              onChange={(value) => onSearch(value, "LoaiKhieuToID")}
              value={filterData.LoaiKhieuToID}
            >
              {danhSachLoaiDon?.map((value) => (
                <Option key={value.LoaiKhieuToID} value={value.LoaiKhieuToID.toString()}>
                  {value.TenLoaiKhieuTo}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item label="Trạng thái rút đơn" name={"LoaiRutDonID"}>
            <Select
              allowClear
              placeholder="Xem tất cả đơn thư"
              onChange={(value) => onSearch(value, "LoaiRutDon")}
            >
              <Option value={1} key={1}>
                Danh sách rút đơn
              </Option>
              <Option value={2} key={2}>
                Danh sách chưa rút
              </Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item label="Cơ quan chuyển đơn đến" name={"CQChuyenDonDenID"}>
            <Select
              allowClear
              placeholder="Chọn cơ quan chuyển đến"
              onChange={(value) => onFilter(value, "CoQuanID")}
            >
              {danhSachCoQuan?.map((value, index) => (
                <Option key={index} value={value.CoQuanID}>
                  {value.TenCoQuan}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item label="Từ ngày" name={"TuNgay"}>
            <DatePicker
              onChange={ChangeDateTo}
              allowClear
              value={dateTo}
              placeholder={"Từ ngày"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item label="Đến ngày" name={"DenNgay"}>
            <DatePicker
              onChange={ChangeDateFrom}
              allowClear
              value={dateFrom}
              placeholder={"Đến ngày"}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Tìm đối tượng tiếp hoặc nội dung tiếp" name={"KeyWord"}>
            <InputSearch
              allowClear
              placeholder={"Tìm kiếm theo tên chủ đơn hoặc nội dung đơn"}
              onSearch={(value) => onFilter(value, "keyword")}
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
        >
          Lọc dữ liệu
        </ButtonCancelPrimary>
      </Form.Item>
    </Form>
  );
}
