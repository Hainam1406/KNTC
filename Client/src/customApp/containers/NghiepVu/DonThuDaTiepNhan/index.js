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
  getDefaultPageSize,
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
  ButtonDisabled,
} from "./styled";
import api from "./config";
import list from "../SoTiepDanTrucTiep/img/list.svg";
import print from "../SoTiepDanTrucTiep/img/printer.svg";
import work from "../SoTiepDanTrucTiep/img/working-with-laptop.svg";
import write from "../SoTiepDanTrucTiep/img/write.svg";
import { Tabs, Tooltip, Modal, message, Spin } from "antd";
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
import err from "../SoTiepNhanGianTiep/img/error.svg";
import resolved from "../SoTiepNhanGianTiep/img/resolved.svg";
import ModalInPhieu from "../SoTiepDanTrucTiep/ModalInPhieu";
import ModalXuLyDon from "./modalXuLyDon";

// import XuLyDon from "./xuLyDon";
import actionXuLyDon from "../../../redux/NghiepVu/TiepDanGianTiep/action";
import actionSuaDon from "../../../redux/NghiepVu/TiepDanTrucTiep/action";
import actionsQuocTich from "../../../redux/DanhMuc/DanhMucQuocTich/actions";
import ModalPrintBook from "../SoTiepDanTrucTiep/modalPrintBook";

const DeleteIcon = (image) => {
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

const UpdateIcon = (image) => {
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
  const { DonThuDaTiepNhan, TotalRow, role } = props;
  document.title = "Đơn thư đã tiếp nhận";
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalInPhieu, setIsModalOpenInPhieu] = useState(false);
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [checkButtonEdit, setCheckButtonEdit] = useState(false);
  const [checkDisable, setCheckDisable] = useState(false);
  const [rowSelected, setRowSelected] = useState([0]);
  // const [isModalXuLyDonOpen, setIsModalXuLyDonOpen] = useState(false);
  const [isModalOpenBook, setIsModalOpenBook] = useState(false);
  const [action, setAction] = useState("");
  const [selectedRowKeys, setSelected] = useState([]);

  useEffect(() => {
    props.getData(filterData);
    dispatch(actionsQuocTich.getList({ PageNumber: 0, PageSize: 0 }));
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
      // render: (_, record) => renderNguonDonDen(record),
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
      title: "Ngày tiếp nhận",
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
      title: "Kết quả",
      dataIndex: "HuongXuLy",
      width: "15%",
      align: "center",
    },
  ];
  const ReloadSelected = (seclected, selecteds) => {
    setSelected(seclected);
  };
  const rowSelection = {
    // onChange: (selectedRowKeys, selectedRows) => {
    //   [...selectedRowKeys].pop();
    // },
    selectedRowKeys,
    onChange: ReloadSelected,
    onSelect: (record, selected, selectedRows) => {
      if (selectedRows.length >= 1) {
        setCheckButtonEdit(true);
      } else if (selectedRows.length == 0) {
        setCheckButtonEdit(false);
      }
      // if (selectedRowKeys.length > 1) {
      //       const lastSelectedRowIndex = [...selectedRowKeys].pop();
      //       this.setState({ selectedRowKeys: lastSelectedRowIndex });
      //     }
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
  };
  const showModalPrintBook = () => {
    setIsModalOpenBook(true);
    setAction("DonTiepNhan");
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpenInPhieu(false);
    // setIsModalXuLyDonOpen(false);
    setIsModalOpenBook(false);
    setAction("");
  };
  const handleCancel = () => {
    setSelected([]);
    setIsModalOpen(false);
    setIsModalOpenInPhieu(false);
    // setIsModalXuLyDonOpen(false);
    setIsModalOpenBook(false);
    setAction("");
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

  const ModalPrint = () => {
    setIsModalOpenInPhieu(true);
  };
  const XuLyDon = () => {
    // let XuLyDonID = rowSelected[0]?.XuLyDonID;
    // let DonThuID = rowSelected[0]?.DonThuID;
    // props.history.push(
    //   `tiep-dan-gian-tiep?XuLyDonID=${XuLyDonID}&DonThuID=${DonThuID}&HuongXuLy=true`
    // );
    setIsModalOpen(true);
    setAction("Xử lý đơn");
  };
  const SuaDon = () => {
    dispatch(
      actionSuaDon.setDonThuID({
        DonThuID: rowSelected[0].DonThuID,
        action: false,
        XuLyDonID: rowSelected[0].XuLyDonID,
      })
    );
    props.history.push("tiep-dan-truc-tiep");
  };
  const SuaDonThu = (id) => {
    console.log(id);
    dispatch(
      actionSuaDon.setDonThuID({
        DonThuID: dataEdit.DonThuID,
        XuLyDonID: dataEdit.XuLyDonID,
        action: false,
      })
    );
    props.history.push("tiep-dan-truc-tiep");
  };

  const ModalTrinhLanhDao = () => {
    Modal.confirm({
      title: "Trình lãnh đạo",
      content: "Bạn có muốn trình đơn thư này lên lãnh đao không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        api
          .TrinhLanhDao({
            XuLyDonID: rowSelected[0].XuLyDonID,
            NguonDonDen: rowSelected[0].NguonDonDen,
            HuongGiaiQuyetID: rowSelected[0].HuongGiaiQuyetID,
          })
          .then((res) => {
            if (res.data.Status > 0) {
              props.getData(filterData);
              setSelected([]);
              message.success(res.data.Message);
            } else {
              message.error("Trình không thành công");
            }
          });
      },
    });
  };
  const XoaDonThu = () => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa đơn thư này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        // console.log(record.TiepDanKhongDonID)
        setConfirmLoading(true);
        api
          .XoaDonThu({
            DonThuID: rowSelected[0]?.DonThuID,
            XuLyDonID: rowSelected[0]?.XuLyDonID,
            pNhomKNID: rowSelected[0]?.pNhomKNID,
            pDoiTuongBiKNID: rowSelected[0]?.pDoiTuongBiKNID,
          })
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
  const XoaDon = () => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa đơn thư này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        // console.log(record.TiepDanKhongDonID)
        setConfirmLoading(true);
        api
          .XoaDonThu({
            DonThuID: dataEdit.DonThuID,
            XuLyDonID: dataEdit.XuLyDonID,
            pNhomKNID: dataEdit.pNhomKNID,
            pDoiTuongBiKNID: dataEdit.pDoiTuongBiKNID,
          })
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
  const insertList = () => {
    message.success("In thành công");
  };

  return (
    <Wrapper>
      <LayoutWrapper>
        <PageHeader>Đơn thư đã tiếp nhận</PageHeader>
        <PageAction>
          <ButtonPrint
            type="primary"
            icon={PrintIcon(print)}
            onClick={showModalPrintBook}
          >
            {/* <a
              href="https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/Exportexcel"
              style={{
                padding: 5,
              }}
            > */}
            In danh sách
            {/* </a> */}
          </ButtonPrint>
          {checkButtonEdit == true ? (
            <>
              <ButtonDisabled
                disabled={checkDisable}
                icon={UpdateIcon(list)}
                onClick={XuLyDon}
              >
                Xử lý đơn
              </ButtonDisabled>
              <ButtonDisabled
                disabled={checkDisable}
                icon={UpdateIcon(write)}
                onClick={SuaDon}
              >
                Sửa
              </ButtonDisabled>
              {rowSelected[0].StateName == "Chưa trình" &&
              rowSelected[0].HuongGiaiQuyetID != 0 ? (
                <>
                  <ButtonDisabled
                    disabled={checkDisable}
                    icon={UpdateIcon(resolved)}
                    onClick={ModalTrinhLanhDao}
                  >
                    Trình lãnh đạo
                  </ButtonDisabled>
                </>
              ) : (
                ""
              )}
              <ButtonCancelForm
                style={{ color: "#fff" }}
                icon={DeleteIcon(err)}
                onClick={XoaDonThu}
              >
                Xóa
              </ButtonCancelForm>
              <ButtonCancelPrimary
                style={{ color: "#fff" }}
                icon={PrintIcon(print)}
                onClick={ModalPrint}
              >
                In phiếu
              </ButtonCancelPrimary>
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
              header="Tìm kiếm thông tin"
              key="1"
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
            rowSelection={{
              ...rowSelection,
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
            dataSource={customData(DonThuDaTiepNhan)}
          />

          {/* xử lý đơn */}
          {/* <XuLyDon /> */}
        </Box>
      </LayoutWrapper>
      <ModalChiTiet
        title="Chi tiết đơn thư"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        dataEdit={rowSelected[0] || dataEdit}
        SuaDonThu={SuaDonThu}
        XoaDonThu={XoaDon}
        action={action}
        filterData={filterData}
      />
      <ModalInPhieu
        open={isModalInPhieu}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      {/* <ModalXuLyDon
        open={isModalXuLyDonOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      /> */}
      <ModalPrintBook
        open={isModalOpenBook}
        onOk={handleOk}
        onCancel={handleCancel}
        setFilterData={setFilterData}
        SoTiepDan={DonThuDaTiepNhan}
        action={action}
      />
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
