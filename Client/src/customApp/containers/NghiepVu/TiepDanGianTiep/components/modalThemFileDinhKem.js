import Modal from "../../../../../components/uielements/modal";
import { ModalBodyWrapper, ModalForm } from "../styled";
import Form from "../../../../../components/uielements/form";
import { Col, Row, message } from "antd";
import { Button } from "../../../../../components/uielements/exportComponent";
import { FilterOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import api from "../config";
import HoSoTaiLieuForm from "./hoSoTaiLieuForm";
import dayjs from "dayjs";

function ModalThemFileDinhKem({ isModalOpen, onCancel, onOk, data, ...props }) {
  const [danhSachFile, setDanhSachFile] = useState([]);

  const [form] = Form.useForm();

  let initialValueFileDinhKem = [{}];

  const handleSubmit = (values) => {
    let files = [];
    let data = [];
    values.FileDinhKem.forEach((item, index) => {
      const { File, ...rest } = item;

      let fileInfo = File.file.originFileObj;
      files.push(fileInfo);
      data.push({
        ...rest,
        TenFile:
          danhSachFile.find((item) => item.value === rest.TenFile)?.label || "",
        NgayUp: rest.NgayUp.format("YYYY-MM-DD"),
        TenFileGoc: fileInfo.name,
        TomTat: "",
        NguoiUp: 0,
        FileUrl: "",
        XuLyDonID: 0,
        DonThuID: 0,
        FileID: 0,
      });
    });
    handleOk([files, data]);
  };

  const resetModal = () => {
    form.resetFields();
    form.setFieldValue("FileDinhKem", initialValueFileDinhKem);
  };

  const handleCancel = () => {
    resetModal();
    onCancel();
  };

  const handleOk = (data) => {
    resetModal();
    onOk(data);
  };

  const getListFile = async () => {
    try {
      let res = await api.DanhSachFile({
        PageSize: 1000,
        PageNumber: 1,
      });

      let { Status, Data, Message } = res.data;

      if (Status === 1) {
        let newData = Data.map((item) => ({
          value: item.FileID,
          label: item.TenFile,
        }));

        setDanhSachFile(newData);
      } else {
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getListFile();
    }
  }, [isModalOpen]);

  return (
    <Modal
      {...props}
      title="Thêm mới hồ sơ/tài liệu đính kèm"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      footer={[
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          form={"formModalthemmoifiledinhkem"}
        >
          Lưu
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Hủy bỏ
        </Button>,
      ]}
    >
      <ModalBodyWrapper>
        <ModalForm>
          <Form
            name="formModalthemmoifiledinhkem"
            form={form}
            layout="hozirontal"
            onFinish={handleSubmit}
          >
            <Form.List
              name="FileDinhKem"
              initialValue={initialValueFileDinhKem}
            >
              {(fields, { add, remove }) => (
                <>
                  <HoSoTaiLieuForm
                    danhSachFile={danhSachFile}
                    onDelete={remove}
                    form={form}
                    fields={fields}
                  />
                  <Row gutter={[24, 0]}>
                    <Col className="gutter-row align-center" span={24}>
                      <Button
                        type="primary"
                        icon={<FilterOutlined />}
                        onClick={() => add()}
                      >
                        Thêm hồ sơ
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Form.List>
          </Form>
        </ModalForm>
      </ModalBodyWrapper>
    </Modal>
  );
}

export default ModalThemFileDinhKem;
