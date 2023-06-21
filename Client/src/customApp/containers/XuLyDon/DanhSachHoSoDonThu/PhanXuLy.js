import React from "react";
import Modal from "../../../../components/uielements/modal";
import Form from "../../../../components/uielements/form";
import Collapse from "../../../../components/uielements/collapse";
import Box from "../../../../components/utility/box";
import { UploadOutlined, DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Input,
  Selectv4,
  DatePicker,
  Button,
  Select,
  Option,
  Textarea,
} from "../../../../components/uielements/exportComponent";
import {
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  ITEM_LAYOUT3,
  ITEM_LAYOUT_HALF,
  ITEM_LAYOUT_SMALL,
  REQUIRED,
} from "../../../../settings/constants";
import { useEffect, useState } from "react";

import { Avatar, Card, Col, InputNumber, Row, Divider, Upload, message, Tooltip } from "antd";
import BoxTable from "../../../../components/utility/boxTable";
import AddHoSo from "../../NghiepVu/TiepDanGianTiep/components/modalThemFileDinhKem";
import api from "./config";
import apiHoSo from "../../NghiepVu/TiepDanGianTiep/config";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { Meta } = Card;
export default function ModalPhanXuLy(props) {
  const { open, onOk, onCancel, dataEdit, title } = props;
  const { Item, useForm } = Form;
  const { Panel } = Collapse;
  const [ThongTinChiTietDonThu] = useForm();
  const [form] = useForm();
  const [ThongTinDoiTuongKhieuNaiBiToCaoForm] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (record) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelParent = () => {
    onCancel(), form.resetFields();
  };
  useEffect(() => {
    ThongTinChiTietDonThu.setFieldsValue({ ...dataEdit });
  }, [dataEdit]);

  useEffect(() => {
    getListCanBo();
  }, []);
  const ThemHoSo = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Ngày cập nhập ",
      dataIndex: "NgayUp",
      align: "center",
      width: "20%",
    },
    {
      title: "Tên hồ sơ ",
      dataIndex: "TenFile",
      align: "center",
      width: "25%",
    },
    {
      title: "File đính kèm ",
      // dataIndex: "TenFile",
      align: "center",
      width: "20%",
      render: (_, record) => renderFileDinhKem(record),
    },
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      margin: "15px",
      render: (text, record) => renderThaoTac(record),
    },
  ];
  const [danhSachCanBo, setThongTinBoSung] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [canBoID, setCanBoId] = useState();
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [fileMau, setFileMau] = useState();
  const [tenFile, setTenFile] = useState();

  const getListCanBo = async () => {
    try {
      let res = await api.ThongTinBoSo();

      let { Status, Data, Message } = res.data;

      if (Status === 1) {
        setThongTinBoSung(Data);
      } else {
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleDownload = (record) => {
    console.log(record.FileUrl, "fileUrl");
    message.success("Download success!");
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
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      let [files, data] = values;

      files.forEach((file) => {
        formData.append("files", file);
      });
      setFile(files);
      data.map((item) => {
        setTenFile(item.TenFile);
      });

      let res = await apiHoSo.ThemFileHoSo(formData);

      let { Status, Data, Message } = res.data;

      if (Status == 1) {
        let newData = data.map((item, index) => ({
          ID: index + 1,
          ...item,
          FileUrl: setFileUrl(Data[index].FileUrl),
        }));
        setDataSource((pre) => {
          let res = pre;
          return [...res, ...newData];
        });
        const handleData = Data.map((item) => {
          return {
            ...item,
            FileID: 0,
            NghiepVuID: 0,
            DMTenFileID: 0,
            TenFile: "",
            TomTat: "",
            TenFileGoc: "",
            NgayCapNhat: "2023-03-02",
            XuLyDonID: dataEdit.XuLyDonID,
            DonThuID: dataEdit.DonThuID,
            NguoiCapNhat: canBoID,
            FileType: 0,
            TrangThai: 0,
            FolderPath: "",
            FileUrl: fileUrl,
            NoiDung: "",
            IsBaoMat: true,
            IsMaHoa: true,
          };
        });
        setFileMau(handleData);

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

  const submitForm = async () => {
    const formData = new FormData();
    const values = await form.validateFields();
    const convertValues = [
      {
        ...values,
        NgayUp: dayjs(values.NgayUp).format("YYYY-MM-DD"),
        FileID: 0,
        NDFILE: "1-0",
        XuLyDonID: dataEdit.XuLyDonID,
        DonThuID: dataEdit.DonThuID,
        TomTat: "",
        IsBaoMat: true,
      },
    ];

    formData.append("hoSoStr", JSON.stringify(convertValues));

    file.forEach((file) => {
      formData.append("files", file);
    });

    api.CapNhatKetQua(formData).then((res) => {
      if (res.data.Status > 0) {
        message.success("cập nhật thành công");
        handleCancelParent();
        setDataSource();
      } else {
        message.error("cập nhật không thành công");
        handleCancelParent();
      }
    });
  };

  const handleChange = (value) => {
    setCanBoId(value);
  };
  return (
    <Modal
      title="Cập nhật tài liệu"
      open={open}
      // onOk={submitForm}
      width="40%"
      onCancel={handleCancelParent}
      footer={[
        <Button key="submit" type="primary" htmlType="submit" onClick={submitForm}>
          Lưu
        </Button>,
        <Button key="back" onClick={onCancel}>
          Hủy bỏ
        </Button>,
      ]}
    >
      <Form form={form}>
        <Row>
          <Col span={24}>
            <Form.Item name={"NgayUp"} label={<Col span={7}>Ngày hết hạn</Col>} {...ITEM_LAYOUT}>
              <Col span={10}>
                <DatePicker defaultValue={dayjs} />
              </Col>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label={<Col span={4}>Thông tin bổ sung</Col>} name="CanBo" {...ITEM_LAYOUT}>
              <Col span={10}>
                <Select placeholder="Chọn thông tin" onChange={handleChange}>
                  {danhSachCanBo.map((item, index) => (
                    <Option key={index} value={item.Value}>
                      {item.TenBuoc}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name={"TomTat"} label={<Col span={7}>Ghi chú</Col>} {...ITEM_LAYOUT}>
              <Textarea placeholder="Không quá 1000 ký tự" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name={"File"} label={<Col span={7}>File đính kèm</Col>} {...ITEM_LAYOUT}>
              <Button onClick={handleAdd}>Thêm hồ sơ</Button>
            </Form.Item>
          </Col>
        </Row>
        <AddHoSo
          isModalOpen={isModalOpen}
          onCancel={handleCancel}
          onOk={handleSubmit}
          form={ThongTinDoiTuongKhieuNaiBiToCaoForm}
        />
        <BoxTable columns={ThemHoSo} dataSource={dataSource} />
      </Form>
    </Modal>
  );
}
