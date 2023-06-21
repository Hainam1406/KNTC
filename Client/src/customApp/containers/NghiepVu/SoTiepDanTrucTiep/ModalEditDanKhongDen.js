import React, { useEffect } from "react";
import Modal from "../../../../components/uielements/modal";
import {
  Button,
  Input,
} from "../../../../components/uielements/exportComponent";
import err from "./img/error.svg";
import save from "./img/floppy-disk.svg";

import { Form, message } from "antd";
import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import api from "./config";
import { useSelector } from "react-redux";

const { Item, useForm } = Form;

const ErrorIcon = (image) => {
  return (
    <img
      src={image}
      alt=""
      style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
    />
  );
};
const SaveIcon = (image) => {
  return (
    <img
      src={image}
      alt=""
      style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
    />
  );
};

export default function ModalEditDanKhongDen(props) {
  const { open, onOk, onCancel, DanhSachDanKhongDen, data, getData, filterData } = props;
  const user = useSelector((state) => state.Auth.user);
  const [form] = useForm();
  useEffect(() => {
    if (data) {
      form &&
        form.setFieldsValue({
          ...data,
        });
    }
  }, [data]);
  const onSubmit = () => {
    let values = form.getFieldsValue();
    console.log(values, "values");
    api
      .UpdateDanKhongDen({
        ...values,
        CanBoID: user.CanBoID,
        CoQuanID: user.CoQuanID,
        NguoiTaoID: data.NguoiTaoID,
        NgayTruc: data.NgayTruc,
      })

      .then((res) => message.success(res.data.Message));
    onCancel();
    getData({...filterData });
  };
  return (
    <Modal
      title="Dân không đến"
      open={open}
      onOk={onOk}
      width="700px"
      onCancel={onCancel}
      footer={[
        <div
          style={{
            textAlign: "center",
            border: "1px solid #FF0000",
            margin: "10px 0 10px",
          }}
        >
          <Button
            key="back"
            onClick={onSubmit}
            icon={SaveIcon(save)}
            style={{
              background: "#1677ff",
              color: "#fff",
              margin: "10px 0 10px 30px",
            }}
          >
            Lưu
          </Button>
          <Button
            key="back"
            onClick={onCancel}
            icon={ErrorIcon(err)}
            style={{
              background: "#FF0000",
              color: "#fff",
              margin: "10px 0 10px 30px",
            }}
          >
            Đóng
          </Button>
        </div>,
      ]}
    >
      <Form form={form} name={"formdankhongden"}>
        <Item name={"DanKhongDenID"} {...ITEM_LAYOUT} rules={[REQUIRED]} hidden>
          <Input />
        </Item>
        <Item
          label="Ngày Tiếp"
          name={"NgayTrucStr"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Tên cán bộ"
          name={"TenCanBo"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Chức vụ" name={"ChucVu"} {...ITEM_LAYOUT}>
          <Input></Input>
        </Item>
      </Form>
    </Modal>
  );
}
