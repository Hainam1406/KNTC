import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/NghiepVu/PheDuyetKetQuaXuLy/action";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import {
  changeUrlFilter,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import FormSearchData from "../PhanXuLyDonThu/formSearchData";

import Wrapper, {
  FooterPageAction,
  ButtonList,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonPrint,
  ButtonCancelForm,
} from "./styled";
import api from "./config";
import list from "./img/list.svg";
import print from "./img/printer.svg";
import work from "./img/working-with-laptop.svg";
import { Tabs, Tooltip, Modal, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { BgrColorTabs } from "./styled";
import ModalList from "./modalAddEdit";
import { Link } from "react-router-dom";
// import { Modal, ModalCustom } from "../../../../components/uielements/exportComponent";
import ModalChiTiet from "../SoTiepDanTrucTiep/modalChiTiet";
import Form from "../../../../components/uielements/form";

import Collapse from "../../../../components/uielements/collapse";
import { Button } from "../../../../components/uielements/exportComponent";
import ModalPheDuyet from "./modalPheDuyet";
import ModalKetQua from "./modalKetQua";
import { ButtonDisabled } from "../DonThuDaTiepNhan/styled";
import dayjs from "dayjs";

const { Panel } = Collapse;

const QLNamHoc = (props) => {
  const { Item, useForm } = Form;
  const [form] = useForm();
  const { PheDuyetKetQuaXuLy, TotalRow, role } = props;

  document.title = "Phê duyệt kết quả xử lý";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLanhDao, setIsModalOpenLanhDao] = useState(false);
  const [isModalOpenPheDuyet, setIsModalOpenPheDuyet] = useState(false);
  const [isModalOpenKetQua, setIsModalOpenKetQua] = useState(false);

  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [checkButtonEdit, setCheckButtonEdit] = useState(false);
  const [checkDisable, setCheckDisable] = useState(false);
  const [action, setAction] = useState();
  const [rowSelected, setRowSelected] = useState([0]);
  const [selectedRowKeys, setSelected] = useState([]);

  useEffect(() => {
    props.getData(filterData);
  }, [filterData]);
  let formatDate = ["YYYY-MM-DD", "DD/MM/YYYY"];

  const handleDate = (dateString) => {
    let dateTime = undefined;

    if (dateString) {
      let newDateString = dateString.split("T")[0];

      if (dayjs(newDateString, formatDate[0], true).isValid())
        dateTime = dayjs(newDateString, formatDate[0], true);
      else if (dayjs(newDateString, formatDate[1], true).isValid())
        dateTime = dayjs(newDateString, formatDate[1], true);
      else dateTime = undefined;

      return newDateString;
    }

    return dateTime;
  };
  const DonThu = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Số đơn",
      dataIndex: "SoDonThu",
      align: "center",
      width: "10%",
    },
    {
      title: "Nguồn đơn đến",
      dataIndex: "TenNguonDonDen",
      align: "left",
      width: "15%",
    },
    {
      title: "Tên chủ đơn",
      dataIndex: "HoTen",
      align: "left",
      width: "20%",
      // render: (_, record) => renderHoTen(record),
    },
    {
      title: "Nội dung vụ việc",
      dataIndex: "NoiDungDon",
      align: "left",
      width: "30%",
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo",
      width: "10%",
      align: "center",
    },
    {
      title: "Hạn xử lý",
      dataIndex: "NgayQuaHan",
      width: "15%",
      align: "center",
      render: (_, record) => handleDate(record.NgayQuaHan),
    },
    {
      title: "Hướng xử lý",
      dataIndex: "TenHuongGiaiQuyet",
      width: "15%",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "StateName",
      width: "15%",
      align: "center",
    },
  ];
  const ReloadSelected = (seclected, selecteds) => {
    setSelected(seclected);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: ReloadSelected,
    onSelect: (record, selected, selectedRows) => {
      if (selectedRows.length >= 1) {
        setCheckButtonEdit(true);
      } else if (selectedRows.length == 0) {
        setCheckButtonEdit(false);
      }

      if (selectedRows.length <= 1) {
        setCheckDisable(false);
      } else {
        setCheckDisable(true);
      }
      setRowSelected(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setCheckButtonEdit(selected);
      if (selectedRows.length == 0) {
        setCheckDisable(false);
      } else if (selectedRows.length >= 1) {
        setCheckDisable(true);
      }
    },
  };
  const showModalChiTiet = (record) => {
    setIsModalOpen(true);
    setDataEdit(record);
    setAction("Phân xử lý");
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpenPheDuyet(false);
    setIsModalOpenKetQua(false);
    form.resetFields();
  };
  const handleCancel = () => {
    setRowSelected([]);
    setSelected([]);
    setIsModalOpen(false);
    setIsModalOpenPheDuyet(false);
    setIsModalOpenKetQua(false);
    form.resetFields();
  };
  const customData = (data) => {
    let arr = [];
    data &&
      data.forEach((item, index) =>
        arr.push({
          ...item,
          key: index,
        })
      );

    return arr;
  };
  const ModalPrint = () => {};
  const HightLightRow = (record) => {
    return record.StateName == "Chưa duyệt"
      ? "text-color-red"
      : "text-color-default";
  };
  const showModalPheDuyet = () => {
    setIsModalOpenPheDuyet(true);
  };
  const showModalKetQua = () => {
    setIsModalOpenKetQua(true);
  };
  return (
    <Wrapper>
      <LayoutWrapper>
        <PageHeader>Danh sách duyệt kết quả xử lý</PageHeader>
        <PageAction>
          {checkButtonEdit == true &&
          rowSelected[0]?.StateName == "Chưa duyệt" ? (
            <>
              <ButtonDisabled onClick={showModalKetQua} disabled={checkDisable}>
                Cập nhật kết quả
              </ButtonDisabled>
              <ButtonDisabled
                onClick={showModalPheDuyet}
                disabled={checkDisable}
              >
                Phê duyệt
              </ButtonDisabled>
            </>
          ) : (
            <></>
          )}
        </PageAction>
        <Box>
          <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
            <Panel
              className="collapse-item-reverse"
              key={1}
              header="Tìm kiếm thông tin"
            >
              <FormSearchData dataSearch={setFilterData}></FormSearchData>
            </Panel>
          </Collapse>
          <BoxTable
            loading={props.tableLoading}
            columns={DonThu}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => showModalChiTiet(record),
              };
            }}
            rowClassName={(record, index) => HightLightRow(record)}
            rowSelection={rowSelection}
            dataSource={customData(PheDuyetKetQuaXuLy)}
          />
        </Box>
      </LayoutWrapper>
      <ModalChiTiet
        title="Chi tiết đơn thư"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        dataEdit={dataEdit}
        action={action}
      />
      <ModalPheDuyet
        dataEdit={rowSelected[0]}
        open={isModalOpenPheDuyet}
        onOk={handleOk}
        onCancel={handleCancel}
        form={form}
        // getData={props.getData(filterData)}
        filterData={filterData}
      />
      <ModalKetQua
        form={form}
        dataEdit={rowSelected[0]}
        open={isModalOpenKetQua}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.PheDuyetKetQuaXuLy,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(QLNamHoc);
