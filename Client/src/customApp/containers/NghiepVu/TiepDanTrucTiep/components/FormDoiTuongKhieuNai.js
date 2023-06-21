import { Col, Row, message, Radio } from "antd";
import { PanelBoxSection } from "../../TiepDanGianTiep/components/PanelBox";
import Form, {
  LabelWithMessage,
} from "../../../../../components/uielements/form";
import {
  Input,
  Selectv4,
  Button,
  DatePicker,
} from "../../../../../components/uielements/exportComponent";
import { REQUIRED } from "../../../../../settings/constants";
import { useEffect, useState } from "react";
import DiaGioi from "./diaGioi";
import { useSelector } from "react-redux";
import api from "../config";
import ModalKiemTraTrungDon from "./ModalTrungDon/ModalTrungDon";
import ModalKhieuToLan2 from "./ModalTrungDon/ModalKTL2";
import { useFullAddress } from "../../TiepDanGianTiep/components/customHook";
import { CheckboxGroup } from "../../../../../components/uielements/checkbox";
import { RadioGroup } from "../../../../../components/uielements/radio";

function NguoiDaiDienForm({
  title,
  index = "",
  form,
  nameField,
  resetField,
  valueForm,
  isDisableForm,
  loaiDoiTuong,
  isFormList,
  diaGioiID,
  ...rest
}) {
  /*
        Giới tính: 
            0 - Nam
            1 - Nữ
    */
  const [danhSachDanToc, setDanhSachDanToc] = useState([]);
  const [danhSachQuocTich, setDanhSachQuocTich] = useState([]);
  const [soDonThuTrung, setSoDonThuTrung] = useState(0);
  const [isModalKiemtratrungdon, setIsModalKiemtratrungdon] = useState(false);
  const [isModalKhieuToLan2, setIsModalKhieuToLan2] = useState(false);
  const [ThongTinDaiDien, setThongTinDaiDien] = useState({
    DaiDienPhatLy: true,
    DuocUyQuyen: true,
  });
  const [hoTen, setHoTen] = useState("");
  const [fullAddress, setData] = useFullAddress();

  const DanhSachDanToc = useSelector(
    (state) => state.ReducerDanToc.DanhSachDanToc
  );
  const DanhSachQuocTich = useSelector(
    (state) => state.DanhMucQuocTich.DanhSachQuocTich
  );
  const genders = [
    {
      value: 0,
      label: "Nam",
    },
    {
      value: 1,
      label: "Nữ",
    },
  ];

  const getListDanToc = (list) => {
    try {
      let listDanToc = list.map((item) => ({
        value: item.DanTocID,
        label: item.TenDanToc,
      }));
      setDanhSachDanToc(listDanToc);
    } catch (error) {
      message.error(error.message);
    }
  };
  const getListQuocTich = (list) => {
    try {
      let listQuocTich = list.map((item) => ({
        value: item.QuocTichID,
        label: item.TenQuocTich,
      }));
      setDanhSachQuocTich(listQuocTich);
    } catch (error) {}
  };

  const checkSoDonTrung = async (data) => {
    try {
      let res = await api.CheckCoBNSoDonTrung({
        ...data,
      });

      const { Status, Data, Message } = res.data;
      if (Status === 1) {
        setSoDonThuTrung(Data);
      } else {
        message.error(Message);
        setSoDonThuTrung(0);
      }
    } catch (error) {
      message.error(error.message);
      setSoDonThuTrung(0);
    }
  };

  const handleInputNameBlur = (e) => {
    const { value } = e.target;
    value
      ? checkSoDonTrung({ hoTen: value, diachi: fullAddress })
      : setSoDonThuTrung(0);
    setHoTen(value ? value : "");
  };

  const openModalKhieuToLan2 = () => {
    setIsModalKhieuToLan2(true);
  };
  const closeKhieuToLan2 = () => {
    setIsModalKhieuToLan2(false);
  };
  const openModalKiemTraTrung = () => {
    setIsModalKiemtratrungdon(true);
  };

  const closeModalKiemTraTrung = () => {
    setIsModalKiemtratrungdon(false);
  };

  const sumbitModalKiemTraTrung = (values) => {
    closeModalKiemTraTrung();
  };

  useEffect(() => {
    getListDanToc(DanhSachDanToc);
  }, [DanhSachDanToc]);
  useEffect(() => {
    getListQuocTich(DanhSachQuocTich);
  }, [DanhSachQuocTich]);
  const handleChangeSoNha = (e) => {
    let { value } = e.target;
    setData({
      name: "soNha",
      value: value,
    });
  };
  useEffect(() => {
    if (isFormList) {
      let nguoiDaiDienFields = form.getFieldValue("NguoiDaiDien");
      nguoiDaiDienFields[nameField] = {
        ...nguoiDaiDienFields[nameField],
        DiaChiCT: fullAddress,
      };
      form.setFieldValue("NguoiDaiDien", nguoiDaiDienFields);
    } else form.setFieldValue("DiaChiCT", fullAddress);
    hoTen
      ? checkSoDonTrung({ hoTen: hoTen, diachi: fullAddress })
      : setSoDonThuTrung(0);
  }, [fullAddress]);

  const onReset = () => {
    setHoTen("");
    setSoDonThuTrung(0);
  };

  return (
    <PanelBoxSection title={`${title} ` + index} {...rest}>
      <Row gutter={16}>
        {valueForm ? (
          <Col span={24}>
            <Form.Item label="" name={"ThongTinUyQuyen"}>
              <RadioGroup>
                <Radio value={1}>Đại diện pháp lý</Radio>
                <Radio value={2}>Được ủy quyền</Radio>
              </RadioGroup>
            </Form.Item>
          </Col>
        ) : (
          ""
        )}
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={24}
          lg={8}
          xl={8}
          xxl={8}
          span={8}
        >
          <LabelWithMessage
            message={
              soDonThuTrung > 0
                ? `Tìm thấy ${soDonThuTrung} đơn thư có thể trùng`
                : ""
            }
            onClick={openModalKiemTraTrung}
          >
            <Form.Item
              label="Họ Tên"
              name={isFormList ? [nameField, "HoTen"] : "HoTen"}
              rules={[REQUIRED]}
              onBlur={handleInputNameBlur}
              onReset={onReset}
            >
              <Input />
            </Form.Item>
          </LabelWithMessage>
        </Col>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={6}
          lg={6}
          xl={6}
          xxl={4}
          span={8}
        >
          <Form.Item label=" ">
            <div className="form-item__action">
              <Button
                className="form-item__btn"
                onClick={openModalKiemTraTrung}
              >
                Kiểm tra trùng
              </Button>
              <Button className="form-item__btn" onClick={openModalKhieuToLan2}>
                Khiếu tố lần 2
              </Button>
            </div>
          </Form.Item>
        </Col>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={24}
          lg={6}
          xl={5}
          xxl={4}
        >
          <Form.Item
            label="Số CCCD/CMND"
            name={isFormList ? [nameField, "CMND"] : "CMND"}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={4}
          xl={5}
          xxl={4}
          className="gutter-row"
        >
          <Form.Item
            label="Ngày cấp"
            name={isFormList ? [nameField, "NgayCap"] : "NgayCap"}
          >
            <DatePicker></DatePicker>
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={4}
          xl={8}
          xxl={4}
          className="gutter-row"
        >
          <Form.Item
            label="Nơi cấp"
            name={isFormList ? [nameField, "NoiCap"] : "NoiCap"}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={24}
          lg={4}
          xl={4}
          xxl={4}
        >
          <Form.Item
            label="Giới tính"
            name={isFormList ? [nameField, "GioiTinh"] : "GioiTinh"}
          >
            <Selectv4 options={genders} />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={4}
          xl={4}
          xxl={4}
          span={4}
          className="gutter-row"
        >
          <Form.Item
            label="Điện thoại"
            name={isFormList ? [nameField, "SoDienThoai"] : "SoDienThoai"}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={24}
          lg={4}
          xl={4}
          xxl={4}
          span={4}
        >
          <Form.Item
            label="Dân tộc"
            name={isFormList ? [nameField, "DanTocID"] : "DanTocID"}
          >
            <Selectv4 options={danhSachDanToc} />
          </Form.Item>
        </Col>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={24}
          lg={4}
          xl={4}
          xxl={4}
          span={4}
        >
          <Form.Item
            label="Quốc tich"
            name={isFormList ? [nameField, "QuocTichID"] : "QuocTichID"}
          >
            <Selectv4 options={danhSachQuocTich} />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={4}
          xl={8}
          xxl={8}
          span={8}
          className="gutter-row"
        >
          <Form.Item
            label="Nghề nghiệp"
            name={isFormList ? [nameField, "NgheNghiep"] : "NgheNghiep"}
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
          xl={16}
          xxl={12}
        >
          <DiaGioi
            number={index}
            form={form}
            isFormList={isFormList}
            nameField={nameField}
            diaGioiID={diaGioiID}
            onChange={(data) => setData({ name: "diaGioi", value: data })}
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
            name={isFormList ? [nameField, "SoNha"] : "SoNha"}
            onChange={handleChangeSoNha}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col
          className="gutter-row"
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={16}
          xxl={8}
        >
          <Form.Item
            label="Chi tiết địa chỉ"
            name={isFormList ? [nameField, "DiaChiCT"] : "DiaChiCT"}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>

      <ModalKiemTraTrungDon
        isModalOpen={isModalKiemtratrungdon}
        onCancel={closeModalKiemTraTrung}
        onOk={sumbitModalKiemTraTrung}
        data={{
          hoTen,
          fullAddress,
        }}
      />
      <ModalKhieuToLan2
        isModalOpen={isModalKhieuToLan2}
        onCancel={closeKhieuToLan2}
        onOk={sumbitModalKiemTraTrung}
        data={{
          hoTen,
          fullAddress,
        }}
      />
    </PanelBoxSection>
  );
}

export default NguoiDaiDienForm;
