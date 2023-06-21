import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/NghiepVu/RutDon/action";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import {
  getDefaultPageSize,
  changeUrlFilter,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import {
  Button,
  DatePicker,
  InputSearch,
  Input,
  Selectv4,
} from "../../../../components/uielements/exportComponent";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import ThongTinHoSoTiepDan from "../../NghiepVu/SoTiepDanTrucTiep/customCollapse";
import FormSearchData from "./formSearchData";
import Form from "../../../../components/uielements/form";
import Wrapper, { BgrColorTabs } from "../../NghiepVu/SoTiepDanTrucTiep/styled";
import api from "./config";
// import PhanXuLy from "./PhanXuLy";
import { Tabs, Tooltip, Modal, message } from "antd";
import { FileExcelOutlined, DeleteOutlined, CloseOutlined, ToTopOutlined } from "@ant-design/icons";

import Collapse from "../../../../components/uielements/collapse";
import ModalChiTiet from "../../NghiepVu/SoTiepDanTrucTiep/modalChiTiet";
// import ModalThemFileDinhKem from "./modalThemFileDinhKem";
import ModalEditRutDonThu from "./ModalEditRutDonThu";

const { Panel } = Collapse;

const RutDonThu = (props) => {
  const { RutDon, TotalRow, role } = props;
  const [filterData, setFilterData] = useState(queryString.parse(props.location.search));

  document.title = "Rút đơn";

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    setSelectedRowsKey([]);
  };

  const onSearch = (value, property) => {
    let onFilter = { value, property };
    let newFilterData = getFilterData(filterData, onFilter, null);
    setFilterData(newFilterData);
  };
  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTest, setIsModalOpenTest] = useState(false);
  const [isModalOpenEditData, setIsModalEditData] = useState(false);
  const [danhSachKhieuTo, setDanhSachKhieuTo] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalOpenRutDonThu, setIsModalOpenRutDonThu] = useState(false);
  const [HoSoTaiLieuDinhKemForm] = Form.useForm();
  const [dataEdit, setDataEdit] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpenThemFileDinhKem, setIsModalOpenThemFileDinhKem] = useState(false);
  const [rowSelected, setRowSelected] = useState([0]);
  const [action, setAction] = useState();
  const dataRutDon = useSelector((state) => state.RutDon.RutDon);

  useEffect(() => {
    props.getData(filterData);
  }, [filterData]);

  const showModalEditData = () => {
    setIsModalOpenThemFileDinhKem(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalEditData(false);
    setIsModalOpenThemFileDinhKem(false);
    setIsModalOpenRutDonThu(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalEditData(false);
    setIsModalOpenThemFileDinhKem(false);
    setIsModalOpenRutDonThu(false);
  };

  const showModalChiTiet = (record) => {
    setIsModalOpen(true);
    setDataEdit(record);
    setAction("Phân xử lý");
  };
  const HuyRutDonThu = (XuLyDonID, RutDonID) => {
    Modal.confirm({
      title: "Hủy rút đơn",
      content: "Bạn có chắc muốn hủy rút đơn cho đơn thư này?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .HuyRutDonThu({
            XuLyDonID: XuLyDonID,
            RutDonID: RutDonID,
          })
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              props.getData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) < filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
              message.destroy();
              message.success(res.data.Message);
              setFilterData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) < filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      },
    });
  };

  const ShowModalRutDonThu = (record) => {
    setIsModalOpenRutDonThu(true);
    setDataSource(record);
  };

  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        <Tooltip title={"Rút đơn"}>
          <ToTopOutlined
            style={{
              color: record.RutDonID === 0 ? "blue" : undefined,
              display: record.RutDonID === 0 ? "block" : "none",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (record.RutDonID === 0) {
                ShowModalRutDonThu(record.XuLyDonID);
              }
            }}
            disabled={record.RutDonID !== 0}
          />
        </Tooltip>

        <Tooltip title={"Hủy rút đơn"}>
          <CloseOutlined
            style={{
              color: record.RutDonID !== 0 ? "blue" : undefined,
              display: record.RutDonID === 0 ? "none" : "block",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (record.RutDonID !== 0) {
                HuyRutDonThu(record.XuLyDonID, record.RutDonID);
              }
            }}
          />
        </Tooltip>
      </div>
    );
  };

  const PageNumber = filterData.PageNumber ? parseInt(filterData.PageNumber) : 1;
  const PageSize = filterData.PageSize ? parseInt(filterData.PageSize) : getDefaultPageSize();

  const columnRutDonThu = [
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
      title: "Tên chủ đơn",
      dataIndex: "HoTen",
      align: "left",
      width: "10%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "DiaChiCT",
      align: "center",
      width: "15%",
    },
    {
      title: "Nội dung đơn",
      dataIndex: "NoiDungDon",
      align: "left",
      width: "20%",
    },
    {
      title: "Loại đơn",
      dataIndex: "TenLoaiKhieuTo",
      width: "10%",
      align: "center",
    },
    {
      title: "Ngày rút đơn",
      dataIndex: "NgayRutDon",
      width: "15%",
      align: "center",
    },
    {
      title: "Lý do rút đơn",
      dataIndex: "LyDo",
      width: "15%",
      align: "center",
    },
    {
      title: "Trạng thái rút đơn",
      dataIndex: "TrangThaiRut",
      width: "10%",
      align: "center",
    },
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      render: (text, record) => renderThaoTac(record),
    },
  ];

  return (
    <Wrapper>
      <LayoutWrapper>
        <PageHeader>Danh sách đơn thư rút đơn</PageHeader>
        <Box>
          {/* Content */}
          <BgrColorTabs className="test">
            <ThongTinHoSoTiepDan defaultActiveKey={1}>
              <FormSearchData
                setFilterData={setFilterData}
                setDanhSachKhieuTo={setDanhSachKhieuTo}
              />
            </ThongTinHoSoTiepDan>
            <BoxTable
              columns={columnRutDonThu}
              dataSource={dataRutDon}
              onChange={onTableChange}
              pagination={{
                showSizeChanger: true,
                showTotal: (total, range) => `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
                total: TotalRow,
                current: PageNumber,
                pageSize: PageSize,
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => showModalChiTiet(record),
                };
              }}
            />
          </BgrColorTabs>
        </Box>
      </LayoutWrapper>

      <ModalChiTiet
        title="Chi tiết đơn thư"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        dataEdit={dataEdit}
        action={action}
        // danhSachKhieuTo={danhSachKhieuTo}
      />

      <ModalEditRutDonThu
        showModalEditData={showModalEditData}
        open={isModalOpenRutDonThu}
        onOk={handleOk}
        onCancel={handleCancel}
        data1={dataSource}
        dataEdit={rowSelected[0]}
        // them file dinh kem
      />
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.RutDon,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(RutDonThu);
