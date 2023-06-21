import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/XuLyDon/HoSoDonThu/action";
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

import { Link } from "react-router-dom";
// import { Modal, ModalCustom } from "../../../../components/uielements/exportComponent";
import ModalChiTiet from "../../NghiepVu/SoTiepDanTrucTiep/modalChiTiet";
import Collapse from "../../../../components/uielements/collapse";
import { Button } from "../../../../components/uielements/exportComponent";
import ModalPhanXuLy from "./PhanXuLy";
import { ButtonDisabled } from "../../NghiepVu/DonThuDaTiepNhan/styled";
import duplicate from "../../NghiepVu/SoTiepDanTrucTiep/img/process.svg";
import moment from "moment";
const { Panel } = Collapse;

const QLNamHoc = (props) => {
  const { HoSoDonThu, TotalRow, role } = props;

  document.title = "Hồ sơ đơn thư";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLanhDao, setIsModalOpenLanhDao] = useState(false);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState(queryString.parse(props.location.search));
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [checkButtonEdit, setCheckButtonEdit] = useState(false);
  const [checkDisable, setCheckDisable] = useState(false);
  const [openModalPhanXuLy, setOpenModalPhanXuLy] = useState(false);
  const [action, setAction] = useState();
  const [rowSelected, setRowSelected] = useState([0]);

  useEffect(() => {
    props.getData(filterData);
  }, [filterData]);
  console.log(filterData);
  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };
  const renderHoTen = ({ HoTen, TenHuyen, TenTinh }) => {
    return <p>{`${HoTen} (${TenHuyen}, ${TenTinh})`}</p>;
  };
  const PageNumber = filterData.PageNumber ? parseInt(filterData.PageNumber) : 1;
  const PageSize = filterData.PageSize ? parseInt(filterData.PageSize) : getDefaultPageSize();
  const DonThu = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>,
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
      align: "center",
      width: "10%",
    },
    {
      title: "Tên chủ đơn",
      align: "left",
      width: "20%",
      render: renderHoTen,
    },
    {
      title: "Nội dung đơn",
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
      dataIndex: "NgayNhapDon",
      align: "center",
      width: "10%",
      render: (_, record) => {
        const formattedDate = moment(record.NgayNhapDon).format("DD-MM-YYYY");
        return <p>{formattedDate}</p>;
      },
    },
    {
      title: "Cơ quan tiếp nhận",
      dataIndex: "TenCoQuan",
      width: "15%",
      align: "center",
    },
    {
      title: "Hướng xử lý",
      dataIndex: "HuongXuLy",
      width: "15%",
      align: "center",
    },
    {
      title: "Hạn giải quyết",
      dataIndex: "HanGiaiQuyet",
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

  return (
    <Wrapper>
      <LayoutWrapper>
        <PageHeader>Danh sách đơn thư</PageHeader>
        <PageAction>
          {checkButtonEdit == true ? (
            <>
              <ButtonDisabled onClick={showModalPhanXuLy} disabled={checkDisable}>
                Cập nhật tài liệu
              </ButtonDisabled>
            </>
          ) : (
            <></>
          )}
        </PageAction>
        <Box>
          <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
            <Panel className="collapse-item-reverse" key={1} header="Tìm kiếm thông tin">
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
            onChange={onTableChange}
            pagination={{
              showSizeChanger: true,
              showTotal: (total, range) => `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
              total: TotalRow,
              current: PageNumber,
              pageSize: PageSize,
            }}
            rowSelection={{
              ...rowSelection,
            }}
            dataSource={customData(HoSoDonThu)}
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
    ...state.HoSoDonThu,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(QLNamHoc);
