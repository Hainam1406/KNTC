import React from "react";
import Modal from "../../../../components/uielements/modal";
import Form from "../../../../components/uielements/form";
import PanelBox, { PanelBoxSection } from "./PanelBox";
import Collapse from "../../../../components/uielements/collapse";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  DownloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Input,
  Selectv4,
  DatePicker,
  Button,
  Select,
  Option,
} from "../../../../components/uielements/exportComponent";
import Wrapper, {
  FooterPageAction,
  ButtonList,
  ButtonCancel,
  ButtonCancelPrimary,
  ButtonPrint,
  ButtonCancelForm,
} from "./styled";
import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";

import Inputnumber from "../../../../components/uielements/InputNumber";
import TableCustom from "../../../../components/uielements/table";
import { Avatar, Card, Col, InputNumber, Row, message } from "antd";
import { NoneBorder, PaddingCardChiTietDonThu } from "./styled";
import ThongTinChiTietDT from "./ThongTinChiTietDT";
import pdf from "./img/pdf.png";
import HoSoDonThu from "./HoSoDonThu";
import TienTrinhXuLy from "./TienTrinhXuLy";
import api from "./config";
import print from "./img/printer.svg";
import write from "./img/write.svg";
import left from "./img/left.svg";
import deletered from "./img/delete-red.svg";
import ModalInPhieu from "./ModalInPhieu";
import { Link } from "react-router-dom";
import actionsTiepdan from "../../../redux/NghiepVu/TiepDanTrucTiep/action";
import XuLyDon from "./xuLyDon";
import actionsTiepNhanDonThu from "../../../redux/NghiepVu/DonThuDaTiepNhan/action";

const { Meta } = Card;

export default function modalChiTiet(props) {
  const {
    open,
    onOk,
    onCancel,
    dataEdit,
    title,
    danhSachKhieuTo,
    XoaDonThu,
    SuaDonThu,
    setIsModalOpenChiTiet,
    action,
    dataXoa,
    filterData,
  } = props;
  const { Item, useForm } = Form;
  const { Panel } = Collapse;
  const [ThongTinChiTietDonThu] = useForm();
  const [HoSoDonThuForm] = useForm();
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState([]);

  const [HuongXuLyForm] = Form.useForm();
  const users = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dataEdit) {
      api
        .ChiTietDonThu({
          DonThuID: dataEdit.DonThuID,
          XuLyDonID: dataEdit.XuLyDonID,
        })
        .then((res) => setData(res.data.Data));
    }
  }, [dataEdit]);
  const PdfIcon = (image) => {
    return (
      <img
        src={image}
        alt=""
        style={{ width: "100px", height: "auto", padding: "20px 10px" }}
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
  const WrriteIcon = (image) => {
    return (
      <img
        src={image}
        alt=""
        style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
      />
    );
  };
  const DeleteIcon = (image) => {
    return (
      <img
        src={image}
        alt=""
        style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
      />
    );
  };
  const BackIcon = (image) => {
    return (
      <img
        src={image}
        alt=""
        style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
      />
    );
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const SubmitFormHuongXuLy = async () => {
    const values = await HuongXuLyForm.validateFields();
    let xuLyDon = data?.DonThu;

    api
      .XuLyDonThu({
        SoLan: xuLyDon.SoLan,
        NgayQuaHan: xuLyDon.NgayQuaHanGQ,
        CQChuyenDonID: xuLyDon.CQChuyenDonDenID,
        SoCongVan: xuLyDon.SoCongVan,
        NgayChuyenDon: xuLyDon.NgayChuyenDon,
        ThuocThamQuyen: true,
        DuDieuKien: true,
        HuongGiaiQuyetID: values.HuongGiaiQuyetID,
        NoiDungHuongDan: values.NoiDungHuongDan,
        CQTiepNhanID: xuLyDon.CoQuanID,
        CanBoXuLyID: xuLyDon.CanBoXuLyID,
        CanBoKyID: values.CanBoKyID,
        CQDaGiaiQuyetID: 0,
        CQGiaiQuyetTiepID: 0,
        TrangThaiDonID: xuLyDon.TrangThaiDonID,
        PhanTichKQID: 0,
        CanBoTiepNhanID: xuLyDon.CanBoTiepNhanID,
        CoQuanID: xuLyDon.CoQuanID,
        TenCoQuan: xuLyDon.TenCoQuanTiepNhan,
        NgayThuLy: xuLyDon.NgayXuLy,
        LyDo: "",
        DuAnID: 0,
        TenHuongXuLy: xuLyDon.TenHuongGiaiQuyet,
        TenNguonDonDen: xuLyDon.TenNguonDonDen,
        NgayQuaHanStr: xuLyDon.NgayQuaHanGQ,
        NgayXuLyConLai: 0,
        NgayLDDuyetXL: "2023-06-02T16:44:11.995Z",
        TenCQChuyenDonDen: xuLyDon.TenCoQuanPhoiHop_Str,
        XuLyDonID: xuLyDon.XuLyDonID,
        DonThuID: xuLyDon.DonThuID,
        SoDonThu: xuLyDon.SoDonThu,
        NguonDonDen: xuLyDon.NguonDonDen,
        TenChuDon: xuLyDon.HoTen,
        NoiDungDon: xuLyDon.NoiDungDon,
        NgayNhapDon: xuLyDon.NgayNhapDon,
        NgayNhapDonStr: "",
        DueDate: "2023-06-02T16:44:11.995Z",
        ModifiedDate: "2023-06-02T16:44:11.995Z",
        TenCBTiepNhan: "string",
        NgayNhapDons: "",
        NgayGiao: "",
        HanXuLy: "",
        NguoiGiao: "",
        TenLoaiKhieuTo: xuLyDon.TenLoaiKhieuTo1,
        NgayXLConLai: 0,
        HuongXuLy: xuLyDon.HuongXuLy || "",
        TenCBXuLy: xuLyDon.TenCanBoXuLy,
        NgayGui: "2023-06-02T16:44:11.995Z",
        PhongBanID: users.PhongBanID,
        CanBoID: users.CanBoID,
        DiaChi: xuLyDon.DiaChiCT,
        NgayTiepNhan: xuLyDon.NgayTiepNhan || "",
        TrangThai: "",
        StateName: "",
        StateID: xuLyDon.StateID,
        CanBoPhanXLID: xuLyDon.CanBoXuLyID,
        NextStateID: 0,
        CBDuocChonXL: values.CanBoKyID,
        QTTiepNhanDon: 0,
        TenTinh: xuLyDon.TenTinh,
        TenHuyen: xuLyDon.TenHuyen,
        TenXa: xuLyDon.TenXa,
        DiaChiCT: xuLyDon.DiaChiCT,
        NguonDonDens: xuLyDon.NguonDonDens,
        NgayGuis: xuLyDon.NgayVietDon,
        NgayXuLy: xuLyDon.NgayXuLy,
        MaHoSoMotCua: "",
        SoBienNhanMotCua: "",
        NgayHenTraMotCuaStr: "",
        TransitionID: 0,
        HoTenStr: xuLyDon.HoTen,
        DoiTuongBiKNID: xuLyDon.DoiTuongBiKNID,
        NhomKNID: xuLyDon.NhomKNID,
        SoDon: xuLyDon.SoDonThu,
        NgayTiep: "2023-06-02T16:44:11.995Z",
        NgayTiepStr: "",
        HoTen: xuLyDon.HoTen,
        listFileDonThuDaTiepNhan: file,
        TenFile: "",
        FileUrl: "sting",
        IsBaoMat: true,
        NguoiUp: values.CanBoKyID,
        KetQuaID: 0,
        HuongXuLyID: values.HuongGiaiQuyetID,
        KetQuaID_Str: "",
        TenHuongGiaiQuyet: "",
        NgayGQConLai: 0,
        Count: xuLyDon.Count,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          message.success(res.data.Message);
          onCancel();
          api
            .ChiTietDonThu({
              DonThuID: dataEdit.DonThuID,
              XuLyDonID: dataEdit.XuLyDonID,
            })
            .then((res) => setData(res.data.Data));
          dispatch(actionsTiepNhanDonThu.getData(filterData));
          HuongXuLyForm.resetFields();
        } else {
          message.error(res.data.Message);
          onCancel();
          HuongXuLyForm.resetFields();
        }
      });
  };
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      width={1500}
      footer={
        action == "Phân xử lý" ? (
          <>
            <ButtonCancelPrimary
              key="back"
              onClick={onCancel}
              htmlType="submit"
              // style={{ backgroundColor: "#fa8c16" }}
              type="primary"
              icon={BackIcon(left)}
            >
              Trở về
            </ButtonCancelPrimary>
          </>
        ) : action == "Xử lý đơn" ? (
          <>
            {" "}
            <>
              <ButtonCancelPrimary
                key="back"
                onClick={SubmitFormHuongXuLy}
                htmlType="submit"
                // style={{ backgroundColor: "#fa8c16" }}
                type="primary"
                icon={BackIcon(left)}
              >
                Lưu
              </ButtonCancelPrimary>
            </>
          </>
        ) : (
          <>
            <ButtonPrint
              style={{ color: "#fff" }}
              icon={PrintIcon(print)}
              onClick={showModal}
            >
              <span>In phiếu</span>
            </ButtonPrint>

            <ButtonPrint
              style={{
                color: "#fff",
                backgroundColor: "rgba(40, 120, 215, 1)",
              }}
              icon={WrriteIcon(write)}
              onClick={() => {
                SuaDonThu({ ...dataEdit });
              }}
            >
              Sửa
            </ButtonPrint>

            <Button
              onClick={() =>
                XoaDonThu({
                  ...dataEdit,
                  // TiepDanKhongDonID: dataEdit.TiepDanKhongDonID,
                  // DonThuID: dataEdit.DonThuID,
                  // XuLyDonID: dataEdit.XuLyDonID,
                })
              }
              style={{ backgroundColor: "red", color: "#fff" }}
              icon={DeleteIcon(deletered)}
            >
              Xóa
            </Button>

            <ButtonCancelPrimary
              key="back"
              onClick={onCancel}
              htmlType="submit"
              // style={{ backgroundColor: "#fa8c16" }}
              type="primary"
              icon={BackIcon(left)}
            >
              Trở về
            </ButtonCancelPrimary>
          </>
        )
      }
    >
      <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
        <Panel header={"Thông tin tiếp nhận đơn thư "} key={"1"}>
          <ThongTinChiTietDT form={ThongTinChiTietDonThu} data={data} />
        </Panel>
        {/* ------   2     */}
        <Panel
          header={"Hồ sơ đơn thư"}
          key={"2"}
          className="collapse-item-reverse"
        >
          <HoSoDonThu data={data} danhSachKhieuTo={danhSachKhieuTo} />
        </Panel>
        {/* -------- 3 */}
        <Panel header={"Tiến trình xử lý"} key={"3"}>
          <TienTrinhXuLy data={data} />
        </Panel>
      </Collapse>
      {/* -------4------ */}
      {action == "Xử lý đơn" ? (
        <XuLyDon form={HuongXuLyForm} setFile={setFile} />
      ) : (
        <></>
      )}
      <ModalInPhieu
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </Modal>
  );
}
