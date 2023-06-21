import { Col, Row, Select } from "antd";
import PanelBox, {
  PanelBoxSection,
} from "../../TiepDanGianTiep/components/PanelBox";
import Form from "../../../../../components/uielements/form";
import {
  Input,
  Selectv4,
} from "../../../../../components/uielements/exportComponent";
import { REQUIRED } from "../../../../../settings/constants";
import { useEffect, useState } from "react";
import NguoiDaiDienForm from "../../TiepDanGianTiep/components/NguoiDaiDienForm";
import DiaGioi from "../components/diaGioi";
import { useSelector } from "react-redux";
import api from "../../TiepDanGianTiep/config";

function ThongTinDoiTuongKhieuNaiBiToCao({ isShowPanel, form, ...props }) {
  /*
        Loại đối tượng:
            1 - Cá nhân
            2 - Cơ quan, tổ chức
    */

  const [loaiDoiTuong, setLoaiDoiTuong] = useState({
    name: null,
    value: null,
  });
  const [danhSachLoaiDoiTuongBiKN, setDanhSachLoaiDoiTuongBiKN] = useState([]);
  const danhMucChucVu = useSelector((res) => res.DanhMucChucVu.DanhSachChucVu);
  const DanhSachDanToc = useSelector(
    (state) => state.ReducerDanToc.DanhSachDanToc
  );
  const DanhSachQuocTich = useSelector(
    (state) => state.DanhMucQuocTich.DanhSachQuocTich
  );
  const [isDisable, setDisable] = useState(false);
  const action = useSelector((state) => state.ReducerTiepDan.actionTiepDan);

  useEffect(() => {
    if (chiTietDonTrung && action) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  });
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

  const handleChangePanel = (value) => {
    setLoaiDoiTuong(value);
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        name="ThongTinDoiTuongKhieuNaiBiToCaoForm"
        layout="vertical"
        disabled={isDisable}
      >
        {isShowPanel && isShowPanel ? (
          <PanelBox
            headerText="Loại đối tượng"
            radioData={danhSachLoaiDoiTuongBiKN}
            radioGroupName="ThongTinDoiTuongKhieuNaiBiToCao"
            onChangeRadio={handleChangePanel}
          >
            {loaiDoiTuong.value === 1 && (
              <PanelBoxSection>
                <Row gutter={16}>
                  <Col className="gutter-row" span={8}>
                    <Form.Item
                      label="Họ và tên"
                      name="HoTen"
                      rules={[REQUIRED]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="Chức vụ" name="ChucVu">
                      <Selectv4>
                        {danhMucChucVu.map((item) => (
                          <Option value={item.ChucVuID}>
                            {item.TenChucVu}
                          </Option>
                        ))}
                      </Selectv4>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
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
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="Nghề nghiệp" name="NgheNghiep">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="Quốc tịch" name="QuocTich">
                      <Selectv4>
                        {DanhSachQuocTich.map((item) => (
                          <Option value={item.QuocTichID}>
                            {item.TenQuocTich}
                          </Option>
                        ))}
                      </Selectv4>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="Dân Tộc" name="DanToc">
                      <Selectv4>
                        {DanhSachDanToc.map((item) => (
                          <Option value={item.DanTocID}>
                            {item.TenDanToc}
                          </Option>
                        ))}
                      </Selectv4>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col className="gutter-row" span={12}>
                    <DiaGioi form={form} />
                  </Col>
                  <Col className="gutter-row" span={4}>
                    <Form.Item
                      label="Nhập số nhà, tổ, thôn xóm, khu phố..."
                      name="SoNha"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="Chi tiết địa chỉ" name="ChiTietDiaChi">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </PanelBoxSection>
            )}

            {loaiDoiTuong.value === 2 && (
              <>
                <PanelBoxSection>
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
                  <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                      <DiaGioi form={form} />
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <Form.Item
                        label="Nhập số nhà, tổ, thôn xóm, khu phố..."
                        name="SoNha"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <Form.Item label="Chi tiết địa chỉ" name="ChiTietDiaChi">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </PanelBoxSection>
              </>
            )}
          </PanelBox>
        ) : (
          <p style={{ textAlign: "center" }}>Không có thông tin</p>
        )}
      </Form>
    </>
  );
}

export default ThongTinDoiTuongKhieuNaiBiToCao;
