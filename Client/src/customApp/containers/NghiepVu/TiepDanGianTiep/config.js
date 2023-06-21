import Axios from "axios";
import { apiGetAuth, apiPostAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

export const apiUrl = {
  getCheckSoDonTrung: server.v2Url + "TiepDanGianTiep/CheckSoDonTrung",
  getDanhSachDonTrung: server.v2Url + "TiepDanGianTiep/GetDonTrung",
  getDanhSachLoaiKhieuToLan2: server.v2Url + "TiepDanGianTiep/GetKhieuToLan2",
  getDanhSachFile: server.v2Url + "DanhMucFile/DanhSachFile",
  getDanhSachCanBo: server.v2Url + "HeThongCanBo/GetAllCanBoTrongCoQuan",
  getChiTietDonThu: server.v2Url + "ChiTietDonThu/GetChiTietDonThu",
  postFileHoSo: server.v2Url + "TiepDanGianTiep/ThemMoiFile",
  getDanhSachLoaiDoiTuongKN: server.v2Url + "TiepDan/DanhSachLoaiDoiTuongKN",
  getDanhSachLoaiDoiTuongBiKN:
    server.v2Url + "TiepDan/DanhSachLoaiDoiTuongBiKN",
  getSoDonThu: server.v2Url + "TiepDanGianTiep/GetSoDonThu",
  PostTiepDan: server.v2Url + "TiepDanGianTiep/ThemMoiTiepDan",
    capNhatTiepDan: server.v2Url + "TiepDanGianTiep/CapNhatTiepDan",
    dowloadFile: server.v2Url + "TiepDanGianTiep/DownloadFile",
    deleteFile: server.v2Url + "FileDinhKem/Delete",
};
// lay danh sach
const api = {
  CheckSoDonTrung: (param) => {
    return apiGetAuth(apiUrl.getCheckSoDonTrung, {
      ...param,
    });
  },
  DanhSachDonTrung: (param) => {
    return apiGetAuth(apiUrl.getDanhSachDonTrung, { ...param });
  },
  DanhSachLoaiKhieuToLan2: (param) => {
    return apiGetAuth(apiUrl.getDanhSachLoaiKhieuToLan2, { ...param });
  },
  DanhSachFile: (param) => {
    return apiGetAuth(apiUrl.getDanhSachFile, { ...param });
  },
  DanhSachCanBo: (param) => {
    return apiGetAuth(apiUrl.getDanhSachCanBo, { ...param });
  },
  DanhSachLoaiDoiTuongKN: (param) => {
    return apiGetAuth(apiUrl.getDanhSachLoaiDoiTuongKN, { ...param });
  },
  DanhSachLoaiDoiTuongBiKN: (param) => {
    return apiGetAuth(apiUrl.getDanhSachLoaiDoiTuongBiKN, { ...param });
  },
  ChiTietDonThu: (param) => {
    return apiGetAuth(apiUrl.getChiTietDonThu, { ...param });
  },
  ThemFileHoSo: (param) => {
    return apiPostAuth(apiUrl.postFileHoSo, param, {
      "Content-Type": "multipart/form-data",
    });
  },
  SoDonThu: (param) => {
    return apiGetAuth(apiUrl.getSoDonThu, { ...param });
  },
  ThemMoiTiepDan: (param) => {
    return apiPostAuth(apiUrl.PostTiepDan, param);
  },
    CapNhatTiepDan: (param) => {
        return apiPostAuth(apiUrl.capNhatTiepDan, param);
    },
    DeleteFile: (param) => {
        return apiPostAuth(apiUrl.deleteFile, param);
    },
};

export default api;
