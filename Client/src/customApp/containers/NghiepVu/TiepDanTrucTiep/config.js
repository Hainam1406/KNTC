import Axios from "axios";
import { apiGetAuth, apiPostAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

export const apiUrl = {
  checkTrungDon: server.v2Url + "TiepDanGianTiep/GetDonTrung",
  checkCoBaoNhieuDonTrung: server.v2Url + "TiepDanGianTiep/CheckSoDonTrung",
  dankhongden: server.v2Url + "TiepDan/TiepDan_DanKhongDen",
  danhMucChucVu: server.v2Url + "DanhMucChucVu/DanhSachChucVu",
  ThemMoiDonThu: server.v2Url + "TiepDan/ThemMoiTiepDan",
  SuaDonThu: server.v2Url + "TiepDan/CapNhatTiepDan",
  STTDonThu: server.v2Url + "TiepDan/Get_SoDonThu",
  DownLoadFile: server.v2Url + "TiepDanGianTiep/DownloadFile",
  XoaFile: server.v2Url + "FileDinhKem/Delete",
  ChiTietDonThu: server.v2Url + "DetailTiepDan/DetailTiepDan",
};
// lay danh sach
const api = {
  CheckTrungDon: (param) => {
    return apiGetAuth(apiUrl.checkTrungDon, {
      ...param,
      // PageNumber: param.PageNumber ? param.PageNumber : 1,
      // PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  CheckCoBNSoDonTrung: (param) => {
    return apiGetAuth(apiUrl.checkCoBaoNhieuDonTrung, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhMucChucVu: (param) => {
    return apiGetAuth(apiUrl.danhMucChucVu, {
      ...param,
    });
  },

  DanKhongDen: (param) => {
    return apiPostAuth(apiUrl.dankhongden, {
      ...param,
    });
  },

  ThemMoiDonThu: (param) => {
    return apiPostAuth(apiUrl.ThemMoiDonThu, param, {
      "Content-Type": "multipart/form-data",
    });
  },

  SuaDonThu: (param) => {
    return apiPostAuth(apiUrl.SuaDonThu, param);
  },
  STTDonThu: (param) => {
    return apiGetAuth(apiUrl.STTDonThu, param);
  },
  XoaFile: (param) => {
    return apiPostAuth(apiUrl.XoaFile, param);
  },
  ChiTietDonThu: (param) => {
    return apiGetAuth(apiUrl.ChiTietDonThu, param);
  },
};

export default api;
