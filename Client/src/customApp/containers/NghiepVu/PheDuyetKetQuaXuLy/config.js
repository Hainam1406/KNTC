import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  danhsachduyetketquaxuly:
    "https://kntcv2internapi.gosol.com.vn/api/v2/DuyetKQXuLy/DanhSach",
  pheduyet: "https://kntcv2internapi.gosol.com.vn/api/v2/DuyetKQXuLy/Duyet",
  suaketqua:
    "https://kntcv2internapi.gosol.com.vn/api/v2/DuyetKQXuLy/SuaKetQuaXuLyDetail",
  // themloaiketqua: server.apiTemp + 'DanhMucLoaiKetQua/ThemMoiLoaiKetQua',
  // capnhatloaiketqua: server.apiTemp + 'DanhMucLoaiKetQua/CapNhatLoaiKetQua',
  xoadonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/Delete",
  danhSachLoaiKhieuToCha:
    server.apiTemp + "DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha",
};
const api = {
  PheDuyetKetQuaXuLy: (param) => {
    return apiGetAuth(apiUrl.danhsachduyetketquaxuly, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  PheDuyet: (param) => {
    return apiPostAuth(apiUrl.pheduyet, param);
  },
  SuaKetQua: (param) => {
    return apiGetAuth(apiUrl.suaketqua, {
      ...param,
    });
  },
  // ThemLoaiKetQua: (param) => {
  //   return apiPostAuth(apiUrl.themloaiketqua, {
  //     ...param,
  //   });
  // },
  // CapNhatLoaiKetQua: (param) => {
  //   return apiPostAuth(apiUrl.capnhatloaiketqua, {
  //     ...param,
  //   });
  // },
  XoaDonThu: (param) => {
    return apiPostAuth(apiUrl.xoadonthu, param);
  },
  DanhSachLoaiKhieuToCha: (param) => {
    return apiGetAuth(apiUrl.danhSachLoaiKhieuToCha, {
      ...param,
    });
  },
};

export default api;
