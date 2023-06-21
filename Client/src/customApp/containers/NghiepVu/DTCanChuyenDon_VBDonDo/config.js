import Axios from "axios";
import { apiGetAuth, apiPostAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

const apiUrl = {
  DanhSachDonThuCanChuyenDonVBDD:"https://kntcv2internapi.gosol.com.vn/api/DTCanChuyenDon_RaVBDonDoc/ChuyenDon_RaVBDonDoc",
  DanhSachLoaiKhieuToCha: "https://kntcv2internapi.gosol.com.vn/api/v2/SoTiepDan/DS_LoaiKhieuTo",
  DanhSachLoaiCoQuanDonVi:"https://kntcv2internapi.gosol.com.vn/api/v2/DanhMucCoQuanDonVi/DanhSachCacCap",
  ChuyenDonThu:"https://kntcv2internapi.gosol.com.vn/api/DTCanChuyenDon_RaVBDonDoc/DuyetRaVBDD",

  // postFileHoSo: server.v2Url + "TiepDanGianTiep/ThemMoiFile",
}
// lay danh sach
const api = {
  DShDonThuCanChuyenDonVBDD: (param) => {
    return apiGetAuth(apiUrl.DanhSachDonThuCanChuyenDonVBDD, {
      ...param,
      
    });
  },
  DanhSachKhieuTo: (param) => {
    return apiGetAuth(apiUrl.DanhSachLoaiKhieuToCha, {
      ...param,
    });
  },
  DanhSachCoQuan: (param) => {
    return apiGetAuth(apiUrl.DanhSachLoaiCoQuanDonVi, {
      ...param,
    });
  },
  //

//   ThemFileHoSo: (param) => {
//     return apiPostAuth(apiUrl.postFileHoSo, param, {
//         "Content-Type": "multipart/form-data",
//     });
// },

ChuyenDon: (param) => {
  return apiPostAuth(apiUrl.ChuyenDonThu,
    param,
  );
},

}

export default api;
