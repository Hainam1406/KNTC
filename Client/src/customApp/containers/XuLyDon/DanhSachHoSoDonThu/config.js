import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  danhsachhosodonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/QLHoSoDonThu/DanhSach",
  chitietdonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/TiepDan/KhieuToLan2ByDonID",
  // themloaiketqua: server.apiTemp + 'DanhMucLoaiKetQua/ThemMoiLoaiKetQua',
  // capnhatloaiketqua: server.apiTemp + 'DanhMucLoaiKetQua/CapNhatLoaiKetQua',
  xoadonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/Delete",
  danhSachLoaiKhieuToCha: server.apiTemp + "DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha",
  getDanhSachCanBo: server.v2Url + "HeThongCanBo/GetAllCanBoTrongCoQuan",
  phanxuly: "https://kntcv2internapi.gosol.com.vn/api/v2/PhanXuLy/ThemMoiPhanXuLyFile",
  capnhatketqua: "https://kntcv2internapi.gosol.com.vn/api/v2/QLHoSoDonThu/CapNhat",
  thongtinbosung: "https://kntcv2internapi.gosol.com.vn/api/v2/QLHoSoDonThu/ThongTinBoSung",
};
const api = {
  DanhSachHoSoDonThu: (param) => {
    return apiGetAuth(apiUrl.danhsachhosodonthu, {
      ...param,
      Start: param.PageNumber ? param.PageNumber : 1,
      End: param.PageSize ? param.PageSize : 30,
    });
  },
  ChiTietDonThu: (param) => {
    return apiGetAuth(apiUrl.chitietdonthu, {
      ...param,
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
  DanhSachCanBo: (param) => {
    return apiGetAuth(apiUrl.getDanhSachCanBo, { ...param });
  },
  ThongTinBoSo: (param) => {
    return apiGetAuth(apiUrl.thongtinbosung, { ...param });
  },

  PhanXuly: (param) => {
    return apiPostAuth(apiUrl.phanxuly, param, {
      "Content-Type": "multipart/form-data",
    });
  },
  CapNhatKetQua: (param) => {
    return apiPostAuth(apiUrl.capnhatketqua, param, {
      "Content-Type": "multipart/form-data",
    });
  },
};

export default api;
