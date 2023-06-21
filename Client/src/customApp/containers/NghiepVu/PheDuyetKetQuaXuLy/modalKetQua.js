import React, { useState } from "react";
import Modal from "../../../../components/uielements/modal";
import { Form, Input, message, Tooltip } from "antd";
import {
  Button,
  Radio,
  Textarea,
} from "../../../../components/uielements/exportComponent";
import AddHoSo from "../TiepDanGianTiep/components/modalThemFileDinhKem";
import { ButtonCancelForm } from "./styled";
import BoxTable from "../../../../components/utility/boxTable";
import { ITEM_LAYOUT_SMALL } from "../../../../settings/constants";
import apiHoSo from "../../NghiepVu/TiepDanGianTiep/config";
import {
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import api from "./config";

export default function modalKetQua(props) {
  const { open, onCancel, onOK, dataEdit, form } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [yKien, setYKien] = useState();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      let [files, data] = values;

      files.forEach((file) => {
        formData.append("files", file);
      });

      let res = await apiHoSo.ThemFileHoSo(formData);

      let { Status, Data, Message } = res.data;

      if (Status == 1) {
        let newData = data.map((item, index) => ({
          ID: index + 1,
          ...item,
          FileUrl: Data[index].FileUrl,
        }));
        setDataSource((pre) => {
          let res = pre;

          return [...pre, ...newData];
        });
        message.success(Message);
      } else {
        let newData = data.map((item, index) => ({
          ID: dataSource.length + index + 1,
          ...item,
        }));
        setDataSource((pre) => {
          return [...pre, ...newData];
        });
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      handleCancel();
    }
  };
  const renderFileDinhKem = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role.delete ? */}
        <Tooltip title={"Tải xuống"}>
          <DownloadOutlined
            onClick={() => handleDownload(record)}
            style={{ color: "blue" }}
          />
        </Tooltip>
        {/* : ""} */}
      </div>
    );
  };
  const handleDeleteFile = (record) => {
    setDataSource((pre) => pre.filter((item) => item.ID !== record.ID));
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
  const handleDownload = (record) => {
    console.log(record.FileUrl, "fileUrl");
    message.success("Download success!");
  };
  const columns = [
    {
      title: "STT",
      width: "10%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Ngày cập nhật",
      width: "20%",
      align: "center",
      dataIndex: "NgayUp",
    },
    {
      title: "Tên hồ sơ/tài liệu",
      width: "45%",
      align: "center",
      dataIndex: "TenFile",
    },
    {
      title: "File đính kèm",
      width: "15%",
      align: "center",
      dataIndex: "FileUrl",
      render: (_, record) => renderFileDinhKem(record),
    },
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      render: (_, record) => renderThaoTac(record),
    },
  ];
  const OpenModalThemFile = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const submitForm = () => {
    api
      .SuaKetQua({
        CoQuanID: dataEdit.CoQuanID,
        XuLyDonID: dataEdit.XuLyDonID,
        DonThuID: dataEdit.DonThuID,
        SoDonThu: "",
        NguonDonDen: dataEdit.NguonDonDen,
        TenNguonDonDen: "",
        HoTen: "",
        DiaChiCT: "",
        TenLoaiKhieuTo: "",
        TenHuongGiaiQuyet: "",
        NoiDungDon: "",
        StateName: "",
        TransitionID: dataEdit.TransitionID,
        StateID: dataEdit.StateID,
        NgayQuaHan: "",
        NgayGui: "",
        FileUrl: "",
        TenFile: "",
        YKienXuLy: yKien,
        NgayXuLy: "",
        CanBoXuLyID: dataEdit.CanBoXuLyID,
        TenCanBoXuLy: "",
        Check: dataEdit.Check,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          message.success(res.data.Message);
          onCancel();
        } else {
          message.error(res.data.Message);
          onCancel();
        }
      });
  };
  const HandleYKien = (e) => {
    setYKien(e.target.value);
  };
  return (
    <Modal
      title="Cập nhật kết quả xử lý đơn thư"
      open={open}
      // onOk={submitForm}
      width="60%"
      onCancel={onCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={submitForm}
        >
          Lưu
        </Button>,
        <Button key="back" onClick={onCancel}>
          Hủy bỏ
        </Button>,
      ]}
    >
      <Form name="basic" form={form}>
        <Form.Item
          label="Ý kiến xử lý"
          name="NoiDungDon"
          {...ITEM_LAYOUT_SMALL}
        >
          <Textarea
            placeholder="Không quá 350 ký tự"
            style={{
              height: 80,
            }}
            onChange={HandleYKien}
          />
        </Form.Item>

        <Form.Item
          label="File đính kèm"
          name="CoQuanGiaiQuyet"
          {...ITEM_LAYOUT_SMALL}
        >
          <ButtonCancelForm
            style={{ color: "#fff" }}
            onClick={OpenModalThemFile}
          >
            Chọn File
          </ButtonCancelForm>
          <span style={{ color: "red", marginLeft: "5px" }}>
            (*) Chú ý: chỉ cho upload các định dạng file là .doc, .xlsx, .pdf,
            .jpeg, .png
          </span>
        </Form.Item>
        <BoxTable columns={columns} dataSource={dataSource} />
        <AddHoSo
          isModalOpen={isModalOpen}
          onCancel={handleCancel}
          onOk={handleSubmit}
        />
      </Form>
    </Modal>
  );
}
