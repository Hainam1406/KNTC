import Axios from "axios";
import { apiGetAuth, apiPostAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

const apiUrl = {
  DanhSachDonThu: server.v2Url + "XuLyDon/DonThuCanXuLy",
  DanhSachLoaiKhieuToCha: "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/DS_LoaiKhieuTo",
  TrinhDuyet:"https://kntcv2internapi.gosol.com.vn/api/v2/XuLyDon/TrinhLD",
};
// lay danh sach
const api = {
  DanhSachDonThuHeThong: (param) => {
    return apiGetAuth(apiUrl.DanhSachDonThu, {
      ...param,
    });
  },
  DanhSachKhieuTo: (param) => {
    return apiGetAuth(apiUrl.DanhSachLoaiKhieuToCha, {
      ...param,
    });
  },

  TrinhLanhDao: (param) => {
    return apiPostAuth(apiUrl.TrinhDuyet, param);
  },
};

export default api;