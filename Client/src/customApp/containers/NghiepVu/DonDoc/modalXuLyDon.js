import { Col, Form, Row, Tooltip, message } from "antd";
import Collapse from "../../../../components/uielements/collapse";
import PanelBox, {
  PanelBoxSection,
} from "../TiepDanGianTiep/components/PanelBox";
import {
  ITEM_LAYOUT_SMALL,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
} from "../../../../settings/constants";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Option,
  Select,
  Textarea,
} from "../../../../components/uielements/exportComponent";
import { ButtonCancelForm } from "../DonThuDaTiepNhan/styled";
import BoxTable from "../../../../components/utility/boxTable";
import ModalThemFileDinhKem from "../TiepDanGianTiep/components/modalThemFileDinhKem";
import apiHoSo from "../TiepDanGianTiep/config";
import api from "./config";
import apiHuongGQ from "./config";
import { useForm } from "antd/es/form/Form";
import Modal from "../../../../components/uielements/modal";
import { ButtonPrint } from "../DonThuDaTiepNhan/styled";
import dayjs from "dayjs";

export default function modalXuLyDon(props) {
  const { open, onCancel, data } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [danhSachCanBo, setDanhSachCanBo] = useState([]);
  const [canBoID, setCanBoId] = useState();
  const [danhSachHuongGiaiQuyet, setDanhSachHuongGiaiQuyet] = useState([]);
  const [file, setFile] = useState([]);

  const [form] = useForm();

  const { Panel } = Collapse;
  console.log(data, "123123");

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
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      let [files, data] = values;

      files.forEach((file) => {
        formData.append("files", file);
      });
      setFile(files);
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
          return [...res, ...newData];
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
  const OpenModalThemFile = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value) => {
    setCanBoId(value);
  };

  const submitForm = async () => {
    const values = await form.validateFields();
    const convertValues = {
      ...values,
      CoQuanID: data?.CoQuanID,
      XuLyDonID: data?.XuLyDonID,
      DonThuID: data?.DonThuID,
      SoDonThu: data?.SoDonThu,
      NgayGui: dayjs(values.NgayGui).format("YYYY-MM-DD"),
    };

    // formData.append("data", JSON.stringify({ ...convertValues }));
    console.log(convertValues, "data");
    const res = await api.RaVanBanDonDoc(convertValues);
    const { Status, Message } = res.data;
    if (Status > 1) {
      message.success(Message);
    } else {
      message.error(Message);
    }

    onCancel();
  };

  return (
    <Modal
      title="Ra văn bản đôn đốc"
      open={open}
      onCancel={onCancel}
      width={1200}
      footer={[
        <div
          style={{
            textAlign: "center",
            // border: "1px solid #FF0000",
            // margin: "10px 0 10px",
          }}
        >
          <ButtonPrint key="submit" type="primary" onClick={submitForm}>
            Ra văn bản
          </ButtonPrint>

          <Button
            key="back"
            onClick={onCancel}
            style={{
              background: "#FF0000",
              color: "#fff",
              // margin: "10px 0 10px 30px",
            }}
          >
            Đóng
          </Button>
        </div>,
      ]}
    >
      <Form
        form={form}
        initialValues={{
          NgayGui: dayjs(),
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Ngày đôn đốc"
              name={"NgayGui"}
              rules={[REQUIRED]}
              labelAlign="left"
              labelCol={{
                span: 3,
              }}
              wrapperCol={{
                span: 7,
              }}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24}>
            <Form.Item
              label="Nội dung đôn đốc"
              name="NoiDungDon"
              labelAlign="left"
              rules={[REQUIRED]}
              labelCol={{
                span: 3,
              }}
              wrapperCol={{
                span: 21,
              }}
            >
              <Textarea
                autoSize={{
                  minRows: 6,
                  maxRows: 6,
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <PanelBoxSection>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="File đính kèm"
                name=""
                labelAlign="left"
                labelCol={{
                  span: 3,
                }}
                wrapperCol={{
                  span: 21,
                }}
              >
                <ButtonCancelForm
                  style={{ color: "#fff" }}
                  onClick={OpenModalThemFile}
                >
                  Chọn File
                </ButtonCancelForm>
                <span style={{ color: "red", marginLeft: "5px" }}>
                  (*) Chú ý: chỉ cho upload các định dạng file là .doc, .xlsx,
                  .pdf, .jpeg, .png
                </span>
              </Form.Item>
            </Col>
          </Row>

          <BoxTable columns={columns} dataSource={dataSource} />
        </PanelBoxSection>
      </Form>
      <ModalThemFileDinhKem
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
      />
    </Modal>
  );
}
