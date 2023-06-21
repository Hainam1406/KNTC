import { Col, Row, Form } from "antd";
import { useEffect, useState } from "react";
import { REQUIRED } from "../../../../../settings/constants";
import api from "../../../DanhMuc/DMLoaiKhieuTo/config";
import { useSelector } from "react-redux";
import {
  Input,
  Selectv4,
  Textarea,
} from "../../../../../components/uielements/exportComponent";

const PhanLoai = ({ form, chiTietDonTrung, ...props }) => {
  const [khieuTo, setKhieuTo] = useState();
  const [danhSachLoaiKhieuTo, setDanhSachLoaiKhieuTo] = useState([]);
  const [loaiKhieuNai, setLoaiKhieuNai] = useState([]);
  const [chitiet, setChiTiet] = useState([]);
  const [danhSachKhieuTo, setDanhSachKhieuTo] = useState([]);
  const [danhSachChiTietKhieuTo, setDanhSachChiTietKhieuTo] = useState([]);
  const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([]);
  const [isDisable, setDisable] = useState(false);
  const DanhSachLoaiKhieuTo = useSelector(
    (state) => state.DanhMucLoaiKhieuTo.DanhSachCoQuan
  );
  const action = useSelector((state) => state.ReducerTiepDan.actionTiepDan);

  function handleTreeList(list) {
    let result = [];

    list.forEach((item) => {
      if (item.DanhMucLoaiKhieuToCon.length > 0) {
        result.push({
          value: item.LoaiKhieuToID,
          label: item.TenLoaiKhieuTo,
          parentID: item.LoaiKhieuToCha,
          level: item.Cap,
        });
        let res = handleTreeList(item.DanhMucLoaiKhieuToCon);
        result = result.concat(res);
      } else {
        result.push({
          value: item.LoaiKhieuToID,
          label: item.TenLoaiKhieuTo,
          parentID: item.LoaiKhieuToCha,
          level: item.Cap,
        });
      }
    });

    return result;
  }

  useEffect(() => {
    if (chiTietDonTrung) {
      if (action) {
        setDisable(true);
      } else {
        setDisable(false);
      }
      new Promise((resolve, reject) => {
        let { LoaiKhieuTo1ID, LoaiKhieuTo2ID } = chiTietDonTrung;
        handleChangeKhieuTo(LoaiKhieuTo1ID, 1);
        handleChangeKhieuTo(LoaiKhieuTo2ID, 2);
        resolve();
      }).then(() => {
        let { LoaiKhieuTo1ID, LoaiKhieuTo2ID, LoaiKhieuTo3ID } =
          chiTietDonTrung;
        form.setFieldsValue({
          LoaiKhieuTo1ID: LoaiKhieuTo1ID || undefined,
          LoaiKhieuTo2ID: LoaiKhieuTo2ID || undefined,
          LoaiKhieuTo3ID: LoaiKhieuTo3ID || undefined,
        });
      });
    }
  }, [chiTietDonTrung]);
  function handleChangeKhieuTo(id, cap) {
    if (cap === 1) {
      let listKhieuTo = danhSachLoaiKhieuTo.filter(
        (item) => item.parentID === id
      );
      form.setFieldsValue({
        LoaiKhieuTo2ID: undefined,
        LoaiKhieuTo3ID: undefined,
      });
      setDanhSachKhieuTo(listKhieuTo);
      setDanhSachChiTietKhieuTo([]);
    } else if (cap === 2) {
      let listChiTietKhieuTo = danhSachLoaiKhieuTo.filter(
        (item) => item.parentID === id
      );
      form.setFieldsValue({
        LoaiKhieuTo3ID: undefined,
      });
      setDanhSachChiTietKhieuTo(listChiTietKhieuTo);
    } else {
    }
  }
  const handleResetLoaiKhieuTo = () => {
    setDanhSachKhieuTo([]);
    setDanhSachChiTietKhieuTo([]);
  };

  useEffect(() => {
    let newListLoaiKhieuTo = handleTreeList(DanhSachLoaiKhieuTo);

    let listLoaiDon = newListLoaiKhieuTo.filter((item) => item.level === 1);

    setDanhSachLoaiDon(listLoaiDon);
    setDanhSachLoaiKhieuTo(newListLoaiKhieuTo);
  }, [DanhSachLoaiKhieuTo]);
  return (
    <Form
      form={form}
      name="phanloaivuviec"
      layout="vertical"
      disabled={isDisable}
    >
      <Row gutter={16}>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={24}
          lg={8}
          xl={8}
          xxl={4}
        >
          <Form.Item
            label="Loại đơn"
            name="LoaiKhieuTo1ID"
            rules={[REQUIRED]}
            onReset={handleResetLoaiKhieuTo}
          >
            <Selectv4
              onChange={(value) => handleChangeKhieuTo(value, 1)}
              options={danhSachLoaiDon}
            />
          </Form.Item>
        </Col>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={24}
          lg={8}
          xl={8}
          xxl={4}
        >
          <Form.Item label="Loại khiếu nại, tố cáo" name="LoaiKhieuTo2ID">
            <Selectv4
              onChange={(value) => handleChangeKhieuTo(value, 2)}
              options={danhSachKhieuTo}
            />
          </Form.Item>
        </Col>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={24}
          lg={8}
          xl={8}
          xxl={4}
        >
          <Form.Item
            label="Chi tiết loại khiếu nại, tố cáo"
            name="LoaiKhieuTo3ID"
          >
            <Selectv4 options={danhSachChiTietKhieuTo} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PhanLoai;
