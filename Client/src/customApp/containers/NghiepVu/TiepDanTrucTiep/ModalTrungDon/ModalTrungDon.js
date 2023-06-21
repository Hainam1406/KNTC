import { Row, Col } from "antd";
import {
  ModalBodyWrapper,
  ModalForm,
  ModalTable,
  ModalTableBody,
  ModalTableHeader,
} from "../../TiepDanGianTiep/styled";
import {
  Button,
  Input,
  Modal,
} from "../../../../../components/uielements/exportComponent";
import actions from "../../../../redux/NghiepVu/TiepDanTrucTiep/action";
import Form from "../../../../../components/uielements/form";
import Box from "../../../../../components/utility/box";
import LayoutWrapper from "../../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../../components/utility/pageHeader";
import PageAction from "../../../../../components/utility/pageAction";
import BoxTable from "../../../../../components/utility/boxTable";
import filter from "./img/filter.svg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useSelection from "antd/es/table/hooks/useSelection";
import apiTiepDanTrucTiep from "../config";
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../../helpers/utility";
import { useEffect, useState } from "react";
const { Item, useForm } = Form;

export default (props) => {
  const [form] = useForm();
  const [solan, setSolan] = useState();
  const dataSource = useSelector(
    (state) => state.ReducerTiepDan.DanhSachTrungDon
  );

  const dispath = useDispatch();
  const { data } = props;

  useEffect(() => {
    console.log(data);
    form.setFieldsValue({
      ...data,
      hoTen: data?.hoTen,
      cmnd: data?.cmnd,
      diachi: data?.diachi,
    });
  }, [data]);

  const FilterIcon = (image) => {
    return (
      <img
        src={image}
        alt=""
        style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
      />
    );
  };
  const PageNumber = dataSource.PageNumber
    ? parseInt(dataSource.PageNumber)
    : 1;
  const PageSize = dataSource.PageSize
    ? parseInt(dataSource.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: "Lần trùng",
      dataIndex: "SoLan",
      align: "center",
      width: "10%",
    },
    {
      title: "Cơ quan tiếp nhận",
      dataIndex: "TenCoQuan",
      align: "left",
      width: "15%",
    },
    {
      title: "Họ và tên ",
      dataIndex: "HoTen",
      align: "left",
      width: "15%",
    },
    {
      title: "Địa chỉ ",
      dataIndex: "DiaChiCT",
      align: "left",
      width: "25%",
    },
    {
      title: "Nội dung đơn thư",
      dataIndex: "NoiDungDon",
      align: "left",
      width: "35%",
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo",
      align: "left",
      width: "15%",
    },

    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      margin: "15px",
      render: (text, record) => (
        <Button
          onClick={() => {
            console.log(record);
          }}
        >
          Ckick
        </Button>
      ),
    },
  ];
  const Search = async () => {
    const value = await form.validateFields();
    dispath(actions.getData(value));
    form.setFieldsValue({
      ...value,
    });
  };

  return (
    <Modal
      title="Kiểm tra trùng đơn"
      open={props.open}
      onCancel={props.cancel}
      width={"90%"}
    >
      <Form form={form} name="form trung don" layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Họ tên" name={"hoTen"}>
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Nội dung đơn" name={"noidungdon"}>
              <Input allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="CCCD/CMTND" name={"cmnd"}>
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Địa chỉ" name={"diachi"}>
              <Input allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              wrapperCol={{
                offset: 11,
                span: 1,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                icon={FilterIcon(filter)}
                onClick={Search}
              >
                Kiểm tra trùng
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <ModalTable>
        <ModalTableHeader>
          Tổng số đơn tìm thấy: {dataSource.length || 0} đơn thư
        </ModalTableHeader>
        <ModalTableBody>
          <BoxTable
            columns={columns}
            dataSource={dataSource}
            scroll={{
              y: 300,
            }}
          />
        </ModalTableBody>
      </ModalTable>
    </Modal>
  );
};
