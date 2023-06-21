import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/NghiepVu/SoTiepDanTrucTiep/action";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import actionsTiepdan from "../../../redux/NghiepVu/TiepDanTrucTiep/action";
import actionsQuocTich from "../../../redux/DanhMuc/DanhMucQuocTich/actions";
import actionsTinhHuyenXa from "../../../redux/DanhMuc/DMDiaGioi/actions";
import {
  changeUrlFilter,
  getFilterData,
  getRoleByKey,
  getDefaultPageSize,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import ThongTinHoSoTiepDan from "./customCollapse";
import FormSearchData from "./formSearchData";
import FormListLeader from "./formListLeader";

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
import { Link, Redirect } from "react-router-dom";
// import { Modal, ModalCustom } from "../../../../components/uielements/exportComponent";
import ModalChiTiet from "./modalChiTiet";
import ModalEditDanKhongDen from "./ModalEditDanKhongDen";
import Collapse from "../../../../components/uielements/collapse";
import ModalPrintBook from "./modalPrintBook";
import ModalInPhieu from "./ModalInPhieu";
import dayjs from "dayjs";

const { Panel } = Collapse;
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

const QLNamHoc = (props) => {
  const { SoTiepDan, TotalRow, role, DanhSachDanKhongDen } = props;

  document.title = "Sổ Tiếp Dân Trực Tiếp";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLanhDao, setIsModalOpenLanhDao] = useState(false);
  const [isModalOpenDanKhongDen, setIsModalDanKhongDen] = useState(false);
  const [danhSachKhieuTo, setDanhSachKhieuTo] = useState();
  const [redirect, setRedirect] = useState(false);
  const [dataDanKhongDen, setDataDanKhongDen] = useState();
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [filterDataDanKhongDen, setFilterDataDanKhongDen] = useState(
    queryString.parse(props.location.search)
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  const [isModalOpenBook, setIsModalOpenBook] = useState(false);
  const [isModalInPhieu, setIsModalInPhieu] = useState(false);
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    props.getData(filterData);
    dispatch(actionsQuocTich.getList({ PageNumber: 0, PageSize: 0 }));
    dispatch(actionsTinhHuyenXa.getListTinh());
  }, [filterData]);
  useEffect(() => {
    props.getDataDanKhongDen(filterDataDanKhongDen);
  }, [filterDataDanKhongDen]);

  useEffect(() => {
    dispatch(actions.getDataDanhSachLanhDao(filterData));
  }, []);
  const showModalList = () => {
    setIsModalOpenLanhDao(true);
  };
  const showModalPrintBook = () => {
    setIsModalOpenBook(true);
  };
  const ShowModalInPhieu = () => {
    setIsModalInPhieu(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpenLanhDao(false);
    setIsModalDanKhongDen(false);
    setIsModalOpenBook(false);
    setIsModalInPhieu(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenLanhDao(false);
    setIsModalDanKhongDen(false);
    setIsModalOpenBook(false);
    setIsModalInPhieu(false);
  };
  const XoaDonThu = (record) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa đơn thư này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaDonThu({ TiepDanKhongDonID: record.TiepDanKhongDonID })
          .then((res) => {
            if (res.data.Status > 0) {
              handleCancel();
              setConfirmLoading(false);
              props.getData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
              message.destroy();
              message.success(res.data.Message);
              setFilterData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
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
  const SuaDonThu = (record) => {
    console.log(record, "canhanID");
    let { DonThuID, XuLyDonID } = record;
    dispatch(
      actionsTiepdan.setDonThuID({
        DonThuID,
        action: false,
        XuLyDonID,
      })
    );
    // <Redirect to="tiep-dan-truc-tiep" />;
    props.history.push("tiep-dan-truc-tiep");
  };
  const renderThaoTacSoTiep = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role.edit ? */}
        <Tooltip title={"Sửa"}>
          {/* <Link to={"tiep-dan-truc-tiep"}> */}
          <EditOutlined
            style={{ color: "black", marginRight: "4px" }}
            onClick={(e) => {
              e.stopPropagation();
              // e.preventDefault();
              SuaDonThu(record);
            }}
          />
          {/* </Link> */}
        </Tooltip>
        {/* : ""} */}
        {/* {role.delete ? */}
        <Tooltip title={"Xóa"}>
          <DeleteOutlined
            onClick={(e) => {
              e.stopPropagation();
              // e.preventDefault();
              XoaDonThu(record);
            }}
          />
        </Tooltip>
        {/* : ""} */}
      </div>
    );
  };
  const ModalDanKhongDen = (record) => {
    setIsModalDanKhongDen(true);
    setDataDanKhongDen(record);
  };
  const DeleteDanKhongDen = (record) => {
    console.log(record, "record");
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có chắc chắn muốn xóa?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        api
          .XoaDanKhongDen({
            DanKhongDenID: record.DanKhongDenID,
            CanBoID: user?.CanBoID,
            CoQuanID: user?.CoQuanID,
            TenCanBo: record.TenCanBo,
            NguoiTaoID: record.NguoiTaoID,
            NgayTruc: record.NgayTruc,
            NgayTrucStr: record.NgayTrucStr,
            ChucVu: record.ChucVu,
          })
          .then((res) => {
            if (res.data.Status > 0) {
              props.getDataDanKhongDen({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
              message.success(res.data.Message);
            } else {
              message.error(res.data.Message);
            }
          });
      },
    });
  };

  const renderThaoTacDanhSach = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role.edit ? */}
        <Tooltip title={"Sửa"} onClick={() => ModalDanKhongDen(record)}>
          <EditOutlined />
        </Tooltip>
        {/* : ""} */}
        {/* {role.delete ? */}
        <Tooltip title={"Xóa"} onClick={() => DeleteDanKhongDen(record)}>
          <DeleteOutlined />
        </Tooltip>
        {/* : ""} */}
        <Tooltip title={"In"}>
          <PrinterOutlined onClick={ShowModalInPhieu} />
        </Tooltip>
      </div>
    );
  };
  const renderHoTen = (record) => {
    let hoten = record.HoTen.replaceAll("<br/>", "-").split(",-");
    hoten[0] = hoten[0].replace("-", "");
    return (
      <ul>
        {hoten.map((item, index) => (
          <li key={index}>- {item.trim()}</li>
        ))}
      </ul>
    );
  };
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

  const showModalChiTiet = (record) => {
    setIsModalOpen(true);
    setDataEdit(record);
  };
  const columnSoTiepCongDan = [
    {
      title: "STT",
      width: "7%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Số đơn",
      dataIndex: "SoDon",
      align: "center",
      width: "10%",
    },
    {
      title: "Ngày tiếp",
      dataIndex: "NgayTiep",
      align: "left",
      width: "15%",
      render: (_, record) => handleDate(record.NgayTiep),
    },
    {
      title: "Họ tên - Địa Chỉ_ CMND/Hộ chiếu của công dân",
      align: "left",
      width: "20%",
      render: (_, record) => renderHoTen(record),
    },
    {
      title: "Nội dung vụ việc",
      dataIndex: "NoiDungDon",
      align: "left",
      width: "30%",
    },
    {
      title: "Phân loại đơn / Số người",
      dataIndex: "SoLuong",
      width: "10%",
      align: "center",
    },
    {
      title: "Cơ quan đã GQ",
      dataIndex: "TenCoQuan",
      width: "15%",
      align: "center",
    },
    {
      title: "Hướng xử lý",
      dataIndex: "HuongGiaiQuyetID",
      children: [
        {
          title: "Thụ lý để giải quyết",
          align: "center",
          render: (_, record) => (record.HuongGiaiQuyetID == 31 ? <>X</> : ""),
          key: "age",
          width: 70,
        },
        {
          title: "Trả lại đơn và hướng dẫn",
          align: "center",
          render: (_, record) => (record.HuongGiaiQuyetID == 33 ? <>X</> : ""),
          key: "age",
          width: 70,
        },
        {
          title: "Chuyển đơn đến cơ quan, tổ chức đơn vị có thẩm quyền",
          align: "center",
          render: (_, record) => (record.HuongGiaiQuyetID == 32 ? <>X</> : ""),
          key: "age",
          width: 80,
        },
      ],
      width: "15%",
      align: "center",
    },
    {
      title: "Theo dõi kết quả giải quyết",
      dataIndex: "TenLanhDaoTiep",
      width: "15%",
      align: "center",
    },
    {
      title: "Lãnh đạo tiếp",
      dataIndex: "TenLanhDaoTiep",
      width: "15%",
      align: "center",
    },
    {
      title: "Ghi chú",
      dataIndex: "TenLanhDaoTiep",
      width: "15%",
      align: "center",
    },
    {
      title: "Kết quả",
      dataIndex: "KetQuaTiep",
      width: "15%",
      align: "center",
    },
    {
      title: "Thao tác",
      width: "15%",
      align: "center",
      render: (text, record) => renderThaoTacSoTiep(record),
    },
  ];

  const columnList = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Ngày trực tiếp dân",
      dataIndex: "NgayTrucStr",
      align: "center",
      width: "25%",
    },
    {
      title: "Lãnh đạo",
      dataIndex: "TenCanBo",
      align: "left",
      width: "25%",
    },
    {
      title: "Chức vụ",
      dataIndex: "ChucVu",
      align: "center",
      width: "35%",
    },
    {
      title: "Thao tác",
      align: "center",
      width: "15%",
      render: (text, record) => renderThaoTacDanhSach(record),
    },
  ];
  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    // setSelectedRowsKey([]);
  };

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  return (
    <Wrapper>
      <LayoutWrapper>
        <PageHeader>Sổ tiếp công dân</PageHeader>
        <PageAction>
          <ButtonList
            type="primary"
            icon={ListIcon(list)}
            onClick={showModalList}
          >
            <span>Danh sách gặp lãnh đạo</span>
          </ButtonList>
          <ButtonPrint
            type="primary"
            icon={PrintIcon(print)}
            onClick={showModalPrintBook}
          >
            In sổ
          </ButtonPrint>
          <ButtonCancelPrimary type="primary" icon={WorkIcon(work)}>
            <Link to={"tiep-dan-truc-tiep"}>Tiếp công dân</Link>
          </ButtonCancelPrimary>
        </PageAction>
        <Box>
          {/* Content */}
          <BgrColorTabs className="test">
            <Tabs defaultActiveKey="1" type="card">
              <Tabs.TabPane tab="Quản lý sổ tiếp công dân" key="1">
                <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
                  <Panel
                    className="collapse-item-reverse"
                    header="Tìm kiếm thông tin"
                    key="1"
                  >
                    <FormSearchData
                      setFilterData={setFilterData}
                      setDanhSachKhieuTo={setDanhSachKhieuTo}
                    />
                  </Panel>
                </Collapse>
                <BoxTable
                  loading={props.tableLoading}
                  columns={columnSoTiepCongDan}
                  dataSource={SoTiepDan}
                  onChange={onTableChange}
                  pagination={{
                    showSizeChanger: true,
                    showTotal: (total, range) =>
                      `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
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
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Danh sách lãnh đạo tiếp nhưng dân không đến"
                key="2"
              >
                <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
                  <Panel
                    className="collapse-item-reverse"
                    header="Tìm kiếm thông tin"
                    key="1"
                  >
                    <FormListLeader
                      setFilterData={setFilterDataDanKhongDen}
                    ></FormListLeader>
                  </Panel>
                </Collapse>
                <BoxTable
                  loading={props.tableLoading}
                  columns={columnList}
                  dataSource={DanhSachDanKhongDen}
                />
              </Tabs.TabPane>
            </Tabs>
          </BgrColorTabs>
        </Box>
      </LayoutWrapper>
      <ModalList
        open={isModalOpenLanhDao}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <ModalChiTiet
        title="Chi tiết đơn thư"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        dataEdit={dataEdit}
        danhSachKhieuTo={danhSachKhieuTo}
        XoaDonThu={XoaDonThu}
        setIsModalOpenChiTiet={setIsModalOpen}
        SuaDonThu={SuaDonThu}
      />
      <ModalEditDanKhongDen
        open={isModalOpenDanKhongDen}
        onOk={handleOk}
        onCancel={handleCancel}
        DanhSachDanKhongDen={DanhSachDanKhongDen}
        data={dataDanKhongDen}
        getData={props.getDataDanKhongDen}
        filterData={filterData}
      />
      <ModalPrintBook
        open={isModalOpenBook}
        onOk={handleOk}
        onCancel={handleCancel}
        setFilterData={setFilterData}
        SoTiepDan={SoTiepDan}
      />
      <ModalInPhieu
        open={isModalInPhieu}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.SoTiepDanTrucTiep,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(QLNamHoc);
