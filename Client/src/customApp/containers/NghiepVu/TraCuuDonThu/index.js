
import { Modal, Table, Tooltip, message, DatePicker } from "antd";
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import Checkbox from "../../../../components/uielements/checkbox";
import Collapse from "../../../../components/uielements/collapse";

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
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CheckboxGroup } from "../../../../components/uielements/checkbox";
import ModalChiTiet from "./modalChiTietHoSoDonThu";
import TableDetail from "../TableDetail";
import FormSearch from "./FormSearch"
import actions from "../../../redux/NghiepVu/TracuuDonThu/action"
import dayjs from "dayjs";
import print from "./img/printer.svg";
const PrintIcon = (image) => {
  return (
    <img
      src={image}
      alt=""
      style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
    />
  );
};

const TraCuuDon = (props) => {
  document.title = "Tra cứu đơn thư";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const { Panel } = Collapse;

  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isPhanXyLy, setIsPhanXuLy] = useState(false)
  const [ThongTinDonThu, setThongTinDonThu] = useState({})
  const [step, setStep] = useState(1)

  const [checkButtonEdit, setCheckButtonEdit] = useState(false);
  const dispatch = useDispatch()

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
  
  const { DanhSachDonThu, TotalRow, role } = props;
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
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setCheckButtonEdit(selected);
    },
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


  const columnSoTiepCongDan = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "SL trùng/tiếp nhận",
      dataIndex: "SoLanTrung",
      align: "center",
      width: "10%",
    },
    {
      title: "Ngày nhập đơn",
      // dataIndex: "NgayNhapDon",
      align: "left",
      width: "10%",
      render: (_, record) => {
        return dayjs(record.NgayNhapDon).format("DD/MM/YYYY")
      }
    },
    {
      title: "Tên chủ đơn",
      dataIndex: "HoTen",
      align: "left",
      width: "25%",
      // render: (_, record) => renderHoTen(record),
    },
    {
      title: "Nội dung vụ việc",
      dataIndex: "NoiDungDon",
      align: "left",
      width: "35%",
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo",
      width: "15%",
      align: "center",
    },
  ];

  const handleDetailRowTable = (record, index) => {
    // setStep(2)
    setFilterData({ ...filterData, step: 2 })
    console.log(record, 'record')
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState()

  const [isModaPrint, setModalPrin] = useState(false);
  const showModalList = () => {
    // setIsModalOpen(true);
    setModalPrin(true);
  };
  const showModalChiTiet = (record) => {
    console.log(record,"record");
    setData(record);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setModalPrin(false);

  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setModalPrin(false);

  };
  //buttadd
  const showModalAdd = () => {
    setAction("add");
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  return (
    <LayoutWrapper>
      <PageHeader>Danh sách đơn thư </PageHeader>
      <PageAction>
        {/* {isPhanXyLy ?  <Button type="primary" onClick={showModalAdd}>
          <PlusOutlined />
          Phân xử lý
        </Button> : null} */}
          <ButtonPrint type="primary" icon={PrintIcon(print)}>
            <a
              href="https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/Exportexcel"
              style={{
                padding: 5,
              }}
            >
              In sổ
            </a>
          </ButtonPrint>
      </PageAction>
      <Box>
        {/* <FormSearch /> */}
        <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
          <Panel className="collapse-item-reverse" key={1}>
            <FormSearch setFilterData={setFilterData}></FormSearch>
          </Panel>
        </Collapse>
      </Box>
      <Box>
        <BoxTable
          columns={columnSoTiepCongDan}
          dataSource={customData(DanhSachDonThu)}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => showModalChiTiet(record),
            };
          }}
        // rowSelection={{
        //   ...rowSelection,
        // }}
        />
      </Box>
      {/* <ModalAddEdit open={isModalOpen} onOk={handleOk} onCancel={handleCancel} /> */}
      <ModalChiTiet
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
    ...state.ReducerTraCuuDonThu,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(TraCuuDon);
