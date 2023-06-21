import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/NghiepVu/PhanXuLyDon/action";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import {
  changeUrlFilter,
  getFilterData,
  getRoleByKey,
  getDefaultPageSize,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import FormSearchData from "./formSearchData";

import Wrapper, { BgrColorTabs, HightLight } from "./styled";
import ModalList from "./modalAddEdit";
import { Link } from "react-router-dom";
// import { Modal, ModalCustom } from "../../../../components/uielements/exportComponent";
import ModalChiTiet from "../SoTiepDanTrucTiep/modalChiTiet";
import Collapse from "../../../../components/uielements/collapse";
import { Button } from "../../../../components/uielements/exportComponent";
import ModalPhanXuLy from "../components/PhanXuLy/PhanXuLy";
import { ButtonDisabled } from "../DonThuDaTiepNhan/styled";
import duplicate from "../SoTiepDanTrucTiep/img/process.svg";
import dayjs from "dayjs";
const { Panel } = Collapse;

const QLNamHoc = (props) => {
  const { DonThuCanPhanXuLy, TotalRow, role } = props;

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
  const [openModalPhanXuLy, setOpenModalPhanXuLy] = useState(false);
  const [action, setAction] = useState();
  const [rowSelected, setRowSelected] = useState([0]);
  const [selectedRowKeys, setSelected] = useState([]);

  useEffect(() => {
    props.getData(filterData);
  }, [filterData]);
  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
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
      dataIndex: "NguonDonDens",
      align: "left",
      width: "15%",
    },
    {
      title: "Tên chủ đơn",
      dataIndex: "TenChuDon",
      align: "left",
      width: "20%",
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
      title: "Ngày tiếp nhận",
      dataIndex: "NgayNhapDons",
      width: "15%",
      align: "center",
    },
    {
      title: "Hạn xử lý",
      dataIndex: "NgayXuLy",
      width: "15%",
      align: "center",
      render: (_, record) => handleDate(record.NgayXuLy),

    },
    {
      title: "Ngày Xl còn lại",
      dataIndex: "NgayXLConLai",
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

  const FilterIcon = (image) => {
    return (
      <img
        src={image}
        alt=""
        style={{
          width: "20px",
          height: "auto",
          margin: "0px 5px 3px 0px",
          color: "#fff",
        }}
      />
    );
  };
  const ReloadSelected = (seclected, selecteds) => {
    setSelected(seclected);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: ReloadSelected,
    // onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {
      if (selectedRows.length >= 1) {
        setCheckButtonEdit(true);
      } else if (selectedRows.length == 0) {
        setCheckButtonEdit(false);
      }

      if (selectedRows.length > 1) {
        setCheckDisable(true);
      } else {
        setCheckDisable(false);
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
    setOpenModalPhanXuLy(false);
  };
  const handleCancel = () => {
    setSelected([]);
    setIsModalOpen(false);
    setOpenModalPhanXuLy(false);
  };

  const showModalPhanXuLy = () => {
    setOpenModalPhanXuLy(true);
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
  const HightLightRow = (record) => {
    return record.TenLoaiKhieuTo === "Khiếu nạii"
      ? "text-color-red"
      : "text-color-default";
  };
  return (
    <Wrapper>
      <LayoutWrapper>
        <PageHeader>Danh sách đơn thư cần phân xử lý</PageHeader>
        <PageAction>
          {checkButtonEdit == true && rowSelected[0].StateName != "Kết thúc" ? (
            <>
              <ButtonDisabled
                onClick={showModalPhanXuLy}
                disabled={checkDisable}
                icon={FilterIcon(duplicate)}
              >
                Phân xử lý
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
            rowClassName={(record, index) => HightLightRow(record)}
            columns={DonThu}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => showModalChiTiet(record),
              };
            }}
            onChange={onTableChange}
            pagination={{
              showSizeChanger: true,
              showTotal: (total, range) =>
                `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
              total: TotalRow,
              current: PageNumber,
              pageSize: PageSize,
            }}
            rowSelection={{
              ...rowSelection,
            }}
            dataSource={customData(DonThuCanPhanXuLy)}
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
      <ModalPhanXuLy
        open={openModalPhanXuLy}
        onOk={handleOk}
        onCancel={handleCancel}
        dataEdit={rowSelected[0]}
      />
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.PhanXulyDonthu,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(QLNamHoc);
