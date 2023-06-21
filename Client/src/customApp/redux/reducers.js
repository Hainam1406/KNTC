import ReducerDanToc from "../redux/DanhMuc/DanhMucDanToc/reducer";
import DanhMucQuocTich from "./DanhMuc/DanhMucQuocTich/reducer";
import DanhMucDiaGioi from "./DanhMuc/DMDiaGioi/reducer";
import DanhMucChucVu from "./DanhMuc/DMChucVu/reducer";
import DanhMucHGQ from "./DanhMuc/DanhMucHuongGiaiQuyet/reducer";
import DanhMucLoaiVanBanKemTheo from "./DanhMuc/DanhMucLoaiVanBanKemTheo/reducer";
import DanhMucNguonDonDen from "./DanhMuc/DanhMucNguonDonDen/reducer";
import DanhMucNhomFile from "./DanhMuc/DanhMucFileDinhKem/nhomFileReducer";
import DanhMucThamQuyen from "./DanhMuc/DMThamQuyen/reducer";
import DanhMucBuocXacMinh from "./DanhMuc/DMBuocXacMinh/reducer";
import DanhMucLoaiKetQua from "./DanhMuc/DMLoaiKetQua/reducer";
import DanhMucPhanTichKQ from "./DanhMuc/DMPhanTichKetQua/reducer";
import DMCoQuan from "./DanhMuc/DMCoQuan/reducer";
import DanhMucTrangThaiDon from "./DanhMuc/DanhMucTrangThaiDon/reducer";
import DanhMucPhongBan from "./DanhMuc/DMPhongBan/reducer";
import BaoCao2A from "./BaoCao/BaoCao2A/reducer";
import BaoCaoTongHopKetQuaThanhTraHanhChinh from "./BaoCao/THKetQuaThanhTraHanhChinh/reducer";
import DanhMucLoaiKhieuTo from "./DanhMuc/DMLoaiKhieuTo/reducer";
import DanhMucBieuMau from "./DanhMuc/DanhMucBieuMau/reducer";

// Hệ Thống
import QLPhanQuyen from "./HeThong/QLPhanQuyen/reducer";
import ListSideBar from "./HeThong/Sidebar/reducer";
import QLNguoiDung from "./HeThong/QLNguoiDung/reducer";
import QLChucNang from "./HeThong/QLChucNang/reducer";
import QuanLyThamSoHeThong from "./HeThong/QLThamSoHeThong/reducer";
import XoaDonThuLoi from "./HeThong/XoaDonThuLoi/reducer";
import SaoLuuDuLieu from "./HeThong/QuanTriDuLieu/reducer";
import NhatKyHeThong from "./HeThong/NhatKyHeThong/reducer";

// Dashboard
import DashBoard from "./DashBoard/reducer";
import HuongDanSuDung from "./HeThong/HuongDanSuDung/reducer";
// Nghiep Vu
import ReducerTiepDan from "./NghiepVu/TiepDanTrucTiep/reducer";

import SoTiepNhanGianTiep from "./NghiepVu/SoTiepNhanGianTiep/reducer";
import TiepDanGianTiep from "./NghiepVu/TiepDanGianTiep/reducer";
import SoTiepDanTrucTiep from "./NghiepVu/SoTiepDanTrucTiep/reducer";
import DonThuDaTiepNhan from "./NghiepVu/DonThuDaTiepNhan/reducer";
import ReducerXuLyDonThu from "./NghiepVu/XuLyDonThu/reducer";
import PhanXulyDonthu from "./NghiepVu/PhanXuLyDon/reducer";

// xu ly don
import QuanLyDanhSachDonThu from "./NghiepVu/QLHoSoDonThu/reducer";
import RutDon from "./NghiepVu/RutDon/reducer";
import DonDoc from "./NghiepVu/DonDoc/reducer";
import PheDuyetKetQuaXuLy from "./NghiepVu/PheDuyetKetQuaXuLy/reducer";

// phan su ly
import KetQuaCanPheDuyet from "./PhanGiaiQuyet/PheDuyetKetQua/reducer";
import HoSoDonThu from "./XuLyDon/HoSoDonThu/reducer";
export default {
  HoSoDonThu,
  PheDuyetKetQuaXuLy,
  DonDoc,
  PhanXulyDonthu,
  RutDon,
  QuanLyDanhSachDonThu,
  NhatKyHeThong,
  SaoLuuDuLieu,
  KetQuaCanPheDuyet,
  ReducerXuLyDonThu,
  SoTiepDanTrucTiep,
  DonThuDaTiepNhan,
  SoTiepNhanGianTiep,
  ReducerDanToc,
  DMCoQuan,
  DanhMucQuocTich,
  DanhMucDiaGioi,
  DanhMucChucVu,
  DanhMucHGQ,
  DanhMucLoaiVanBanKemTheo,
  DanhMucNguonDonDen,
  DanhMucNhomFile,
  DanhMucThamQuyen,
  DanhMucBuocXacMinh,
  DanhMucLoaiKetQua,
  BaoCao2A,
  DanhMucPhanTichKQ,
  QLPhanQuyen,
  BaoCaoTongHopKetQuaThanhTraHanhChinh,
  DanhMucTrangThaiDon,
  DashBoard,
  DanhMucPhongBan,
  DanhMucLoaiKhieuTo,
  DanhMucBieuMau,
  ListSideBar,
  QLNguoiDung,
  QLChucNang,
  QuanLyThamSoHeThong,
  XoaDonThuLoi,
  HuongDanSuDung,
  //   nghiep vu
  ReducerTiepDan,
  TiepDanGianTiep,
};
