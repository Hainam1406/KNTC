
import { Modal, Table, Tooltip, message, DatePicker } from "antd";
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/NghiepVu/DTChuyenDonVBĐĐ/action";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import Checkbox from "../../../../components/uielements/checkbox";
// import ModalChiTiet from "./modalChiTiet";

import {
  Button,
  InputSearch,
  Select,
} from "../../../../components/uielements/exportComponent";
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import Wrapper, {
  FooterPageAction,
  ButtonList,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonPrint,
  ButtonCancelForm,
} from "../SoTiepDanTrucTiep/styled";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import api from "./config";
import { DeleteOutlined, EditOutlined, PlusOutlined, LoginOutlined } from "@ant-design/icons";
import { CheckboxGroup } from "../../../../components/uielements/checkbox";
import TableDetail from "../TableDetail";
import FormSearch from "./FormSearch"
import ChiTietDonThu from "../SoTiepDanTrucTiep/modalChiTiet"
import ModalTransfer from "./modalTransfer"

// import print from "./img/printer.svg";zz

const PrintIcon = (image) => {
  return (
    <img
      src={image}
      alt=""
      style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
    />
  );
};

const DTCanChuyenDonVBDD = (props) => {
  document.title = "Danh sách đơn thư cần chuyển đơn, ra văn bản đôn đốc";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );

  const [data, setData] = useState()
  const [step, setStep] = useState(1)
  const dispatch = useDispatch()
  const [checkButtonEdit, setCheckButtonEdit] = useState(false);
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [rowSelected, setRowSelected] = useState([0]);


  useEffect(() => {
    changeUrlFilter(filterData);
    dispatch(actions.getData(filterData))
  }, [filterData]);
  console.log(filterData, "filterData");

  useEffect(() => {
    dispatch(actions.getData(filterData))
  }, []);


  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role.edit ? */}
        {/* <Tooltip title={"Sửa"}>
          <EditOutlined onClick={() => showModalEdit(record.DanTocID)} />
        </Tooltip> */}
        {/* : ""} */}
        {/* {role.delete ? */}
        {/* <Tooltip title={"Xóa"}>
          <DeleteOutlined onClick={() => deleteModalAddEdit(record.DanTocID)} />
        </Tooltip> */}
        {/* : ""} */}
      </div>
    );
  };

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };

  const { DanhSachDonThuCanChuyenDonVBDD, TotalRow, role } = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("selectedRows: ", selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      setCheckButtonEdit(selected);
      setRowSelected(selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setCheckButtonEdit(selected);
    },
  };
  const customData = (data) => {
    let arr = [];
    data && data.forEach((item, index) =>
      arr.push({
        ...item,
        key: index,
      })
    );
    return arr;
  };
  const renderTrangThai=(record)=>(record.TrangThai == 0?<>Chưa chuyển</>:<>Đã chuyển đơn</>)

  const columnCanChuyenDon = [
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
      dataIndex: "NguonDonDen",
      align: "left",
      width: "10%",
    },
    {
      title: "Tên chủ đơn",
      dataIndex: "HoTen",
      align: "left",
      width: "15%",
      // render: (_, record) => renderHoTen(record),
    },
    {
      title: "Nội dung vụ việc",
      dataIndex: "NoiDungDon",
      align: "left",
      width: "25%",
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo",
      width: "10%",
      align: "center",
    },
    {
      title: "Hướng xử lý",
      dataIndex: "TenHuongGiaiQuyet",
      width: "8%",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThaiDonID",
      width: "8%",
      align: "center",
      render: (_, record)=>renderTrangThai(record)
      // render: (text, record) => {
      //   return <Checkbox checked={record.TrangThai}></Checkbox>;
      // },
    },
    {
      title: "Cơ quan nhận",
      dataIndex: "CQNhanDonChuyen",
      width: "9%",
      align: "center",
    },
  ];
  const data1 = [
    {
      key: 1,
      SoDonThu: "TCK112",
      NguonDonDen:"Cơ quan khác chuyển đến",
      HoTen:"Nguyên Văn Nam",
      NoiDungDon:"Noi dung 123",
      TenLoaiKhieuTo:"Tố Cáo",
      CQNhanDonChuyen:"Sở ý tế",
      TenHuongGiaiQuyet:"Chuyển đơn",
    },
    {
      key: 2,
      SoDonThu: "T2",
      NguonDonDen:"Cơ quan khác chuyển đến",
      HoTen:"Son ks",
      NoiDungDon:"tố cáo công an xã Hòa Long, TPBR",
      TenLoaiKhieuTo:"Khiếu nại",
      CQNhanDonChuyen:"Sở ý tế",
      TenHuongGiaiQuyet:"Chuyển đơn",

    },
    {
      key: 3,
      SoDonThu: "TCD722",
      NguonDonDen:"Trực tiếp",
      HoTen:"Nguyên Văn",
      NoiDungDon:"Trình xử lý công việc",
      TenLoaiKhieuTo:"Tố Cáo",
      CQNhanDonChuyen:"Sở ý tế",
      TenHuongGiaiQuyet:"Chuyển đơn",

    },
    {
      key: 4,
      SoDonThu: "T112",
      NguonDonDen:"Cơ quan khác chuyển đến",
      HoTen:"Tuan gk",
      NoiDungDon:"tố cáo chủ tịch UBND xã Xuân Sơn, huyện Châu Đức",
      TenLoaiKhieuTo:"Tố Cáo",
      CQNhanDonChuyen:"Ban Tiếp dân huyện Xuyên Mộc",
      TenHuongGiaiQuyet:"Chuyển đơn",

    },
    {
      key: 5,
      SoDonThu: "Tk512",
      NguonDonDen:"Cơ quan khác chuyển đến",
      HoTen:"Trần Nguyên Hãn",
      NoiDungDon:"Noi dung 123",
      TenLoaiKhieuTo:"Khiếu nại",
      CQNhanDonChuyen:"Ban dân vận ",
      TenHuongGiaiQuyet:"Chuyển đơn",

    },
  ];

  const handleDetailRowTable = (record, index) => {
    // setStep(2)
    setFilterData({ ...filterData, step: 2 })
    console.log(record, 'record')
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhanXyLy, setIsPhanXuLy] = useState(false)

  const showModaChuyen = () => {
    setIsPhanXuLy(true)
  }

  const showModalChiTiet = (record) => {
    setIsModalOpen(true);
    setData(record)
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsPhanXuLy(false)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsPhanXuLy(false)
  };
  //
  return (
    <LayoutWrapper>
      <PageHeader>Danh sách đơn thư cần chuyển đơn, ra văn bản đôn đốc</PageHeader>
      <PageAction>
        <>
        {/* {isPhanXyLy ?  <Button type="primary" onClick={showModalAdd}>
          <PlusOutlined />
          Xử lý
        </Button> : null}

        <ButtonPrint type="primary" onClick={showModalList}>
          In Danh Sách
        </ButtonPrint> */}
        </>
        {checkButtonEdit == true ? (
          <>
            <Button type="primary" onClick={showModaChuyen}>
            {/* <ReloadOutlined /> */}
              <LoginOutlined />
              Chuyển
            </Button>
          </>
        ) : (
          <></>
        )}

      </PageAction>
      <Box>
        <FormSearch setFilterData={setFilterData} />
      </Box>
      <Box>
        <BoxTable
          onChange={onTableChange}
          columns={columnCanChuyenDon}
          dataSource={customData(DanhSachDonThuCanChuyenDonVBDD)}
          // dataSource={customData(data1)}

          onRow={(record, rowIndex) => {
            return {
              onClick: () => showModalChiTiet(record),
            };
          }}
          rowSelection={{
            ...rowSelection,
          }}

          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) => `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
        />
      </Box>
      <ModalTransfer open={isPhanXyLy} onOk={handleOk} onCancel={handleCancel} data={rowSelected[0]}/>
      <ChiTietDonThu
        title="Chi tiết đơn thư"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        dataEdit={data}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.ReducerDTCanChuyenDonVDDonDoc,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(DTCanChuyenDonVBDD);
