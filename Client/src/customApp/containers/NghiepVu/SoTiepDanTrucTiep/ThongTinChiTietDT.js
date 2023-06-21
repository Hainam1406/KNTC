import React from "react";
import Modal from "../../../../components/uielements/modal";
import Form from "../../../../components/uielements/form";
import PanelBox, { PanelBoxSection } from "./PanelBox";
import Collapse from "../../../../components/uielements/collapse";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Input,
  Selectv4,
  DatePicker,
  Button,
} from "../../../../components/uielements/exportComponent";
import { ITEM_LAYOUT_HALF, REQUIRED } from "../../../../settings/constants";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { useSelector } from "react-redux";

import Inputnumber from "../../../../components/uielements/InputNumber";
import TableCustom from "../../../../components/uielements/table";
import { Col, InputNumber, Row } from "antd";
import { NoneBorder } from "./styled";
import BoxTable from "../../../../components/utility/boxTable";
const { Item, useForm } = Form;
const ThongTinChiTietDT = ({ form, data, ...props }) => {
  const [checkInfor, SetCheckInFor] = useState(false);
  const [donThu, setDonThu] = useState();
  let formatDate = ["YYYY-MM-DD", "DD/MM/YYYY"];

  useEffect(() => {
    if (data) {
      setDonThu(data?.DonThu);
    }
  }, [data]);

  const handleDate = (dateString) => {
    let dateTime = undefined;

    if (dateString) {
      let newDateString = dateString.split("T")[0];

      if (dayjs(newDateString, formatDate[0], true).isValid())
        dateTime = dayjs(newDateString, formatDate[0], true);
      else if (dayjs(newDateString, formatDate[1], true).isValid())
        dateTime = dayjs(newDateString, formatDate[1], true);
      else dateTime = undefined;

      return newDateString;
    }

    return dateTime;
  };

  const addInFor = () => {
    SetCheckInFor(true);
  };
  const hiddenInFor = () => {
    SetCheckInFor(false);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nội dung quyết định giải quyết đơn thư",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Cơ quan thi hành",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thời gian thi hành",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Kết quả thi hành",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày thi hành",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <Form
      form={form}
      name={"formchitietdonthu"}
      initialValues={{
        TrangThai: 1,
      }}
      disabled="true"
    >
      <NoneBorder>
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <strong>Số đơn:</strong>
          </Col>
          <Col span={8}>{donThu?.SoDonThu}</Col>
          {/*  */}
          <Col span={4}>
            <strong>Ngày tiếp nhận:</strong>
          </Col>
          <Col span={8}>{handleDate(donThu?.NgayNhapDon)}</Col>
          {/*  */}
          <Col span={4}>
            <strong>Họ và tên:</strong>
          </Col>
          <Col span={18}>{donThu?.HoTen}</Col>
          {/*  */}
          <Col span={4}>
            <strong>Địa chỉ:</strong>
          </Col>
          <Col span={18}>{donThu?.DiaChiCT}</Col>
          {/*  */}
          <Col span={4}>
            <strong>Loại khiếu tố:</strong>
          </Col>
          <Col span={18}>{donThu?.TenLoaiKhieuTo1}</Col>
          {/*  */}
          <Col span={4}>
            <strong>Nội dung đơn:</strong>
          </Col>
          <Col span={18}>{donThu?.NoiDungDon}</Col>
          {/*  */}
          <Col span={4}>
            <strong>Hạn xử lý:</strong>
          </Col>
          <Col span={8}>{handleDate(donThu?.HanXuLy)}</Col>
          {/*  */}
          <Col span={4}>
            <strong>Trạng thái:</strong>
          </Col>
          <Col span={8}></Col>
          {/*  */}
          <Col span={4}>
            <strong>Hạn giải quyết:</strong>
          </Col>
          <Col span={8}>{handleDate(donThu?.HanGiaiQuyetFrist)}</Col>
          {/*  */}
          <Col span={4}>
            <strong>Trạng thái:</strong>
          </Col>
          <Col span={8}></Col>
        </Row>
      </NoneBorder>
      <hr />

      <p
        onClick={addInFor}
        style={{
          color: "#fa8c16",
          marginTop: "10px",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        <DownOutlined /> Xem chi tiết
      </p>

      {checkInfor == true ? (
        <>
          <NoneBorder>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <strong className="detail_header">1. Thông tin chung</strong>
              </Col>
              <Col span={4}>
                <strong>Nguồn đơn đến:</strong>
              </Col>
              <Col span={8}>{donThu?.TenNguonDonDen}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Cán bộ tiếp nhận:</strong>
              </Col>
              <Col span={8}>{donThu?.TenCanBoTiepNhan}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Số đơn:</strong>
              </Col>
              <Col span={8}>{donThu?.SoDonThu}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Ngày tiếp nhận:</strong>
              </Col>
              <Col span={8}>{handleDate(donThu?.NgayNhapDon)}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Đối tượng khiếu tố:</strong>
              </Col>
              <Col span={18}>{donThu?.TenLoaiDoiTuong}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Họ và tên:</strong>
              </Col>
              <Col span={8}>{donThu?.HoTen}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Giới tính:</strong>
              </Col>
              <Col span={8}>{donThu?.GioiTinh == 0 ? "nam" : "nữ"}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Dân tộc:</strong>
              </Col>
              <Col span={18}>{donThu?.DanToc}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Địa chỉ:</strong>
              </Col>
              <Col span={18}>{donThu?.DiaChi}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Loại khiếu tố:</strong>
              </Col>
              <Col span={18}>{donThu?.TenLoaiKhieuTo1}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Nơi phát sinh:</strong>
              </Col>
              <Col span={18}>{donThu?.DiaChiPhatSinh}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Nội dung đơn:</strong>
              </Col>
              <Col span={18}>{donThu?.NoiDungDon}</Col>
            </Row>
            {/* --------            */}
            <hr></hr>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <strong className="detail_header">2. Thông tin xử lý</strong>
              </Col>
              <Col span={4}>
                <strong>Ngày phân công:</strong>
              </Col>
              <Col span={8}>{handleDate(donThu?.NgayPhan)}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Hạn xử lý:</strong>
              </Col>
              <Col span={8}>{handleDate(donThu?.HanXuLy)}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Cơ quan xử lý:</strong>
              </Col>
              <Col span={8}>{donThu?.TenPhongBanXuLy}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Cán bộ xử lý:</strong>
              </Col>
              <Col span={8}>{donThu?.TenCanBoXuLy}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Ngày xử lý:</strong>
              </Col>
              <Col span={8}>{handleDate(donThu?.NgayXuLyDon)}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Hướng xử lý:</strong>
              </Col>
              <Col span={8}>{donThu?.TenHuongGiaiQuyet}</Col>
              {/*  */}
            </Row>
            {/* --------            */}
            <hr></hr>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <strong className="detail_header">
                  3. Thông tin giải quyết
                </strong>
              </Col>
              <Col span={4}>
                <strong>Cơ quan giao:</strong>
              </Col>
              <Col span={8}>{donThu?.TenCoQuanGQ}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Ngày giao:</strong>
              </Col>
              <Col span={8}>{handleDate(donThu?.NgayGiao)}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Cơ quan phụ trách:</strong>
              </Col>
              <Col span={8}>{donThu?.TenCoQuanTiepNhan}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Cơ quan phối hợp:</strong>
              </Col>
              <Col span={8}>{donThu?.TenCoQuanPhoiHop_Str}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Hạn giải quyết:</strong>
              </Col>
              <Col span={8}>{handleDate(donThu?.HanGiaiQuyetFrist)}</Col>
              {/*  */}
              <Col span={4}>
                <strong>Trạng thái:</strong>
              </Col>
              <Col span={8}>{donThu?.StateName}</Col>
              {/*  */}
              <Col span={24}>
                <strong>Thông tin tổ xác minh</strong>
              </Col>
              <Col span={4}>
                <strong>- Cán bộ phụ trách:</strong>
              </Col>
              <Col span={18}>{donThu?.TenCanBoTiepNhan}</Col>
              <Col span={4}>
                <strong>- Cán bộ phối hợp:</strong>
              </Col>
              <Col span={18}>{donThu?.TenCanBoPhoiHop}</Col>
              <Col span={4}>
                <strong>- Cán bộ theo dõi:</strong>
              </Col>
              <Col span={18}>{donThu?.TenCanBoTheoDoi}</Col>
              <Col span={24}>
                <strong>Kết quả ban hành</strong>
              </Col>
              <Col span={4}>
                <strong>Số quyết định:</strong>
              </Col>
              <Col span={8}>{donThu?.SoQuyetDinh}</Col>
              <Col span={4}>
                <strong>Ngày quyết định:</strong>
              </Col>
              <Col span={8}>{handleDate(donThu?.NgayQuyetDinh)}</Col>
              <Col span={4}>
                <strong>Cơ quan ban hành:</strong>
              </Col>
              <Col span={8}>{donThu?.CoQuanBanHanh}</Col>
              <Col span={4}>
                <strong>Quyết định:</strong>
              </Col>
              <Col span={8}>{donThu?.QuyetDinh}</Col>
              <Col span={4}>
                <strong>Phân tích kết quả:</strong>
              </Col>
              <Col span={8}>{donThu?.PhanTichKetQua}</Col>
              <Col span={4}>
                <strong>Kết quả QĐ lần 2:</strong>
              </Col>
              <Col span={8}>{donThu?.KetQuaQDLan2}</Col>
              {/* <Col span={24}>
                <strong>
                  Nội dung quyết định và kết quả theo dõi thực thi QĐ:{" "}
                </strong>
              </Col>
              <BoxTable columns={columns}></BoxTable> */}
            </Row>
            <p
              onClick={hiddenInFor}
              style={{
                color: "#fa8c16",
                marginTop: "20px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              <UpOutlined /> Ẩn chi tiết
            </p>
          </NoneBorder>
        </>
      ) : (
        <></>
      )}
    </Form>
  );
};
export default ThongTinChiTietDT;
