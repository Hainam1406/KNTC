import React, { useEffect, useState } from "react";

import { Button, Col, Form, Input, Row, Collapse } from "antd";
import { REQUIRED } from "../../../../../settings/constants";
import { DatePicker } from "../../../../../components/uielements/exportComponent";
import Checkbox from "../../../../../components/uielements/checkbox";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import api from "../config";
const { Item, useForm } = Form;

const TTHSTiepDan = ({ form, chiTietDonTrung, data, STT, ...props }) => {
  const [valueCheckBox, setValueCheckBox] = useState();
  const [isDisable, setDisable] = useState(false);
  const action = useSelector((state) => state.ReducerTiepDan.actionTiepDan);
  const user = useSelector((state) => state.Auth.user);
  let formatDate = ["YYYY-MM-DD", "DD/MM/YYYY"];
  useEffect(() => {
    api.STTDonThu().then((res) =>
      form.setFieldsValue({
        SoDonThu: res.data,
      })
    );
  }, [STT]);
  useEffect(() => {
    if (chiTietDonTrung && action) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  });
  const handleDate = (dateString) => {
    let newDateString = dateString.split("T")[0];

    if (dayjs(newDateString, formatDate[0], true).isValid())
      return dayjs(newDateString, formatDate[0], true);
    else if (dayjs(newDateString, formatDate[1], true).isValid())
      return dayjs(newDateString, formatDate[1], true);
    else return undefined;
  };
  useEffect(() => {
    if (chiTietDonTrung) {
      let data = {
        NgayNhapDon: handleDate(chiTietDonTrung?.NgayNhapDon),
        VuViecCu: chiTietDonTrung?.VuViecCu,
        SoDonThu: chiTietDonTrung?.SoDonThu,
      };
      form.setFieldsValue(data);
    }
  }, [chiTietDonTrung]);

  return (
    <Form
      form={form}
      name="ThongTinTiepNhanDonThuForm"
      layout="vertical"
      initialValues={{
        VuViecCu: true,
        NgayNhapDon: dayjs(),
      }}
    >
      <Row gutter={16}>
        <Col xs={24} lg={4}>
          <Form.Item label="Số thứ tự hồ sơ" name="SoDonThu" rules={[REQUIRED]}>
            <Input disabled={true} allowClear />
          </Form.Item>
        </Col>
        <Col xs={24} lg={4}>
          <Form.Item label="Ngày tiếp" name="NgayNhapDon" rules={[REQUIRED]}>
            <DatePicker disabled={isDisable} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={4}>
          <Form.Item label="Vụ việc cũ" name="VuViecCu" valuePropName="checked">
            <Checkbox disabled={isDisable} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TTHSTiepDan;
