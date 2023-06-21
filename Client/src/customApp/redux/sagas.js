import { all } from "redux-saga/effects";
import DanhMucDanToc from "./DanhMuc/DanhMucDanToc/saga";
import DanhMucQuocTich from "./DanhMuc/DanhMucQuocTich/saga";
import DanhMucDiaGioi from "./DanhMuc/DMDiaGioi/saga";
import ReducerChucVu from "./DanhMuc/DMChucVu/saga";
import DanhMucHuongGiaiQuyet from "./DanhMuc/DanhMucHuongGiaiQuyet/saga";
import DanhMucLoaiVanBanKemTheo from "./DanhMuc/DanhMucLoaiVanBanKemTheo/saga";
import DanhMucNguonDonDen from "./DanhMuc/DanhMucNguonDonDen/saga";
import DanhMucNhomFile from "./DanhMuc/DanhMucFileDinhKem/nhomFileSaga";
import DanhMucThamQuyen from "./DanhMuc/DMThamQuyen/saga";
import DanhMucBuocXacMinh from "./DanhMuc/DMBuocXacMinh/saga";
import DanhMucLoaiKetQua from "./DanhMuc/DMLoaiKetQua/saga";
import DanhMucPhanTichKQ from "./DanhMuc/DMPhanTichKetQua/saga";
import DMCoQuan from "./DanhMuc/DMCoQuan/saga";
import DanhMucTrangThaiDon from "./DanhMuc/DanhMucTrangThaiDon/saga";
import DanhMucPhongBan from "./DanhMuc/DMPhongBan/saga";
import BaoCao2A from "./BaoCao/BaoCao2A/saga";
import DanhMucLoaiKhieuTo from "./DanhMuc/DMLoaiKhieuTo/saga";
import BaoCaoTongHopKetQuaThanhTraHanhChinh from "./BaoCao/THKetQuaThanhTraHanhChinh/saga";
import DanhMucBieuMau from "./DanhMuc/DanhMucBieuMau/saga";

// Hệ Thống
import QLPhanQuyen from "./HeThong/QLPhanQuyen/saga";
import ListSideBar from "./HeThong/Sidebar/saga";
import QLNguoiDung from "./HeThong/QLNguoiDung/saga";
import QLChucNang from "./HeThong/QLChucNang/saga";
import QuanLyThamSoHeThong from "./HeThong/QLThamSoHeThong/saga";
import XoaDonThuLoi from "./HeThong/XoaDonThuLoi/saga";
import SaoLuuDuLieu from "./HeThong/QuanTriDuLieu/saga";
import NhatKyHeThong from "./HeThong/NhatKyHeThong/saga";
import HuongDanSuDung from "./HeThong/HuongDanSuDung/saga";
// Dashboard
import DashBoard from "./DashBoard/saga";
// Nghiep Vu
import TiepDanAll from "./NghiepVu/TiepDanTrucTiep/saga";
import SoTiepNhanGianTiep from "./NghiepVu/SoTiepNhanGianTiep/saga";
import TiepDanGianTiep from "./NghiepVu/TiepDanGianTiep/saga";
import SoTiepDanTrucTiep from "./NghiepVu/SoTiepDanTrucTiep/saga";
import DonThuDaTiepNhan from "./NghiepVu/DonThuDaTiepNhan/saga";
import XuLyDonThu from "./NghiepVu/XuLyDonThu/saga";
import PhanXulyDonthu from "./NghiepVu/PhanXuLyDon/saga";

//xu ly don

import QuanLyHoSoDonThu from "./NghiepVu/QLHoSoDonThu/saga";
import RutDon from "./NghiepVu/RutDon/saga";
import DonDoc from "./NghiepVu/DonDoc/saga";

// phan xy ly
import DanhSachDonThuCanPheDuyet from "./PhanGiaiQuyet/PheDuyetKetQua/saga";
import PheDuyetKetQuaXuLy from "./NghiepVu/PheDuyetKetQuaXuLy/saga";
import HoSoDonThu from "./XuLyDon/HoSoDonThu/saga";

export default function* devSaga() {
  yield all([
    HuongDanSuDung(),
    HoSoDonThu(),
    PheDuyetKetQuaXuLy(),
    DonDoc(),
    RutDon(),
    PhanXulyDonthu(),
    QuanLyHoSoDonThu(),
    NhatKyHeThong(),
    SaoLuuDuLieu(),
    DanhSachDonThuCanPheDuyet(),
    XuLyDonThu(),
    DonThuDaTiepNhan(),
    SoTiepDanTrucTiep(),
    SoTiepNhanGianTiep(),
    DanhMucDanToc(),
    DanhMucQuocTich(),
    DMCoQuan(),
    DanhMucDiaGioi(),
    ReducerChucVu(),
    DanhMucHuongGiaiQuyet(),
    DanhMucLoaiVanBanKemTheo(),
    DanhMucNguonDonDen(),
    DanhMucNhomFile(),
    DanhMucThamQuyen(),
    DanhMucBuocXacMinh(),
    BaoCao2A(),
    DanhMucPhanTichKQ(),
    QLPhanQuyen(),
    DanhMucLoaiKetQua(),
    DashBoard(),
    BaoCaoTongHopKetQuaThanhTraHanhChinh(),
    DanhMucTrangThaiDon(),
    DanhMucPhongBan(),
    DanhMucLoaiKhieuTo(),
    DanhMucBieuMau(),
    QLNguoiDung(),
    ListSideBar(),
    QLChucNang(),
    QuanLyThamSoHeThong(),
    XoaDonThuLoi(),
    // Nghiep vu
    TiepDanAll(),
    TiepDanGianTiep(),
  ]);
}
