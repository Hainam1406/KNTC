import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  DanhSachDonThuCanPheDuyet: server.apiTemp + "DuyetKQXuLy/DanhSach",
  chitietdonthu:
    "https://kntcv2internapi.gosol.com.vn/api/v2/ChiTietDonThu/GetChiTietDonThu",
  xoadonthu:
    "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepNhan_GianTiep/Delete",
  xuatfile:
    "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepNhan_GianTiep/Exportexcel",
  danhSachLoaiKhieuToCha:
    server.apiTemp + "DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha",
  danhsachcoquan:
    "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepNhan_GianTiep/DS_CoQuan",
  previewslip:
    "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepNhan_GianTiep/FileView",
};
const api = {
  DanhSachDonThuCanPheDuyet: (param) => {
    return apiGetAuth(apiUrl.DanhSachDonThuCanPheDuyet, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachCoQuan: (param) => {
    return apiGetAuth(apiUrl.danhsachcoquan, param);
  },
  DanhSachLanhDao: (param) => {
    return apiGetAuth(apiUrl.danhsachlanhdaotiepdankhongden, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  XoaDonThu: (param) => {
    return apiPostAuth(apiUrl.xoadonthu, {
      ...param,
    });
  },

  XuatFile: (param) => {
    return apiGetAuth(apiUrl.xuatfile, param);
  },
  ChiTietDonThu: (param) => {
    return apiGetAuth(apiUrl.chitietdonthu, {
      ...param,
    });
  },
  DanhSachLoaiKhieuToCha: (param) => {
    return apiGetAuth(apiUrl.danhSachLoaiKhieuToCha, {
      ...param,
    });
  },

  PreviewSlip: (param) => {
    return apiGetAuth(apiUrl.previewslip, {
      ...param,
    });
  },
};

export default api;
