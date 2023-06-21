import Modal from "../../../../../../components/uielements/modal";
import {
  ModalBodyWrapper,
  ModalForm,
  ModalTable,
  ModalTableBody,
  ModalTableHeader,
} from "../../../TiepDanGianTiep/styled";
import Form from "../../../../../../components/uielements/form";
import { Col, Row, message } from "antd";
import {
  Button,
  Input,
} from "../../../../../../components/uielements/exportComponent";
import { FilterOutlined } from "@ant-design/icons";
import BoxTable from "../../../../../../components/utility/boxTable";
import { useEffect, useState } from "react";
import api from "../../config";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../../redux/NghiepVu/TiepDanTrucTiep/action";

function ModalKhieuToLan2({ isModalOpen, onCancel, onOk, data, ...props }) {
  const [danhSachDonTrung, setDanhSachDonTrung] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [dataFilter, setDataFilter] = useState();
  const tableLoading = useSelector(
    (state) => state.ReducerTiepDan.tableLoading
  );

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { hoTen, fullAddress } = data;

  const columns = [
    {
      title: "STT",
      key: "STT",
      render: (_, record, index) => index + 1,
      align: "center",
      width: "5%",
    },
    {
      title: "Lần trùng",
      dataIndex: "SoLan",
      key: "SoLan",
      align: "center",
      width: "5%",
    },
    {
      title: "Cơ quan tiếp nhận",
      dataIndex: "TenCoQuan",
      key: "TenCoQuan",
      width: "10%",
    },
    {
      title: "Họ và Tên",
      dataIndex: "HoTen",
      key: "HoTen",
      width: "15%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "DiaChiCT",
      key: "DiaChiCT",
      width: "15%",
    },
    {
      title: "Nội dung đơn",
      dataIndex: "NoiDungDon",
      key: "NoiDungDon",
      width: "35%",
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo",
      key: "TenLoaiKhieuTo",
      width: "15%",
    },
    {
      title: "Thao tác",
      key: "ThaoTac",
      render: (_, record) => (
        <Button onClick={() => handleDonTrung(record)}>Trùng đơn</Button>
      ),
      align: "center",
      width: "15%",
    },
  ];

  const handleDonTrung = (record) => {
    let { DonThuID, XuLyDonID } = record;
    dispatch(
      actions.setDonThuID({
        DonThuID,
        action: true,
        XuLyDonID,
      })
    );
    onCancel();
  };

  const getListDonTrung = async (data) => {
    setLoading(true);
    try {
      let res = await api.CheckTrungDon(data);
      let { Data, Status, Message } = res.data;
      if (Status === 1) {
        setDanhSachDonTrung(Data);
        setLoading(false);
      } else {
        message.error(Message);
        setDanhSachDonTrung([]);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSubmit = (values) => {
    setLoading(true);
    let newValues = Object.entries(values).filter(
      ([, value]) => value !== undefined && value !== ""
    );
    let dataFilter = {};
    newValues.forEach(([name, value]) => {
      dataFilter[name] = value;
    });
    getListDonTrung(dataFilter);
  };

  const handleCancel = () => {
    form.resetFields();
    setDanhSachDonTrung([]);
    onCancel();
  };

  useEffect(() => {
    let filterData = { hoTen: hoTen, diachi: fullAddress };
    form.setFieldsValue(filterData);
    if (isModalOpen)
      if (hoTen) {
        getListDonTrung(filterData);
      } else {
        setDanhSachDonTrung([]);
      }
  }, [isModalOpen, hoTen]);

  return (
    <Modal
      title="Kiểm tra khiếu tố lần 2"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button type={"primary"} onClick={handleCancel}>
          Xong
        </Button>,
      ]}
      width={1200}
    >
      <ModalBodyWrapper>
        <ModalForm>
          <Form
            name="formModalKiemTraTrungDon"
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={[24, 0]}>
              <Col className="gutter-row" span={12}>
                <Form.Item name="hoTen" label="Họ và Tên">
                  <Input />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item name="noidungdon" label="Nội dung đơn">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col className="gutter-row" span={12}>
                <Form.Item name="cmnd" label="CCCD/CMTND">
                  <Input />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item name="diachi" label="Địa chỉ">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col className="gutter-row align-center" span={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<FilterOutlined />}
                >
                  Kiểm tra
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalForm>

        <ModalTable>
          <ModalTableHeader>
            Tổng số đơn tìm thấy: {danhSachDonTrung.length} đơn thư
          </ModalTableHeader>
          <ModalTableBody>
            <BoxTable
              columns={columns}
              dataSource={danhSachDonTrung}
              loading={loading}

              // pagination={false}
            />
          </ModalTableBody>
        </ModalTable>
      </ModalBodyWrapper>
    </Modal>
  );
}

export default ModalKhieuToLan2;
