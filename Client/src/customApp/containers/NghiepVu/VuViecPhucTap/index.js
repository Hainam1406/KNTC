import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/NghiepVu/DonThuDaTiepNhan/action";
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
import FormSearchData from "./formSearchData";

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
import Collapse from "../../../../components/uielements/collapse";
import { Button } from "../../../../components/uielements/exportComponent";

const { Panel } = Collapse;

const QLNamHoc = (props) => {
  const { DonThuDaTiepNhan, TotalRow, role } = props;

  document.title = "Phân xử lý đơn thư";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLanhDao, setIsModalOpenLanhDao] = useState(false);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [checkButtonEdit, setCheckButtonEdit] = useState(false);
  const [checkDisable, setCheckDisable] = useState(false);
  useEffect(() => {
    props.getData(filterData);
  }, [filterData]);

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
      dataIndex: "NguonDonDens",
      align: "left",
      width: "15%",
    },
    {
      title: "Tên chủ đơn",
      dataIndex: "TenChuDon",
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
      title: "Hạn giải quyết",
      dataIndex: "NgayNhapDons",
      width: "15%",
      align: "center",
    },
    {
      title: "Lần giải quyết",
      dataIndex: "NgayNhapDons",
      width: "15%",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "StateName",
      width: "15%",
      align: "center",
    },
    {
      title: "Cơ quan GQ",
      dataIndex: "KetQuaTiep",
      width: "15%",
      align: "center",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
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
      console.log(selectedRows.length);
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
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const customData = (data) => {
    let arr = [];
    data.forEach((item, index) =>
      arr.push({
        ...item,
        key: index,
      })
    );

    return arr;
  };
  const ModalPrint = () => {};
  return (
    <Wrapper>
      <LayoutWrapper>
        <PageHeader>Quản lý vụ việc phức tạp</PageHeader>
        <PageAction>
          {checkButtonEdit == true ? (
            <>
              <Button>Phân xử lý</Button>
            </>
          ) : (
            <></>
          )}
        </PageAction>
        <Box>
          {/* Content */}
          <BgrColorTabs className="test">
            <Tabs defaultActiveKey="1" type="card">
              <Tabs.TabPane tab="Danh sách vụ việc phức tạp" key="1">
                <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
                  <Panel className="collapse-item-reverse" key={1}>
                    <FormSearchData dataSearch={setFilterData}></FormSearchData>
                  </Panel>
                </Collapse>
                <BoxTable
                // columns={columnSoTiepCongDan}
                // dataSource={SoTiepDan}
                // onRow={(record, rowIndex) => {
                //   return {
                //     onClick: () => showModalChiTiet(record),
                //   };
                // }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Danh sách vụ việc đang giải quyết" key="2">
                <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
                  <Panel className="collapse-item-reverse" key={1}>
                    <FormSearchData dataSearch={setFilterData}></FormSearchData>
                  </Panel>
                </Collapse>
                <BoxTable
                // columns={columnList} dataSource={SoTiepDan}
                />
              </Tabs.TabPane>
            </Tabs>
          </BgrColorTabs>
        </Box>
      </LayoutWrapper>
      {/* <ModalChiTiet
        title="Chi tiết đơn thư"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        dataEdit={dataEdit}
      /> */}
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DonThuDaTiepNhan,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(QLNamHoc);
