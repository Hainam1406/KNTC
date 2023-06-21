import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  quanlyhosodonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/QLHoSoDonThu/DanhSach",
  chitietdonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/ChiTietDonThu/GetChiTietDonThu",
  // themloaiketqua: server.apiTemp + 'DanhMucLoaiKetQua/ThemMoiLoaiKetQua',
  capnhatketqua: "https://kntcv2internapi.gosol.com.vn/api/v2/QLHoSoDonThu/CapNhat",

  thongtinbosung: "https://kntcv2internapi.gosol.com.vn/api/v2/QLHoSoDonThu/ThongTinBoSung",
  danhSachLoaiKhieuToCha: server.apiTemp + "DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha",
  // test
  postFileHoSo: server.v2Url + "TiepDanGianTiep/ThemMoiFile",
  getDanhSachHoSo: "https://kntcv2internapi.gosol.com.vn/api/v2/QLHoSoDonThu/DS_HoSo",
};
const api = {
  QuanLyHoSo: (param) => {
    return apiGetAuth(apiUrl.quanlyhosodonthu, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachLanhDao: (param) => {
    return apiGetAuth(apiUrl.danhsachlanhdaotiepdankhongden, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietDonThu: (param) => {
    return apiGetAuth(apiUrl.chitietdonthu, {
      ...param,
    });
  },
  ThongTinBoSung: (param) => {
    return apiGetAuth(apiUrl.thongtinbosung, {
      ...param,
    });
  },
  CapNhatKetQua: (param) => {
    return apiPostAuth(apiUrl.capnhatketqua, param, {
      "Content-Type": "multipart/form-data",
    });
  },
  XoaDonThu: (param) => {
    return apiPostAuth(apiUrl.xoadonthu, param);
  },
  DanhSachLoaiKhieuToCha: (param) => {
    return apiGetAuth(apiUrl.danhSachLoaiKhieuToCha, {
      ...param,
    });
  },
  //test

  ThemFileHoSo: (param) => {
    return apiPostAuth(apiUrl.postFileHoSo, param, {
      "Content-Type": "multipart/form-data",
    });
  },
  DanhSachHoSo: (param) => {
    return apiGetAuth(apiUrl.getDanhSachHoSo, { ...param });
  },
};

export default api;
