import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  danhsachrutdonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/DSRutDon/DanhSach",
  chitietdonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/ChiTietDonThu/GetChiTietDonThu",
  huyrutdonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/DSRutDon/HuyRutDon",
  rutdonthu: "https://kntcv2internapi.gosol.com.vn/api/v2/DSRutDon/RutDon",

  danhSachLoaiKhieuToCha: server.apiTemp + "DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha",

  postFileHoSo: server.v2Url + "TiepDanGianTiep/ThemMoiFile",
  getDanhSachFile: server.v2Url + "DanhMucFile/DanhSachFile",
};
const api = {
  DanhSachRutDonThu: (param) => {
    return apiGetAuth(apiUrl.danhsachrutdonthu, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  getListRutDon: (param) => {
    return apiGetAuth(apiUrl.danhsachrutdonthu, {
      ...param,
    });
  },
  DanhSachLanhDao: (param) => {
    return apiGetAuth(apiUrl.danhsachlanhdaotiepdankhongden, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  mydata: (param) => {
    return apiGetAuth(apiUrl.danhsachrutdonthu, {
      ...param,
    });
  },
  ChiTietDonThu: (param) => {
    return apiGetAuth(apiUrl.chitietdonthu, {
      ...param,
    });
  },

  ThemFileHoSo: (param) => {
    return apiPostAuth(apiUrl.postFileHoSo, param, {
      "Content-Type": "multipart/form-data",
    });
  },
  RutDonThu: (param) => {
    return apiPostAuth(apiUrl.rutdonthu, param);
  },
  HuyRutDonThu: (param) => {
    return apiPostAuth(apiUrl.huyrutdonthu, param);
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
  DanhSachFile: (param) => {
    return apiGetAuth(apiUrl.getDanhSachFile, { ...param });
  },
};

export default api;
