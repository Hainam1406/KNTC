import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  sotiepdantructiep:
    "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/GetAll",
  chitietdonthu:
    "https://kntcv2internapi.gosol.com.vn/api/v2/ChiTietDonThu/GetChiTietDonThu",
  xoadonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/Delete",
  danhsachgaplanhdao:
    "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/DS_GapLanhDao",
  danhSachLoaiKhieuToCha:
    server.apiTemp + "DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha",
  danhsachlanhdaotiepdankhongden:
    "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/DS_DanKhongDen",
  xoaDanKhongDen:
    "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/DeleteDanKhongDen",
  updateDanKhongDen:
    "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/UpdateDanKhongDen",
  downloadfile:
    "https://kntcv2internapi.gosol.com.vn/api/v2/TiepDanGianTiep/DownloadFile",
  xulydonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/XuLyDon/HuongXuLy",
};
const api = {
  SoTiepDanTrucTiep: (param) => {
    return apiGetAuth(apiUrl.sotiepdantructiep, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachLanhDao: (param) => {
    return apiGetAuth(apiUrl.danhsachgaplanhdao, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachDanKhongDen: (param) => {
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
  XoaDanKhongDen: (param) => {
    return apiPostAuth(apiUrl.xoaDanKhongDen, param);
  },
  UpdateDanKhongDen: (param) => {
    return apiPostAuth(apiUrl.updateDanKhongDen, param);
  },
  DownloadFile: (param) => {
    return apiGetAuth(apiUrl.downloadfile, { ...param });
  },
  XuLyDonThu: (param) => {
    return apiPostAuth(apiUrl.xulydonthu, param);
  },
};

export default api;
