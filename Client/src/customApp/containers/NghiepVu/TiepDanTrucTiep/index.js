import { Modal, Table, Tooltip, message, Row, Col, Input } from "antd";
import Form from "../../../../components/uielements/form";
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/NghiepVu/TiepDanTrucTiep/action";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import Checkbox from "../../../../components/uielements/checkbox";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  InputSearch,
} from "../../../../components/uielements/exportComponent";
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
// import api from "./config";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { CheckboxGroup } from "../../../../components/uielements/checkbox";
import Wrapper, {
  FooterPageAction,
  ButtonSave,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonSavePrint,
  ButtonCancelForm,
} from "./styled";
import TTHSTiepDan from "./ThongTinTiepDan/thongtintiepdan";
import DoiTuongKhainai from "./DoiTuongKhieuNai/DoiTuongKhainai";
import PhanLoai from "./PhanLoaiVuViec/PhanLoai";
import ThongTinLanhDaoTiep from "./ThongTinLanhDaoTiep/ThongTinLanhDaoTiep";
import TiepDanCoDonThu from "./TiepDanCoDonThu/TiepDanCoDonThu";
import Collapse from "../../../../components/uielements/collapse";
import api from "../TiepDanGianTiep/config";
import apiTiepDanTrucTiep from "./config";

//
import actionsDanToc from "../../../redux/DanhMuc/DanhMucDanToc/action";
import actionsQuocTich from "../../../redux/DanhMuc/DanhMucQuocTich/actions";
import actionsNguonDonDen from "../../../redux/DanhMuc/DanhMucNguonDonDen/actions";
import actionsCoQuanDonVi from "../../../redux/DanhMuc/DMCoQuan/actions";
import actionsDiaGioi from "../../../redux/DanhMuc/DMDiaGioi/actions";
import actionsLoaiKhieuTo from "../../../redux/DanhMuc/DMLoaiKhieuTo/actions";
import actionsChucVu from "../../../redux/DanhMuc/DMChucVu/actions";
// import ThongTinDoiTuongKhieuNaiBiToCao from "./ThongTinDoiTuongBiKhieuNai/ThongTinDTBiKhieuNai";
import NoiDungKetQua from "./NoiDungKetQuaTiep/NoiDungKetQua";
import ModalDanKhongDen from "./components/ModalDanKhongDen/ModalDanKhongDenForm";
import { isWeakMap } from "lodash";
import ModalConfirm from "../TiepDanGianTiep/components/modalConfirm";
import ThongTinDoiTuongKhieuNaiBiToCao from "./ThongTinDoiTuongBiKhieuNai/thongTinDoiTuongBiKhieuNaiToCao";
// import { setDatasets } from "react-chartjs-2/dist/utils";

const QLNamHoc = (props) => {
  const { Panel } = Collapse;
  document.title = "Tiếp Dân Trực Tiếp";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  // const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [vuViecCu, setVuViecCu] = useState();
  const [isModalDanKhongDen, setIsModalDanKhongDen] = useState(false);
  const [ThongTinDTKNBiToCaoChecked, setThongTinDTKNBiToCao] = useState(false);
  const [tiepDanCoDonThuChecker, setTiepDanCoDonThuChecker] = useState(false);
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);
  const [isLoadingModalConfirm, setIsLoadingModalConfirm] = useState(false);
  const [dataSTT, setDataSTT] = useState(false);
  const [FileChitiet, setFileChiTiet] = useState();

  // form
  const [ThongTinTiepNhanDonThuForm] = Form.useForm();
  const [DoiTuongKhieuNaiToCaoForm] = Form.useForm();
  const [ThongTinDonThuForm] = Form.useForm();
  const [ThongTinLanhDaoTiepForm] = Form.useForm();
  const [TiepDanCoDonThuForm] = Form.useForm();
  const [ThongTinDoiTuongKhieuNaiBiToCaoForm] = Form.useForm();
  const [NoiDungKetQuaForm] = Form.useForm();
  const [chiTietDonTrung, setChiTietDonTrung] = useState();
  const [doiTuong, setLoaiDoiTuong] = useState(1);

  const dispatch = useDispatch();
  const action = useSelector((state) => state.ReducerTiepDan.actionTiepDan);
  const loaidoituong = useSelector(
    (state) => state.ReducerTiepDan.LoaiDoiTuongID
  );
  console.log(loaidoituong);
  const donThuID = useSelector((state) => state.ReducerTiepDan.DonThuID);
  const xuLyDonID = useSelector((state) => state.ReducerTiepDan.XuLyDonID);
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    changeUrlFilter(filterData);
    // props.getData(filterData);
  }, [filterData]);
  useEffect(() => {
    // props.getData(filterData);
    props.getListDanToc({
      PageNumber: 0,
      PageSize: 0,
    });
    props.getListQuocTich({
      PageNumber: 0,
      PageSize: 0,
    });
    props.getListNguonDonDen({
      PageNumber: 0,
      PageSize: 0,
    });
    props.getListCoQuanDonVi();
    props.getListTinh();
    props.getListLoaiKhieuTo();
    props.getListChucVu({
      PageNumber: 0,
      PageSize: 0,
    });
  }, []);
  useEffect(() => {
    if (donThuID !== 0 && xuLyDonID !== 0) {
      getDetailDonTrung(donThuID, xuLyDonID);
      getChiTietFile(donThuID, xuLyDonID);
      setThongTinDTKNBiToCao(true);
      setTiepDanCoDonThuChecker(true);
    } else {
      setChiTietDonTrung();
    }
  }, [donThuID, xuLyDonID]);
  const getDetailDonTrung = async (DonThuID, XuLyDonID) => {
    try {
      let res = await apiTiepDanTrucTiep.ChiTietDonThu({ DonThuID, XuLyDonID });

      let { Status, Data, Message } = res.data;

      if (Status === 1) {
        setChiTietDonTrung(Data);
      } else {
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const getChiTietFile = async (DonThuID, XuLyDonID) => {
    try {
      let res = await api.ChiTietDonThu({ DonThuID, XuLyDonID });

      let { Status, Data, Message } = res.data;
      console.log(Data, "beu");

      if (Status === 1) {
        setFileChiTiet(Data);
      } else {
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleResetForm = () => {
    setIsLoadingModalConfirm(true);
    setDataSTT((pre) => !pre);
    Promise.all([
      ThongTinTiepNhanDonThuForm.resetFields(),
      DoiTuongKhieuNaiToCaoForm.resetFields(),
      ThongTinDonThuForm.resetFields(),
      ThongTinLanhDaoTiepForm.resetFields(),
      TiepDanCoDonThuForm.resetFields(),
      ThongTinDoiTuongKhieuNaiBiToCaoForm.resetFields(),
      NoiDungKetQuaForm.resetFields(),
    ])
      .then(() => {
        dispatch(
          actions.setDonThuID({ DonThuID: 0, action: null, XuLyDonID: 0 })
        );
      })
      .then(() => setIsLoadingModalConfirm(false))
      .then(() => setThongTinDTKNBiToCao(false))
      .then(() => setTiepDanCoDonThuChecker(false));
  };

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    setSelectedRowsKey([]);
  };
  const handleShowPanel = (e) => {
    const { checked } = e.target;
    setThongTinDTKNBiToCao(checked);
  };
  const handlerShowPanelCoDonThu = (e) => {
    const { checked } = e.target;
    setTiepDanCoDonThuChecker(checked);
  };

  const handleTiepDan = async (data, file) => {
    console.log(data);
    if (donThuID && !action) {
      const res = await apiTiepDanTrucTiep.SuaDonThu(data);
      const { Status, Message } = res.data;
      if (Status > 0) {
        message.success(Message);
        handleResetForm();
        props.history.push("so-tiep-cong-dan");
      } else {
        message.error(Message);
      }
    } else {
      let formData = new FormData();
      formData.append("TiepDanStr", JSON.stringify({ ...data }));
      console.log(file);
      if (file)
        file.forEach((file) => {
          formData.append("files", file);
        });

      const res = await apiTiepDanTrucTiep.ThemMoiDonThu(formData);
      const { Status, Message } = res.data;
      if (Status > 0) {
        message.success(Message);
        handleResetForm();
        props.history.push("so-tiep-cong-dan");
      } else {
        message.error(Message);
      }
    }
  };

  const onSubmit = async () => {
    Promise.all([
      ThongTinTiepNhanDonThuForm.validateFields(),
      DoiTuongKhieuNaiToCaoForm.validateFields(),
      ThongTinDonThuForm.validateFields(),
      ThongTinLanhDaoTiepForm.validateFields(),
      TiepDanCoDonThuForm.validateFields(),
      ThongTinDoiTuongKhieuNaiBiToCaoForm.validateFields(),
      NoiDungKetQuaForm.validateFields(),
    ]).then((result) => {
      console.log(result, "123123");
      let TiepDanKhongDon = [
        {
          vuViecCu: result[0].vuViecCu || false,
          ...result[6],
          GapLanhDao: result[3].GapLanhDao,
          LanhDaoDangKy: result[3].LanhDaoDangKy || "Lộc Quang Sơn",
          TenLanhDaoTiep: result[3].TenLanhDaoTiep || "Trần Quang Tuấn",
          // ...result[4],
          NgayNhapDon: dayjs(result[0].NgayNhapDon).format("YYYY-MM-DD"),
          CanBoTiepID: user.CanBoID,
          CoQuanID: user.CoQuanID,
          NgayGapLanhDao: dayjs().format("YYYY-MM-DD"),
          NgayTiep: dayjs(result[0].NgayNhapDon).format("YYYY-MM-DD"),
          LanTiep: 1,
          ThanhPhanThamGia: null,
          themMoiFileHoSo: null,
          SoDon: "1",
          KetQuaTiep: "Thụ ly",
          NgayTiep: dayjs().format("YYYY-MM-DD"),
          LoaiKhieuTo1ID: result[2].LoaiKhieuTo1ID,
          LoaiKhieuTo2ID: result[2].LoaiKhieuTo2ID,
          LoaiKhieuTo3ID: result[2].LoaiKhieuTo3ID,
          XuLyDonID: xuLyDonID || 0,
          DonThuID: donThuID || 0,
          TiepDanKhongDonID: 0,
          // NhomKNID: donThuID ? chiTietDonTrung?.NhomKN[0]?.NhomKNID : undefined,
        },
      ];
      let XuLyDon = [
        {
          ...result[0],
          // ...result[6],
          // ...result[3],
          // ...result[4],
          XuLyDonID: xuLyDonID || 0,
          DonThuID: donThuID || 0,
          NgayNhapDon: dayjs(result[0].NgayNhapDon).format("YYYY-MM-DD"),
          CanBoTiepNhapID: user.CanBoID,
          CoQuanID: user.CoQuanID,
          NgayChuyenDon: dayjs(result[0].NgayNhapDon).format("YYYY-MM-DD"),
          CanBoXuLyID: donThuID ? 132 : 0,
          SoCongVan: "String",
          HuongGiaiQuyetID: 31,
          CQDaGiaiQuyetID: "string",
          SoLan: donThuID ? "1" : "1",
          NguonDonDen: donThuID ? 26 : 0,
          CQChuyenDonDenID: 0,

          // NgayGapLanhDao: dayjs().format("YYYY-MM-DD"),
          // LanTiep: 0,
          // ThanhPhanThamGia: null,
          // themMoiFileHoSo: null,
          // TiepDanKhongDonID: 0,
        },
      ];

      let DoiTuongKN = [];
      let NhomKN = [];
      const { LoaiKhieuTo1ID, LoaiKhieuTo2ID, LoaiKhieuTo3ID } = result[2];
      let DonThu = [
        {
          ...result[4],
          DonThuID: donThuID ? donThuID : undefined,
          LoaiKhieuToID: LoaiKhieuTo1ID,
          LoaiKhieuTo1ID: LoaiKhieuTo1ID,
          LoaiKhieuTo2ID: LoaiKhieuTo2ID,
          LoaiKhieuTo3ID: LoaiKhieuTo3ID,
          LeTanChuyen: true,
          TrungDon: true,
          NgayVietDon: dayjs().format("YYYY-MM-DD"),
          themMoiFileHoSo: null,
          NhomKNID: donThuID ? chiTietDonTrung?.NhomKN[0]?.NhomKNID : 0,
          DoiTuongKNID: donThuID
            ? chiTietDonTrung?.DoiTuongKN[0].DoiTuongKNID
            : 0,
        },
      ];

      let DoiTuongBiKN = [];
      let CaNhanBiKN = [];
      let ThanhPhanThamGia = result[3].ThanhPhanThamGia;

      let { LoaiDoiTuongKNID, NgayCap, ...doiTuongKN } = result[1];

      if (result[1].NguoiDaiDien) {
        let { NguoiDaiDien, ThongTinUyQuyen, TenCQ, DiaChiCQ, ...rest } =
          result[1];
        DoiTuongKN = NguoiDaiDien;
        NhomKN = [
          {
            ...rest,
            LoaiDoiTuongKNID: loaidoituong || 1,
            SoLuong: Number(rest.SoLuong) || 1,
            NgayCap: dayjs(NgayCap).format("YYYY-MM-DD"),
            DaiDienPhapLy: false,
            DuocUyQuyen: false,
            TenCQ: TenCQ || "",
            DiaChiCQ: DiaChiCQ || "",
          },
        ];
      } else {
        if (result[1].TenCQ) {
          let { TenCQ, DiaChiCQ, DaiDienPhapLy, DuocUyQuyen, ...rest } =
            doiTuongKN;
          NhomKN = [
            {
              LoaiDoiTuongKNID: loaidoituong || 1,
              TenCQ: TenCQ || "",
              DiaChiCQ: DiaChiCQ || "",
              DaiDienPhapLy: DaiDienPhapLy == 1 ? true : false,
              DuocUyQuyen: DuocUyQuyen == 1 ? false : true,
              NhomKNID: donThuID ? chiTietDonTrung?.NhomKN[0]?.NhomKNID : 0,
              SoLuong: 1,
            },
          ];
          DoiTuongKN = [
            {
              ...rest,
              SoLuong: 1,
              DaiDienPhapLy: false,
              DuocUyQuyen: false,
              SoNha: null,
              NhomKNID: donThuID ? chiTietDonTrung?.NhomKN[0]?.NhomKNID : 0,
              DoiTuongKNID: donThuID
                ? chiTietDonTrung?.DoiTuongKN[0].DoiTuongKNID
                : 0,
            },
          ];
        } else {
          NhomKN = [
            {
              LoaiDoiTuongKNID: loaidoituong || 1,
              TenCQ: "",
              DiaChiCQ: "",
              SoNha: null,
              SoLuong: 1,
              DaiDienPhapLy: true,
              DuocUyQuyen: false,
              NhomKNID: donThuID ? chiTietDonTrung?.NhomKN[0]?.NhomKNID : 0,
            },
          ];
          DoiTuongKN = [
            {
              ...doiTuongKN,
              NgayCap: dayjs(NgayCap).format("YYYY-MM-DD"),
              SoNha: null,
              TenTinh: "string",
              TenHuyen: "string",
              TenXa: "string",
              TenQuocTich: "string",
              TenDanToc: "string",
              DoiTuongKNID: donThuID
                ? chiTietDonTrung?.DoiTuongKN[0].DoiTuongKNID
                : 0,
              NhomKNID: donThuID ? chiTietDonTrung?.NhomKN[0]?.NhomKNID : 0,
            },
          ];
        }
      }

      if (result[5].TenCoQuanToChuc) {
        DoiTuongBiKN = [
          {
            ...result[5],
            CheckAdd: true,
            TenDoiTuongBiKN: result[5].TenCoQuanToChuc || "",
          },
        ];
      } else {
        let {
          LoaiDoiTuongBiKNID,
          TenDoiTuongBiKN,
          TinhID,
          HuyenID,
          XaID,
          DiaChiCT,
          ChucVuID,
          NoiCongTac,
          NgheNghiep,
          QuocTichID,
          DanTocID,
          ...rest
        } = result[5];
        DoiTuongBiKN = [
          {
            LoaiDoiTuongBiKNID,
            TenDoiTuongBiKN,
            TinhID,
            HuyenID,
            XaID,
            DiaChiCT,
            CheckAdd: true,
            DoiTuongBiKNID: donThuID
              ? chiTietDonTrung?.NhomDoiTuongBiKN[0]?.DoiTuongBiKNID
              : 0,
          },
        ];
        CaNhanBiKN = [
          {
            CaNhanBiKNID: donThuID
              ? chiTietDonTrung?.NhomDoiTuongBiKN[0]?.CaNhanBiKNID
              : 0,
            ChucVuID,
            NoiCongTac,
            NgheNghiep,
            QuocTichID,
            DanTocID,
            DoiTuongBiKNID: donThuID
              ? chiTietDonTrung?.NhomDoiTuongBiKN[0]?.DoiTuongBiKNID
              : 0,
          },
        ];
      }

      if (donThuID && !action) {
        let themMoiFile = [
          {
            FileHoSoID: 0,
            TenFile: "string",
            TenFileGoc: "string",
            TomTat: "string",
            NgayUp: "2023-06-04T08:56:23.741Z",
            NguoiUp: 0,
            FileUrl: "string",
            XuLyDonID: 0,
            DonThuID: 0,
            FileID: 0,
            CheckFile1: true,
          },
        ];

        let dataTiepDan = {
          XuLyDon,
          DoiTuongKN,
          NhomKN,
          DonThu,
          DoiTuongBiKN,
          CaNhanBiKN,
          ThanhPhanThamGia: [
            {
              TenCanBo: "string",
              ChucVu: "string",
              TiepDanKhongDonID: 0,
            },
          ],
          TiepDanKhongDon,
          themMoiFile,
        };

        handleTiepDan(dataTiepDan);
      } else {
        let themMoiFile = result[4]?.themMoiFileHoSo[1];

        let dataTiepDan = {
          XuLyDon,
          DoiTuongKN,
          NhomKN,
          DonThu,
          DoiTuongBiKN,
          CaNhanBiKN,
          ThanhPhanThamGia,
          TiepDanKhongDon,
          themMoiFile: donThuID
            ? [
                {
                  FileHoSoID: 0,
                  TenFile: "string",
                  TenFileGoc: "string",
                  TomTat: "string",
                  NgayUp: "2023-06-04T08:56:23.741Z",
                  NguoiUp: 0,
                  FileUrl: "string",
                  XuLyDonID: 0,
                  DonThuID: 0,
                  FileID: 0,
                  CheckFile1: true,
                },
              ]
            : themMoiFile,
        };
        if (Object.keys(result[4]).length > 0) {
          let [files, data] = result[4].themMoiFileHoSo;
          handleTiepDan(dataTiepDan, files);
        } else {
          handleTiepDan(dataTiepDan);
        }
      }
    });
  };
  const dataThongTinVuViecCu = (thongtinvuviec) => {
    console.log(thongtinvuviec);
  };
  const showModalDanKhongDen = () => {
    setIsModalDanKhongDen(true);
  };
  const handleModalDanKhongDenCancel = () => {
    setIsModalDanKhongDen(false);
  };
  const openModalConfirm = () => {
    setIsModalOpenConfirm(true);
  };

  const closeModalConfirm = () => {
    setIsModalOpenConfirm(false);
  };
  const sumbitModalConfirm = (values) => {
    handleResetForm();
    closeModalConfirm();
  };
  const loaiDoiTuong = (data) => {
    setLoaiDoiTuong(data);
  };
  return (
    <>
      <ModalDanKhongDen
        open={isModalDanKhongDen}
        title={"Dân không đến"}
        cancel={handleModalDanKhongDenCancel}
      />
      <Wrapper>
        <LayoutWrapper>
          <PageHeader>Tiếp dân trực tiếp</PageHeader>
          <PageAction>
            {/* {role ? role.add ?  */}
            <ButtonSave type="primary" onClick={onSubmit}>
              Lưu
            </ButtonSave>
            <ButtonSavePrint type="primary">Lưu và in</ButtonSavePrint>
            {/* //  : '' : ''} */}
            <ButtonCancelPrimary type="primary" onClick={openModalConfirm}>
              Hủy, nhập đơn mới
            </ButtonCancelPrimary>
            <ButtonCancelForm
              type="primary"
              bgcolor="#cf1322"
              onClick={showModalDanKhongDen}
            >
              Dân không đến
            </ButtonCancelForm>
          </PageAction>
          <Box>
            <Collapse
              defaultActiveKey={["1", "2", "3", "4", "5", "6", "7"]}
              expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 90 : 0} />
              )}
              expandIconPosition="end"
            >
              <Panel header={"Thông tin tiếp nhận đơn thư"} key={"1"}>
                <TTHSTiepDan
                  form={ThongTinTiepNhanDonThuForm}
                  chiTietDonTrung={chiTietDonTrung?.XuLyDon[0]}
                  data={dataThongTinVuViecCu}
                  DoiTuongID={loaiDoiTuong}
                  STT={dataSTT}
                />
              </Panel>

              <Panel
                className="collapse-item-reverse"
                header={"Đối tượng khiếu nại, tố cáo"}
                key={"2"}
              >
                <DoiTuongKhainai
                  form={DoiTuongKhieuNaiToCaoForm}
                  chiTietDonTrung={chiTietDonTrung?.DoiTuongKN[0]}
                />
              </Panel>

              <Panel header={"Phân loại vụ việc"} key={"3"}>
                <PhanLoai
                  form={ThongTinDonThuForm}
                  chiTietDonTrung={chiTietDonTrung?.DonThu[0]}
                />
              </Panel>
              <Panel header={"Thông tin lãnh đạo tiếp"} key={"4"}>
                <ThongTinLanhDaoTiep
                  form={ThongTinLanhDaoTiepForm}
                  chiTietDonTrung={chiTietDonTrung?.DonThu[0]}
                />
              </Panel>
              <Panel
                className="collapse-item-reverse"
                header={
                  <div>
                    <Checkbox
                      style={{
                        display: "inline-flex",
                        alignItems: "flex-end",
                        marginRight: "10px",
                      }}
                      onChange={handlerShowPanelCoDonThu}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>Tiếp dân có đơn thư</span>
                  </div>
                }
                key={"5"}
              >
                {tiepDanCoDonThuChecker ? (
                  <TiepDanCoDonThu
                    isShowPanel={true}
                    form={TiepDanCoDonThuForm}
                    chiTietDonTrung={chiTietDonTrung?.DonThu[0]}
                  />
                ) : (
                  <p style={{ textAlign: "center" }}>Không có thông tin</p>
                )}
              </Panel>
              <Panel
                className="collapse-item-reverse"
                header={
                  <div>
                    <Checkbox
                      style={{
                        display: "inline-flex",
                        alignItems: "flex-end",
                        marginRight: "10px",
                      }}
                      onChange={handleShowPanel}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>Nhập thông tin đối tượng bị khiếu nại, tố cáo</span>
                  </div>
                }
                key={"6"}
              >
                {ThongTinDTKNBiToCaoChecked ? (
                  <ThongTinDoiTuongKhieuNaiBiToCao
                    isShowPanel={true}
                    form={ThongTinDoiTuongKhieuNaiBiToCaoForm}
                    chiTietDonTrung={chiTietDonTrung?.NhomDoiTuongBiKN[0]}
                    action={action}
                  />
                ) : (
                  <p style={{ textAlign: "center" }}>Không có thông tin</p>
                )}
              </Panel>

              <Panel header={"Nội dung tiếp, kết quả tiếp"} key={"7"}>
                <NoiDungKetQua
                  form={NoiDungKetQuaForm}
                  chiTietDonTrung={chiTietDonTrung?.TiepDanKhongDon[0]}
                />
              </Panel>
            </Collapse>
          </Box>
          <FooterPageAction>
            {/* {role ? role.add ?  */}
            <ButtonSave
              type="primary"
              bgcolor="#fff"
              color="#fa8c16"
              onClick={onSubmit}
            >
              Lưu
            </ButtonSave>
            <ButtonSavePrint type="primary" bgcolor="#fff" color="#fa8c16">
              Lưu và in
            </ButtonSavePrint>
            {/* //  : '' : ''} */}
            <ButtonCancel type="primary" onClick={handleResetForm}>
              Hủy, nhập đơn mới
            </ButtonCancel>
            <ButtonCancelForm type="primary" bgcolor="#cf1322">
              Dân không đến
            </ButtonCancelForm>
          </FooterPageAction>
        </LayoutWrapper>
        <ModalConfirm
          title={"Xác nhận"}
          content={
            <>
              <p>Dữ liệu đang nhập sẽ không được lưu lại.</p>
              <p>Bạn có muốn thực hiện thao tác?</p>
            </>
          }
          open={isModalOpenConfirm}
          onOk={sumbitModalConfirm}
          onCancel={closeModalConfirm}
          isLoading={isLoadingModalConfirm}
          width={350}
        />
      </Wrapper>
    </>
  );
};

function mapStateToProps(state) {
  return {
    ...state.ReducerDanToc,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, {
  ...actions,
  getListDanToc: actionsDanToc.getData,
  getListNguonDonDen: actionsNguonDonDen.getList,
  getListCoQuanDonVi: actionsCoQuanDonVi.getList,
  getListTinh: actionsDiaGioi.getListTinh,
  getListLoaiKhieuTo: actionsLoaiKhieuTo.getList,
  getListQuocTich: actionsQuocTich.getList,
  getListChucVu: actionsChucVu.getList,
})(QLNamHoc);
