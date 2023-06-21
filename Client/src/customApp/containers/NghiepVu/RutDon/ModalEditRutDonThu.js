import React, { useEffect, useState } from "react";
import Modal from "../../../../components/uielements/modal";
import BoxTable from "../../../../components/utility/boxTable";
import {
  Button,
  Input,
  DatePicker,
  Textarea,
} from "../../../../components/uielements/exportComponent";
import { Tooltip } from "antd";

import { Form, message } from "antd";
import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
import { FileAddOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import api from "./config";
import apiHoSo from "../../NghiepVu/TiepDanGianTiep/config";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/NghiepVu/RutDon/action";
import AddHoSo from "../TiepDanGianTiep/components/modalThemFileDinhKem";
import { apiUrl } from "../../NghiepVu/TiepDanGianTiep/config";
import moment from "moment";
dayjs.extend(customParseFormat);
const { Item, useForm } = Form;
export default function ModalEditRutDonThu(props) {
  const { open, onOk, onCancel, data1, dataEdit } = props;
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpenRutDon, setIsModalOpenRutDon] = useState(false);
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [tenFile, setTenFile] = useState();
  const [fileMau, setFileMau] = useState();

  const dispatch = useDispatch();
  const [form] = useForm();
  const ShowModalRutDon = (record) => {
    setIsModalOpenRutDon(true);
  };
  const handleOk = () => {
    setIsModalOpenRutDon(false);
  };
  const handleCancel = () => {
    setIsModalOpenRutDon(false);
  };
  const handleCancelParent = () => {
    onCancel(), form.resetFields();
  };
  useEffect(() => {
    if (data1) {
      form &&
        form.setFieldsValue({
          ...data1,
        });
    }
  }, [data1]);

  const onSubmit = () => {
    let values = form.getFieldsValue();
    api
      .RutDonThu({
        ...values,
        XuLyDonID: data1,
      })
      .then((res) => {
        message.success(res.data.Message);
        onCancel();
        dispatch(
          actions.getData({
            PageNumber: 0,
            PageSize: 0,
          })
        );
        form.resetFields();
      })
      .catch((error) => {
        message.error(error.toString());
      });
  };

  const renderFileDinhKem = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role.delete ? */}
        <Tooltip title={"Tải xuống"}>
          <DownloadOutlined onClick={() => handleDownload(record)} style={{ color: "blue" }} />
        </Tooltip>
        {/* : ""} */}
      </div>
    );
  };

  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role.delete ? */}
        <Tooltip title={"Xóa"}>
          <DeleteOutlined onClick={() => handleDeleteFile(record)} />
        </Tooltip>
        {/* : ""} */}
      </div>
    );
  };

  const handleDownload = async (record) => {
    try {
      let regex = /([^\/\\&\?]+\.\w{3,4}(?=([\?&].*$|$)))/gm;
      let fileName = record?.FileURL?.split(regex)[1] || record?.FileUrl?.split(regex)[1];
      let uri = `${apiUrl.dowloadFile}?FileName=${fileName}`;

      let link = document.createElement("a");
      new Promise((resolve, reject) => {
        link.download = fileName;
        link.href = uri;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        resolve();
      }).then(() => {
        message.success("Tải tệp thành công!");
      });
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDeleteFile = (record) => {
    setDataSource((pre) => pre.filter((item) => item.ID !== record.ID));
  };

  const columns = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Ngày cập nhật",
      width: "10%",
      align: "center",
      dataIndex: "NgayUp",
    },
    {
      title: "Tên hồ sơ/tài liệu",
      width: "10%",
      align: "center",
      dataIndex: "TenFile",
    },
    {
      title: "File đính kèm",
      width: "10%",
      align: "center",
      dataIndex: "FileUrl",
      render: (_, record) => renderFileDinhKem(record),
    },
    {
      title: "Thao tác",
      width: "5%",
      align: "center",
      render: (_, record) => renderThaoTac(record),
    },
  ];

  return (
    <>
      <Modal
        title="Rút đơn"
        open={open}
        // onOk={submitForm}
        width="40%"
        onCancel={handleCancelParent}
        footer={[
          <Button key="submit" type="primary" htmlType="submit" onClick={onSubmit}>
            Lưu
          </Button>,
          <Button key="back" onClick={onCancel}>
            Hủy bỏ
          </Button>,
        ]}
      >
        <Form form={form} name={"formrutdon"}>
          <Form.Item
            name={"NgayRutDon"}
            label="Ngày rút đơn"
            rules={[REQUIRED]}
            {...ITEM_LAYOUT}
            initialValue={dayjs()}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item name={"LyDo"} label="Lý do rút đơn" rules={[REQUIRED]} {...ITEM_LAYOUT}>
            <Textarea placeholder="Không quá 1000 ký tự" />
          </Form.Item>

          {/* <Form.Item name={"File"} label="Quyết định đình chỉ" {...ITEM_LAYOUT}>
            <Button onClick={ShowModalRutDon}>Thêm hồ sơ</Button>
          </Form.Item> */}
        </Form>
        {/* 
        <AddHoSo isModalOpen={isModalOpenRutDon} onCancel={handleCancel} onOk={handleSubmit} />
        <BoxTable columns={columns} dataSource={dataSource} /> */}
      </Modal>
    </>
  );
}
