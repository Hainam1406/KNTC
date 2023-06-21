import asyncComponent from "../helpers/AsyncFunc";

const routes = [
  {
    path: "",
    component: asyncComponent(() => import("./containers/DashBoash")),
  },
  // Danh Mục
  {
    path: "danh-muc-dan-toc",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DanhMucDanToc")
    ),
  },
  {
    path: "danh-muc-quoc-tich",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DanhMucQuocTich")
    ),
  },
  {
    path: "danh-muc-tinh-huyen-xa",
    component: asyncComponent(() => import("./containers/DanhMuc/DMDiaGioi")),
  },
  {
    path: "danh-muc-co-quan",
    component: asyncComponent(() => import("./containers/DanhMuc/DMCoQuan")),
  },
  {
    path: "danh-muc-tham-quyen",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMThamQuyen/index")
    ),
  },
  {
    path: "danh-muc-phong-ban",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMPhongBan/index")
    ),
  },
  {
    path: "danh-muc-chuc-vu",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMChucVu/index")
    ),
  },
  {
    path: "danh-muc-loai-khieu-to",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMLoaiKhieuTo")
    ),
  },
  {
    path: "danh-muc-chia-tach-sat-nhap",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMChiaTachSapNhap/index")
    ),
  },
  {
    path: "danh-muc-huong-giai-quyet",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DanhMucHuongGiaiQuyet/index")
    ),
  },
  {
    path: "danh-muc-bieu-mau",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DanhMucBieuMau/index")
    ),
  },
  {
    path: "danh-muc-loai-vb",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DanhMucLoaiVanBanKemTheo/index")
    ),
  },
  {
    path: "danh-muc-nguon-don-den",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DanhMucNguonDonDen")
    ),
  },
  {
    path: "danh-muc-file-dinh-kem",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DanhMucFileDinhKem")
    ),
  },
  {
    path: "danh-muc-buoc-xac-minh",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMBuocXacMinh")
    ),
  },
  {
    path: "danh-muc-loai-ket-qua",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMLoaiKetQua")
    ),
  },
  {
    path: "danh-muc-phan-tich-kq",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMPhanTichKQ")
    ),
  },
  //
  {
    path: "danh-muc-trang-thai-don",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMTrangThaiDon/index")
    ),
  },
  {
    path: "danh-muc-loai-doi-tuong-bi-kn",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DanhMucDoiTuongBiKhieuTo/index")
    ),
  },
  {
    path: "danh-muc-loai-doi-tuong-kn",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DanhMucLoaiDoiTuongKhieuTo/index")
    ),
  },

  //

  // Hệ Thống
  {
    path: "phan-quyen",
    component: asyncComponent(() => import("./containers/HeThong/QLPhanQuyen")),
  },
  {
    path: "nhat-ky-he-thong",
    component: asyncComponent(() =>
      import("./containers/HeThong/NhatKyHeThong")
    ),
  },
  {
    path: "quan-tri-du-lieu",
    component: asyncComponent(() =>
      import("./containers/HeThong/QuanTriDuLieu")
    ),
  },
  {
    path: "quan-ly-nguoi-dung",
    component: asyncComponent(() =>
      import("./containers/HeThong/UserManagement")
    ),
  },
  {
    path: "quan-ly-chuc-nang",
    component: asyncComponent(() => import("./containers/HeThong/QLChucNang")),
  },
  {
    path: "dong-bo-du-lieu",
    component: asyncComponent(() =>
      import("./containers/HeThong/DongBoDuLieu")
    ),
  },
  {
    path: "tham-so-he-thong",
    component: asyncComponent(() =>
      import("./containers/HeThong/QuanLyThamSoHeThong")
    ),
  },
  {
    path: "xoa-don-thu-loi",
    component: asyncComponent(() =>
      import("./containers/HeThong/XoaDonThuLoi")
    ),
  },

  // Báo Cáo
  {
    path: "bao-cao-2a",
    component: asyncComponent(() => import("./containers/BaoCao/2AReport")),
  },
  // {
  //   path: "bao-cao-tong-hop-ket-qua-thanh-tra-hanh-chinh",
  //   component: asyncComponent(() =>
  //     import("./containers/BaoCao/BCThnhTraHanhChinh")
  //   ),
  // },
  {
    path: "bao-cao-tinh-hinh-TD_XL_GQ",
    component: asyncComponent(() =>
      import("./containers/BaoCao/TinhHinhTD_XL_GQ")
    ),
  },
  // Nghiệp vụ
  {
    path: "tiep-dan-truc-tiep",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/TiepDanTrucTiep")
    ),
  },
  {
    path: "tiep-dan-gian-tiep",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/TiepDanGianTiep")
    ),
  },
  {
    path: "so-tiep-cong-dan",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/SoTiepDanTrucTiep")
    ),
  },
  {
    path: "phan-xu-ly-don-thu",
    component: asyncComponent(() => import("./containers/NghiepVu/XuLyDonThu")),
  },
  {
    path: "tra-cuu-don-thu",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/TraCuuDonThuTest")
    ),
  },
  {
    path: "tiep-nhan-don-thu",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/DonThuDaTiepNhan")
    ),
  },
  {
    path: "phan-xu-ly",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/PhanXuLyDonThu")
    ),
  },
  {
    path: "vu-viec-phuc-tap",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/VuViecPhucTap")
    ),
  },
  {
    path: "xac-minh-noi-dung-don",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/XacMinhNoiDungDon")
    ),
  },
  // phân giải quyết
  {
    path: "phe-duyet-ket-qua",
    component: asyncComponent(() =>
      import("./containers/PhanGiaiQuyet/PheDuyetKetQua/index")
    ),
  },

  // phân giải quyết
  {
    path: "ban-hanh-quyet-dinh-giai-quyet",
    component: asyncComponent(() =>
      import("./containers/PhanGiaiQuyet/BanHanhQuyetDinhGQ/index")
    ),
  },

  // phân giải quyết
  {
    path: "thi-hanh-quyet-dinh-giai-quyet",
    component: asyncComponent(() =>
      import("./containers/PhanGiaiQuyet/ThiHanhQDGQ/index")
    ),
  },
  {
    path: "so-tiep-nhan-gian-tiep",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/SoTiepNhanGianTiep/index")
    ),
  },
  {
    path: "ho-so-don-thu",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/QLHoSoDonThu")
    ),
  },
  {
    path: "rut-don",
    component: asyncComponent(() => import("./containers/NghiepVu/RutDon")),
  },
  {
    path: "don-thu-can-don-doc",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/DonDoc/index")
    ),
  },
  {
    path: "phe-duyet-ket-qua-xu-ly",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/PheDuyetKetQuaXuLy")
    ),
  },
  // {
  //   path: "xu-ly-ho-so-don-thu",
  //   component: asyncComponent(() =>
  //     import("./containers/XuLyDon/DanhSachHoSoDonThu")
  //   ),
  // },
  {
    path: "huong-dan-su-dung",
    component: asyncComponent(() =>
      import("./containers/HeThong/HuongDanSuDung")
    ),
  },
  {
    path: "quan-ly-ho-so-don-thu",
    component: asyncComponent(() =>
      import("./containers/XuLyDon/DanhSachHoSoDonThu")
    ),
  },
];
export default routes;
