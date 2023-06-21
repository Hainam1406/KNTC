import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/PhanGiaiQuyet/PheDuyetKetQua/action";
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
import FormSearchData from "../../NghiepVu/components/FormSearch.js/FormSearch";

import Wrapper, {
  FooterPageAction,
  ButtonList,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonPrint,
  ButtonCancelForm,
} from "../../NghiepVu/SoTiepDanTrucTiep/styled";
import api from "./config";
import list from "../../NghiepVu/SoTiepDanTrucTiep/img/list.svg";
import print from "../../NghiepVu/SoTiepDanTrucTiep/img/printer.svg";
import work from "../../NghiepVu/SoTiepDanTrucTiep/img/working-with-laptop.svg";
import { Tabs, Tooltip, Modal, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

import { BgrColorTabs } from "../../NghiepVu/SoTiepDanTrucTiep/styled";
// import ModalList from "./modalAddEdit";
import { Link } from "react-router-dom";
// import { Modal, ModalCustom } from "../../../../components/uielements/exportComponent";
import ModalChiTiet from "../../NghiepVu/SoTiepDanTrucTiep/modalChiTiet";
import Collapse from "../../../../components/uielements/collapse";
import { Button } from "../../../../components/uielements/exportComponent";
import dayjs from "dayjs";

const ListIcon = (image) => {
  return (
    <img
      src={image}
      alt=""
      style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
    />
  );
};
const PrintIcon = (image) => {
  return (
    <img
      src={image}
      alt=""
      style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
    />
  );
};

const WorkIcon = (image) => {
  return (
    <img
      src={image}
      alt=""
      style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
    />
  );
};
const { Panel } = Collapse;

const QLNamHoc = (props) => {
  const { DanhSachCanPheDuyet, TotalRow, role } = props;

  document.title = "Phê duyệt kết quả";
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
  const data = useSelector(
    (state) => state.KetQuaCanPheDuyet.DanhSachCanPheDuyet
  );
  useEffect(() => {
    props.getData(filterData);
  }, [filterData]);

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
  const DonThu = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (_, record, index) => {
        if (record.StateName == "Chưa duyệt") {
          return (
            <span style={{ color: "red" }}>
              {(PageNumber - 1) * PageSize + (index + 1)}
            </span>
          );
        } else {
          return <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>;
        }
      },
    },
    {
      title: "Số đơn",
      dataIndex: "SoDonThu",
      align: "center",
      width: "5%",
      render: (_, record) => {
        if (record.StateName == "Chưa duyệt") {
          return <span style={{ color: "red" }}>{record.SoDonThu}</span>;
        } else {
          return <span>{record.SoDonThu}</span>;
        }
      },
    },
    {
      title: "Nguồn đơn đến",
      dataIndex: "TenNguonDonDen",
      align: "left",
      width: "10%",
      render: (_, record, index) => {
        if (record.StateName == "Chưa duyệt") {
          return <span style={{ color: "red" }}>{record.TenNguonDonDen}</span>;
        } else {
          return <span>{record.TenNguonDonDen}</span>;
        }
      },
    },
    {
      title: "Tên chủ đơn",
      // dataIndex: "HoTen",
      align: "left",
      width: "15%",
      render: (_, record, index) => {
        if (record.StateName == "Chưa duyệt") {
          return (
            <span
              style={{ color: "red" }}
            >{`${record.HoTen} (${record.DiaChiCT})`}</span>
          );
        } else {
          return <span>{`${record.HoTen} (${record.DiaChiCT})`}</span>;
        }
      },
    },
    {
      title: "Nội dung vụ việc",
      dataIndex: "NoiDungDon",
      align: "left",
      width: "25%",
      render: (_, record, index) => {
        if (record.StateName == "Chưa duyệt") {
          return <span style={{ color: "red" }}>{record.NoiDungDon}</span>;
        } else {
          return <span>{record.NoiDungDon}</span>;
        }
      },
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo",
      width: "10%",
      align: "left",
      render: (_, record, index) => {
        if (record.StateName == "Chưa duyệt") {
          return <span style={{ color: "red" }}>{record.TenLoaiKhieuTo}</span>;
        } else {
          return <span>{record.TenLoaiKhieuTo}</span>;
        }
      },
    },
    {
      title: "Ngày gửi",
      dataIndex: "NgayNhapDons",
      width: "10%",
      align: "center",
    },
    {
      title: "Hạn giải quyết",
      width: "10%",
      align: "center",
      render: (_, record, index) => {
        let dateCustom = dayjs(record.NgayQuaHan).format("DD/MM/YYYY");
        if (record.StateName == "Chưa duyệt") {
          return <span style={{ color: "red" }}>{dateCustom}</span>;
        } else {
          return <span>{dateCustom}</span>;
        }
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "StateName",
      width: "10%",
      align: "center",
      render: (_, record, index) => {
        if (record.StateName == "Chưa duyệt") {
          return <span style={{ color: "red" }}>{record.StateName}</span>;
        } else {
          return <span>{record.StateName}</span>;
        }
      },
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
        <PageHeader>Phê duyệt kết quả</PageHeader>
        <PageAction>
          <ButtonPrint
            type="primary"
            icon={PrintIcon(print)}
            onClick={ModalPrint}
          >
            <span> In danh sách </span>
          </ButtonPrint>
          {checkButtonEdit == true ? (
            <>
              <Button disabled={checkDisable}>Sửa</Button>
              <Button>Xóa</Button>
              <Button>In phiếu</Button>
            </>
          ) : (
            <></>
          )}
        </PageAction>
        <Box>
          {/* Content */}

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
            columns={DonThu}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => showModalChiTiet(record),
              };
            }}
            rowSelection={{
              ...rowSelection,
            }}
            dataSource={customData(data)}
          />
        </Box>
      </LayoutWrapper>
      <ModalChiTiet
        title="Chi tiết đơn thư"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        dataEdit={dataEdit}
      />
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.KetQuaCanPheDuyet,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(QLNamHoc);
