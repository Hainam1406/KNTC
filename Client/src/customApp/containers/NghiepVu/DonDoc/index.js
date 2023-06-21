import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/NghiepVu/DonDoc/action";
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
import FormSearchData from "./FormSearch";

import Wrapper, {
  FooterPageAction,
  ButtonList,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonPrint,
  ButtonCancelForm,
  ButtonDisabled,
} from "../DonThuDaTiepNhan/styled";
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
import { BgrColorTabs } from "../DonThuDaTiepNhan/styled";
import ModalList from "../SoTiepDanTrucTiep/modalAddEdit";
import { Link } from "react-router-dom";
// import { Modal, ModalCustom } from "../../../../components/uielements/exportComponent";
import ModalChiTiet from "../SoTiepDanTrucTiep/modalChiTiet";
import Collapse from "../../../../components/uielements/collapse";
import { Button } from "../../../../components/uielements/exportComponent";
import err from "../SoTiepNhanGianTiep/img/error.svg";
import resolved from "../SoTiepNhanGianTiep/img/resolved.svg";
import ModalInPhieu from "../SoTiepDanTrucTiep/ModalInPhieu";
// import ModalXuLyDon from "./modalXuLyDon";

// import XuLyDon from "./xuLyDon";
import actionXuLyDon from "../../../redux/NghiepVu/TiepDanGianTiep/action";
import actionSuaDon from "../../../redux/NghiepVu/TiepDanTrucTiep/action";
import actionsQuocTich from "../../../redux/DanhMuc/DanhMucQuocTich/actions";
import ModalPrintBook from "../SoTiepDanTrucTiep/modalPrintBook";
import actionsCoQuanDonVi from "../../../redux/DanhMuc/DMCoQuan/actions";
import RaVanBanDonDoc from "./modalXuLyDon";
import dayjs from "dayjs";
import moment from "moment";

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
  const { DanhSachCanDonDoc, TotalRow, role } = props;
  document.title = "Đơn thư cần đôn đốc";
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
  const [isModalXuLyDonOpen, setIsModalXuLyDonOpen] = useState(false);
  const [isModalOpenBook, setIsModalOpenBook] = useState(false);

  const [action, setAction] = useState("");
  let formatDate = ["YYYY-MM-DD", "DD/MM/YYYY"];

  useEffect(() => {
    dispatch(actions.getData(filterData));
    dispatch(actionsQuocTich.getList({ PageNumber: 0, PageSize: 0 }));
  }, [filterData]);
  useEffect(() => {
    props.getListCoQuanDonVi();
  }, []);
  const handleDate = (dateString) => {
    let newDateString = dateString.split("T")[0];

    if (dayjs(newDateString, formatDate[0], true).isValid())
      return dayjs(newDateString, formatDate[0], true);
    else if (dayjs(newDateString, formatDate[1], true).isValid())
      return dayjs(newDateString, formatDate[1], true);
    else return undefined;
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
      dataIndex: "PhanLoai",
      width: "10%",
      align: "center",
    },
    {
      title: "Hướng xử lý",
      dataIndex: "TenHuongXuLy",
      width: "10%",
      align: "center",
    },

    {
      title: "Cơ quan xử lý",
      dataIndex: "TenCoQuan",
      width: "15%",
      align: "center",
    },
    {
      title: "Hạn xử lý",
      dataIndex: "HanXuLy",
      width: "15%",
      align: "center",
      render: (_, record) => {
        const formattedDate = moment(record.HanXuLy).format("DD-MM-YYYY");
        return <p>{formattedDate}</p>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "TenTrangThai",
      width: "15%",
      align: "center",
    },
    {
      title: "Trạng thái đôn đốc",
      dataIndex: "TenTrangThaiDonDoc",
      width: "15%",
      align: "center",
    },
  ];
  const openModal = () => {
    setIsModalXuLyDonOpen(true);
  };
  const cancelModal = () => {
    setIsModalXuLyDonOpen(false);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {
      if (
        (selectedRows.length === 1 &&
          record.TenTrangThai === "Chưa giải quyết") ||
        record.TenTrangThai === "Đang giải quyết"
      ) {
        setCheckButtonEdit(true);
      } else if (selectedRows.length > 1) {
        setCheckButtonEdit(false);
      } else {
        setCheckButtonEdit(false);
      }

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
    setIsModalXuLyDonOpen(false);
    setIsModalOpenBook(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenInPhieu(false);
    setIsModalXuLyDonOpen(false);
    setIsModalOpenBook(false);
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
    let XuLyDonID = rowSelected[0]?.XuLyDonID;
    // props.history.push(`tiep-dan-gian-tiep?XuLyDonID=${XuLyDonID}`);
    setIsModalXuLyDonOpen(true);
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
        console.log(rowSelected[0].DonThuID, "Chưa trình");
        let newArray = DonThuDaTiepNhan.map((item) => {
          let newItem = { ...item };
          if (item.DonThuID == rowSelected[0].DonThuID) {
            newItem.StateName = "Đã trình";
            console.log("ok");
          }
          return newItem;
        });
        dispatch(
          actions.editDataSuccess({
            newArr: newArray,
          })
        );
        message.success("Trình lãnh đạo thành công");
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

  const HightLightRow = (record) => {
    return record.TenTrangThai === "Đã giải quyết" &&
      record.TenTrangThaiDonDoc == "Chưa đôn đốc"
      ? "text-color-default"
      : "text-color-red";
  };
  return (
    <Wrapper>
      <LayoutWrapper>
        <PageHeader>Danh sách đơn thư cần đôn đốc</PageHeader>
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
          {checkButtonEdit ? (
            <Button onClick={openModal}>Ra văn bản đôn đốc</Button>
          ) : (
            ""
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
            rowClassName={(record, index) => HightLightRow(record)}
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
            dataSource={customData(DanhSachCanDonDoc)}
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
        dataEdit={dataEdit}
        SuaDonThu={SuaDonThu}
        XoaDonThu={XoaDon}
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
      {/* <ModalPrintBook
        open={isModalOpenBook}
        onOk={handleOk}
        onCancel={handleCancel}
        setFilterData={setFilterData}
        SoTiepDan={DonThuDaTiepNhan}
        action={action}
      /> */}
      <RaVanBanDonDoc
        open={isModalXuLyDonOpen}
        onCancel={cancelModal}
        data={rowSelected[0]}
      />
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DonDoc,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, {
  ...actions,
  getListCoQuanDonVi: actionsCoQuanDonVi.getList,
})(QLNamHoc);
