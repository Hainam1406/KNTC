import { Form, DatePicker, Row, Col, message } from "antd";
import { REQUIRED } from "../../../../../../settings/constants";
import Modal from "../../../../../../components/uielements/modal";
import {
  Button,
  Input,
} from "../../../../../../components/uielements/exportComponent";
import dayjs from "dayjs";
import { useState } from "react";
import api from "../../config";
import MyDocument from "./filePDF";
import { useSelector } from "react-redux";
const ModalDanKhongDen = ({ open, title, cancel, ...props }) => {
  const [form] = Form.useForm();
  const [date, setDate] = useState();
  const [isModalFileDanKhongDen, setIsModalFileDanKhongDen] = useState(false);
  const [dataDanKhongDen, setDataDanKhongDen] = useState();
  const user = useSelector((state) => state.Auth.user);
  const onOkonOk = async () => {
    let value = await form.validateFields();
    api
      .DanKhongDen({
        ...value,
        NgayTruc: date || value.NgayTruc,
        CanBoID: user.CanBoID,
        NguoiTaoID: user.NguoiDungID,
      })
      .then((res) => message.success(res.data.Message));
    form.resetFields();
    cancel();
  };
  const onChangeNgayTiepDan = (date, dateString) => {
    setDate(dateString);
  };
  const handelCancleFileDanKhongDen = () => {
    setIsModalFileDanKhongDen(false);
  };
  const showFileDanKhongDen = async () => {
    let value = await form.validateFields();
    setDataDanKhongDen(value);
    setIsModalFileDanKhongDen(true);
    console.log("123");
  };
  return (
    <>
      <Modal
        open={open}
        title={title}
        onCancel={cancel}
        footer={[
          <Button type={"primary"} onClick={onOkonOk}>
            Lưu
          </Button>,
          <Button type={"primary"} onClick={showFileDanKhongDen}>
            Lưu và in
          </Button>,
          <Button type={"primary"} onClick={cancel}>
            hủy
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="dankhongden"
          layout="vertical"
          initialValues={{
            NgayTruc: dayjs(),
          }}
        >
          <Row>
            <Col span={24}>
              <Form.Item label="Ngày tiếp" name={"NgayTruc"} rules={[REQUIRED]}>
                <DatePicker
                  defaultValue={dayjs("YYYY-MM-DD")}
                  placeholder="Chọn ngày"
                  style={{ width: "100%" }}
                  format={"YYYY-MM-DD"}
                  onChange={onChangeNgayTiepDan}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Lãnh đạo trực tiếp tiếp dân"
                name={"TenCanBo"}
                rules={[REQUIRED]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Chức vụ" name={"ChucVu"} rules={[REQUIRED]}>
                <Input allowClear />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <MyDocument
        open={isModalFileDanKhongDen}
        cancel={handelCancleFileDanKhongDen}
        data={dataDanKhongDen}
      />
    </>
  );
};

export default ModalDanKhongDen;
