import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/NghiepVu/QLHoSoDonThu/action";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import { changeUrlFilter, getFilterData, getRoleByKey } from "../../../../helpers/utility";
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

import { Tabs, Tooltip, Modal, message } from "antd";
import { DiffOutlined } from "@ant-design/icons";

import Collapse from "../../../../components/uielements/collapse";
import ModalChiTiet from "../../NghiepVu/SoTiepDanTrucTiep/modalChiTiet";
import ModalThemFileDinhKem from "./modalThemFileDinhKem";

const { Panel } = Collapse;

const QLNamHoc = (props) => {
  const { DanhSachDonThu, TotalRow, role } = props;
  const [filterData, setFilterData] = useState(queryString.parse(props.location.search));

  document.title = "Danh sách đơn thư";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEditData, setIsModalEditData] = useState(false);
  const [danhSachKhieuTo, setDanhSachKhieuTo] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [isModalOpenThemFileDinhKem, setIsModalOpenThemFileDinhKem] = useState(false);

  useEffect(() => {
    props.getData(filterData);
  }, [filterData]);

  const showModalEditData = (record) => {
    setIsModalOpenThemFileDinhKem(true);
    setDataSource(record);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalEditData(false);
    setIsModalOpenThemFileDinhKem(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalEditData(false);
    setIsModalOpenThemFileDinhKem(false);
  };
  const handleCancelThemFIle = () => {
    setIsModalOpenThemFileDinhKem(false);
  };
  const handleOkThemFIle = () => {
    setIsModalOpenThemFileDinhKem(false);
  };

  const showModalChiTiet = (record) => {
    setIsModalOpen(true);
    setDataEdit(record);
    console.log("chiee", setDataEdit);
  };
  const renderHoTen = ({ HoTen, TenHuyen, TenTinh }) => {
    return <p>{`${HoTen} (${TenHuyen}, ${TenTinh})`}</p>;
  };

  const renderThaoTacSoTiep = (record) => {
    return (
      <div className={"action-btn"}>
        <Tooltip title={"Cập nhật tài liệu"}>
          <DiffOutlined
            onClick={(e) => {
              e.stopPropagation();
              showModalEditData(record);
            }}
          />
        </Tooltip>
      </div>
    );
  };

  const columnHoSoDonThu = [
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
      title: "Ngày nhận",
      dataIndex: "NgayNhapDon",
      width: "15%",
      align: "center",
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
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      render: (text, record) => renderThaoTacSoTiep(record),
    },
  ];

  return (
    <Wrapper>
      <LayoutWrapper>
        <PageHeader>Danh sách đơn thư</PageHeader>
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
              columns={columnHoSoDonThu}
              dataSource={DanhSachDonThu}
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
        // danhSachKhieuTo={danhSachKhieuTo}
      />
      <ModalThemFileDinhKem
        isModalOpen={isModalOpenThemFileDinhKem}
        onCancel={handleCancelThemFIle}
        onOk={handleOkThemFIle}
        data={dataSource}
      />
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DanhSachDonThu,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(QLNamHoc);
