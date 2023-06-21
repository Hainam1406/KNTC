import React, { useEffect, useState } from "react";
import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
import { Form, message, Space, Table, Tag, Upload } from "antd";
import axios from "axios";
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
} from "../../../../components/uielements/exportComponent";
import { FileAddOutlined } from "@ant-design/icons";

import { checkInputNumber } from "../../../../helpers/utility";
import styled from "styled-components";
import Checkbox from "../../../../components/uielements/checkbox";
import modal from "../../../../components/uielements/modal";
import { InputFormatSpecific } from "../../../../components/uielements/exportComponent";

import api from "./config";
const { Item, useForm } = Form;
export default (props) => {
  const [form] = useForm();
  const [upload, setUpload] = useState();
  const { dataEdit, loading, visible, action } = props;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    if (dataEdit && dataEdit.BieuMauID) {
      // console.log(dataEdit);
      form &&
        form.setFieldsValue({
          ...dataEdit,
        });
    }
  }, []);
  // const onChange = (e) => {
  //   console.log(`radio = ${Boolean(e.target.value)}`);
  // };
  const onOk = async (e) => {
    e.preventDefault();

    if (action === "edit") {
      const value = await form.validateFields();
      let formData = new FormData();
      formData.append(
        "bieuMauStr",
        JSON.stringify({
          CapID: value.CapID,
          MaPhieuIn: value.MaPhieuIn,
          TenBieuMau: value.TenBieuMau,
          DuocSuDung: value.DuocSuDung,
          BieuMauID: value.BieuMauID,
        })
      );
      upload ? formData.append("upload", upload.file.originFileObj) : null;
      props.onCreate(formData);
    } else {
      const value = await form.validateFields();
      let formData = new FormData();
      formData.append(
        "bieuMauStr",
        JSON.stringify({
          CapID: value.CapID,
          MaPhieuIn: value.MaPhieuIn,
          TenBieuMau: value.TenBieuMau,
          DuocSuDung: value.DuocSuDung,
        })
      );
      formData.append("upload", upload.file.originFileObj);
      props.onCreate(formData);
    }
    // console.log(upload);

    // console.log(formData);
    // try {
    //   await axios({
    //     method: "post",
    //     url: "http://192.168.55.121:8188/api/v2/DanhMucBieuMau/ThemBieuMau",
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const StyledImport = styled.div`
    .ant-input {
      padding: 0;
      border: none;
    }
  `;
  const StyledText = styled.span`
    color: cornflowerblue;
  `;
  const StyledMargin = styled.span`
    margin-right: 10px;
  `;
  const StyledBtnUpload = styled.div`
    button {
      background-color: #2878d7;
    }

    .crdzPD.ant-btn {
      color: white;
    }
    button:hover {
      background-color: #2878d7;
    }
    .ant-btn {
      background-color: #2878d7;
    }
    .uploadFile {
      margin-left: 20px;
    }
  `;
  const onChangeDanhSachCap = (value) => {
    console.log(value);
  };

  const [danhsachcap, setDanhSachCap] = useState([]);
  useEffect(() => {
    api.DanhSachCap().then((res) => setDanhSachCap(res.data.Data));
  }, []);
  const uploadFile = {
    // name: "file",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // headers: {
    //   authorization: "authorization-text",
    // },
    onChange(info) {
      console.log(info);
      setUpload(info);
    },
  };
  return (
    <Modal
      title={`${action === "edit" ? "" : "Thêm"} cập nhật biểu mẫu`}
      width={600}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="formquoctich"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={"formbieumau"}
        initialValues={{
          TrangThai: 1,
          CapID: 4,
          DuocSuDung: true,
        }}
      >
        {action === "edit" ? <Item name={"BieuMauID"} hidden /> : ""}
        <Item label="Biểu mẫu cấp " name={"CapID"} {...ITEM_LAYOUT} rules={[REQUIRED]}>
          <Select onChange={handleChange}>
            {danhsachcap.map((items) => (
              <Option value={items.CapID}>{items.TenCap}</Option>
            ))}
          </Select>
        </Item>
        <Item label="Mã biểu mẫu" name={"MaPhieuIn"} {...ITEM_LAYOUT} rules={[REQUIRED]}>
          <InputFormatSpecific />
        </Item>
        <Item label="Tên biểu mẫu" name={"TenBieuMau"} {...ITEM_LAYOUT} rules={[REQUIRED]}>
          <Input />
        </Item>
        <Item label="Sử dụng" name="DuocSuDung" valuePropName="checked" {...ITEM_LAYOUT}>
          <Checkbox></Checkbox>
        </Item>
        {action === "edit" ? (
          <Item
            label="Chọn file mẫu từ máy tính"
            name={"importData"}
            {...ITEM_LAYOUT}
            // rules={[REQUIRED]}
          >
            <StyledImport>
              <Upload {...uploadFile}>
                <StyledBtnUpload>
                  <Button icon={<FileAddOutlined />}>Chọn file</Button>{" "}
                  {/* <span className="uploadFile">chưa chọn file!</span> */}
                </StyledBtnUpload>
              </Upload>
            </StyledImport>
          </Item>
        ) : (
          <Item
            label="Chọn file mẫu từ máy tính"
            name={"importData"}
            {...ITEM_LAYOUT}
            rules={[REQUIRED]}
          >
            <StyledImport>
              <Upload {...uploadFile}>
                <StyledBtnUpload>
                  <Button icon={<FileAddOutlined />}>Chọn file</Button>
                </StyledBtnUpload>
              </Upload>
            </StyledImport>
          </Item>
        )}
      </Form>
    </Modal>
  );
};
