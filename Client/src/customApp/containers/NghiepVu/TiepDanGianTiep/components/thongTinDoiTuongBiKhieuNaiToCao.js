import { Col, Row, Select, message } from "antd";
import PanelBox, { PanelBoxSection } from "./PanelBox";
import Form from "../../../../../components/uielements/form";
import {
  Input,
  Selectv4,
} from "../../../../../components/uielements/exportComponent";
import { REQUIRED } from "../../../../../settings/constants";
import { useEffect, useState } from "react";
import DiaGioi from "./diaGioi";
import { useFullAddress } from "./customHook";
import { useSelector } from "react-redux";
import api from "../config";

function ThongTinDoiTuongKhieuNaiBiToCao({
  isShowPanel,
  form,
  chiTietDonTrung,
  action,
  isUpdate,
  ...props
}) {
  /*
        Loại đối tượng:
            1 - Cá nhân
            2 - Cơ quan, tổ chức
    */

  const DanhSachDanToc = useSelector(
    (state) => state.ReducerDanToc.DanhSachDanToc
  );
  const DanhSachChucVu = useSelector(
    (state) => state.DanhMucChucVu.DanhSachChucVu
  );
  const DanhSachQuocTich = useSelector(
    (state) => state.DanhMucQuocTich.DanhSachQuocTich
  );

  const [danhSachDanToc, setDanhSachDanToc] = useState([]);
  const [danhSachChucVu, setDanhSachChucVu] = useState([]);
  const [danhSachQuocTich, setDanhSachQuocTich] = useState([]);
  const [fullAddress, setData] = useFullAddress();
  const [danhSachLoaiDoiTuongBiKN, setDanhSachLoaiDoiTuongBiKN] = useState([]);
  const [loaiDoiTuong, setLoaiDoiTuong] = useState({
    name: null,
    value: null,
  });

  const [isDisableForm, setIsDisableForm] = useState(false);
  const [diaGioiID, setDiaGioiID] = useState();

  useEffect(() => {
    form.setFieldsValue(chiTietDonTrung);

    if (typeof action === "boolean") {
      setIsDisableForm(action);
    } else {
      setIsDisableForm(!isUpdate && !!chiTietDonTrung);
    }

    if (chiTietDonTrung) {
      console.log(chiTietDonTrung);
      let { TinhID, HuyenID, XaID } = chiTietDonTrung;
      setDiaGioiID({
        TinhID,
        HuyenID,
        XaID,
      });
    }
  }, [chiTietDonTrung]);

  useEffect(() => {
    form.setFieldValue("LoaiDoiTuongBiKNID", loaiDoiTuong.ID);
  }, [loaiDoiTuong]);

  const handleChangePanel = (value) => {
    setLoaiDoiTuong(value);
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldValue("DiaChiCT", fullAddress);
  }, [fullAddress]);

  useEffect(() => {
    let newListDanToc = DanhSachDanToc.map((item) => ({
      value: item.DanTocID,
      label: item.TenDanToc,
    }));

    setDanhSachDanToc(newListDanToc);
  }, [DanhSachDanToc]);

  useEffect(() => {
    let newListChucVu = DanhSachChucVu.map((item) => ({
      value: item.ChucVuID,
      label: item.TenChucVu,
    }));

    setDanhSachChucVu(newListChucVu);
  }, [DanhSachChucVu]);

  useEffect(() => {
    let newListQuocTich = DanhSachQuocTich.map((item) => ({
      value: item.QuocTichID,
      label: item.TenQuocTich,
    }));

    setDanhSachQuocTich(newListQuocTich);
  }, [DanhSachQuocTich]);

  const getListLoaiDoiTuongBiKN = async () => {
    try {
      let res = await api.DanhSachLoaiDoiTuongBiKN();

      let { Status, Data, Message } = res.data;

      if (Status === 1) {
        let newData = Data.map((item, index) => ({
          ID: item.LoaiDoiTuongBiKNID,
          value: index + 1,
          label: item.TenLoaiDoiTuongBiKN,
        }));

        setDanhSachLoaiDoiTuongBiKN(newData);
      } else {
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getListLoaiDoiTuongBiKN();
  }, []);

  useEffect(() => {
    form.setFieldValue("LoaiDoiTuongBiKNID", danhSachLoaiDoiTuongBiKN[0]?.ID);
  }, [danhSachLoaiDoiTuongBiKN]);

  return (
    <>
      <Form
        form={form}
        name="ThongTinDoiTuongKhieuNaiBiToCaoForm"
        layout="vertical"
        disabled={isDisableForm}
        scrollToFirstError={true}
      >
        {isShowPanel && isShowPanel ? (
          <PanelBox
            headerText="Loại đối tượng"
            radioData={danhSachLoaiDoiTuongBiKN}
            radioGroupName="ThongTinDoiTuongKhieuNaiBiToCao"
            onChangeRadio={handleChangePanel}
          >
            <PanelBoxSection>
              <Form.Item
                name="LoaiDoiTuongBiKNID"
                style={{ display: "none" }}
              ></Form.Item>
              {loaiDoiTuong.value === 1 && (
                <>
                  <Row gutter={16}>
                    <Col
                      className="gutter-row"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={8}
                      xl={8}
                      xxl={8}
                    >
                      <Form.Item
                        label="Họ và tên"
                        name="TenDoiTuongBiKN"
                        rules={[REQUIRED]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col
                      className="gutter-row"
                      xs={24}
                      sm={24}
                      md={12}
                      lg={8}
                      xl={8}
                      xxl={8}
                    >
                      <Form.Item label="Chức vụ" name="ChucVuID">
                        <Selectv4 options={danhSachChucVu} />
                      </Form.Item>
                    </Col>
                    <Col
                      className="gutter-row"
                      xs={24}
                      sm={24}
                      md={12}
                      lg={8}
                      xl={8}
                      xxl={8}
                    >
                      <Form.Item
                        label="Nơi công tác"
                        name="NoiCongTac"
                        rules={[REQUIRED]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col
                      className="gutter-row"
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      xl={8}
                      xxl={8}
                    >
                      <Form.Item label="Nghề nghiệp" name="NgheNghiep">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col
                      className="gutter-row"
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      xl={8}
                      xxl={8}
                    >
                      <Form.Item label="Quốc tịch" name="QuocTichID">
                        <Selectv4 options={danhSachQuocTich} />
                      </Form.Item>
                    </Col>
                    <Col
                      className="gutter-row"
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      xl={8}
                      xxl={8}
                    >
                      <Form.Item label="Dân Tộc" name="DanTocID">
                        <Selectv4 options={danhSachDanToc} />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              {loaiDoiTuong.value === 2 && (
                <>
                  <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                      <Form.Item
                        label="Tên cơ quan, tổ chức"
                        name="TenCoQuanToChuc"
                        rules={[REQUIRED]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
              <Row gutter={16}>
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={24}
                  lg={16}
                  xl={16}
                  xxl={12}
                >
                  <DiaGioi
                    form={form}
                    onChange={(data) =>
                      setData({
                        name: "diaGioi",
                        value: data,
                      })
                    }
                    diaGioiID={diaGioiID}
                  />
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
                    label="Nhập số nhà, tổ, thôn xóm, khu phố..."
                    name="SoNha"
                    onChange={(e) =>
                      setData({
                        name: "soNha",
                        value: e.target.value,
                      })
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={24}
                  xxl={8}
                >
                  <Form.Item label="Chi tiết địa chỉ" name="DiaChiCT">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
            </PanelBoxSection>
          </PanelBox>
        ) : (
          <p style={{ textAlign: "center" }}>Không có thông tin</p>
        )}
      </Form>
    </>
  );
}

export default ThongTinDoiTuongKhieuNaiBiToCao;
