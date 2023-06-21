import { Col, Row, message } from "antd";
import { PanelBoxSection } from "../../TiepDanGianTiep/components/PanelBox";
import Form, {
  LabelWithMessage,
} from "../../../../../components/uielements/form";
import {
  Input,
  Selectv4,
  Button,
} from "../../../../../components/uielements/exportComponent";
import { REQUIRED } from "../../../../../settings/constants";
import { useEffect, useState } from "react";
import DiaGioi from "./diaGioi";
import { useSelector } from "react-redux";
import api from "../config";
import ModalKiemTraTrungDon from "../components/ModalTrungDon/ModalTrungDon";

function NguoiDaiDienForm({ title, index = "", form, isDisableForm, ...rest }) {
  /*
        Giới tính: 
            0 - Nam
            1 - Nữ
    */
  const [danhSachDanToc, setDanhSachDanToc] = useState([]);
  const [soDonThuTrung, setSoDonThuTrung] = useState(0);
  const [fullAddress, setData] = useFullAddress();
  const [isModalKiemtratrungdon, setIsModalKiemtratrungdon] = useState(false);
  const [hoTen, setHoTen] = useState("");

  const DanhSachDanToc = useSelector(
    (state) => state.ReducerDanToc.DanhSachDanToc
  );
  useEffect(() => {
    form.setFieldValue("DiaChiCT", fullAddress);
  }, [fullAddress]);
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

  const checkSoDonTrung = async (name) => {
    try {
      let res = await api.CheckCoBNSoDonTrung({
        hoTen: name,
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
    value ? checkSoDonTrung(value) : setSoDonThuTrung(0);
    setHoTen(value ? value : "");
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
    isDisableForm && setSoDonThuTrung(0);
  }, [isDisableForm]);

  return (
    <PanelBoxSection title={`${title} ` + index} {...rest}>
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
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
              name={`TenDoiTuongBiKN` + index}
              rules={[REQUIRED]}
              onBlur={handleInputNameBlur}
            >
              <Input />
            </Form.Item>
          </LabelWithMessage>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item label=" ">
            <div className="form-item__action">
              <Button
                className="form-item__btn"
                onClick={openModalKiemTraTrung}
              >
                Kiểm tra trùng
              </Button>
              <Button className="form-item__btn">Khiếu tố lần 2</Button>
            </div>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item label="Giới tính" name={`GioiTinh` + index}>
            <Selectv4 options={genders} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item label="Số CCCD/CMND" name={`SoCCCD/CMND` + index}>
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item label="Dân tộc" name={`DanToc` + index}>
            <Selectv4 options={danhSachDanToc} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <DiaGioi
            number={index}
            form={form}
            onChange={(data) =>
              setData({
                name: "diaGioi",
                value: data,
              })
            }
          />
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item
            label="Nhập số nhà, tổ, thôn xóm, khu phố..."
            name={"SoNha"}
          >
            <Input
              onChange={(e) =>
                setData({
                  name: "soNha",
                  value: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item label="Chi tiết địa chỉ" name={"DiaChiCT"}>
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
        }}
      />
    </PanelBoxSection>
  );
}

export default NguoiDaiDienForm;
