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
  Input,
  Option,
  Select,
  Textarea,
} from "../../../../components/uielements/exportComponent";
import { ButtonCancelForm } from "./styled";
import BoxTable from "../../../../components/utility/boxTable";
import ModalThemFileDinhKem from "../TiepDanGianTiep/components/modalThemFileDinhKem";
import apiHoSo from "../TiepDanGianTiep/config";
import api from "../PhanXuLyDonThu/config";
import apiHuongGQ from "./config";
import { useForm } from "antd/es/form/Form";
import Modal from "../../../../components/uielements/modal";
import { ButtonPrint } from "./styled";
import dayjs from "dayjs";

export default function modalXuLyDon(props) {
  const { open, onCancel } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [danhSachCanBo, setDanhSachCanBo] = useState([]);
  const [canBoID, setCanBoId] = useState();
  const [danhSachHuongGiaiQuyet, setDanhSachHuongGiaiQuyet] = useState([]);
  const [file, setFile] = useState([]);

  const [form] = useForm();

  const { Panel } = Collapse;
  useEffect(() => {
    getListCanBo();
    getListHuongGQ();
  }, []);

  const getListCanBo = async () => {
    try {
      let res = await api.DanhSachCanBo();

      let { Status, Data, Message } = res.data;

      if (Status === 1) {
        // let listCanBo = Data.map((item) => ({
        //   value: item.CanBoID,
        //   label: item.TenCanBo,
        // }));
        setDanhSachCanBo(Data);
      } else {
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const getListHuongGQ = async () => {
    try {
      let res = await apiHuongGQ.DanhSachHuongGiaiQuyet();

      let { Status, Data, Message } = res.data;

      if (Status === 1) {
        // let listCanBo = Data.map((item) => ({
        //   value: item.CanBoID,
        //   label: item.TenCanBo,
        // }));
        setDanhSachHuongGiaiQuyet(Data);
      } else {
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
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
    // const formData = new FormData();
    const values = await form.validateFields();
    const convertValues = {
      ...values,
      // NgayUp: dayjs(values.NgayUp).format("YYYY-MM-DD"),
      // CanBo: canBoID,
      File: file,
    };

    // formData.append("data", JSON.stringify({ ...convertValues }));
    console.log(convertValues, "data");
    onCancel();
    message.success("Thêm mới hướng xử lý thành công");
  };

  return (
    <Modal
      title="Xử lý đơn"
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
            Xử lý đơn
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
      <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
        <Panel header="Hướng xử lý" key="1">
          <Form form={form}>
            <PanelBoxSection border={"none"}>
              <Row gutter={16} span={24}>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                    label="Hướng xử lý"
                    name="LoaiKhieuTo1ID"
                    rules={[REQUIRED]}
                    {...ITEM_LAYOUT_SMALL_2}
                  >
                    <Select placeholder="Chọn hướng xử lý" allowClear>
                      {danhSachHuongGiaiQuyet.map((item, index) => (
                        <Option key={index} value={item.HuongGiaiQuyetID}>
                          {item.TenHuongGiaiQuyet}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label="Lãnh đạo ký"
                    name="LoaiKhieuTo2ID"
                    rules={[REQUIRED]}
                  >
                    <Select
                      placeholder="Chọn tên cán bộ"
                      onChange={handleChange}
                      allowClear
                    >
                      {danhSachCanBo.map((item, index) => (
                        <Option key={index} value={item.CanBoID}>
                          {item.TenCanBo}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </PanelBoxSection>
            <PanelBoxSection>
              <Row>
                <Col className="gutter-row" span={24}>
                  <Form.Item label="Nội dung xử lý" name="NoiDungDon">
                    <Textarea
                      autoSize={{
                        minRows: 6,
                        maxRows: 6,
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </PanelBoxSection>
            <PanelBoxSection>
              <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                  <Form.Item label="File đính kèm" name="CoQuanGiaiQuyet">
                    <ButtonCancelForm
                      style={{ color: "#fff" }}
                      onClick={OpenModalThemFile}
                    >
                      Chọn File
                    </ButtonCancelForm>
                    <span style={{ color: "red", marginLeft: "5px" }}>
                      (*) Chú ý: chỉ cho upload các định dạng file là .doc,
                      .xlsx, .pdf, .jpeg, .png
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
        </Panel>
      </Collapse>
    </Modal>
  );
}
