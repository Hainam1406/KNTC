import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";
const CanBoID = JSON.parse(localStorage.getItem("user"));
export const apiUrl = {
  // server.apiTemp + "DanhMucBieuMau/DanhSachBieuMau"
  // danhmucbieumau: server.apiTemp + "DanhMucBieuMau/DanhSachBieuMau",
  // thembieumau: server.apiTemp + "DanhMucBieuMau/ThemBieuMau",
  chitietbieumau: server.apiTemp + "DanhMucBieuMau/BieuMauChiTiet",
  danhsachcap: server.apiTemp + "DanhMucBieuMau/DanhSachCap",
  lichsuchitiet: server.apiTemp + "DanhMucBieuMau/LichSuChiTiet",
  downloadfile: server.apiTemp + "DanhMucBieuMau/DowloadBieuMau?fileName=",
  xoabieumau: server.apiTemp + "DanhMucBieuMau/XoaBieuMau",
  bieumaupreview: server.apiTemp + "DanhMucBieuMau/Preview",
  // suabieumau: server.apiTemp + "DanhMucBieuMau/SuaBieuMau",
};
const api = {
  DanhMucBieuMau: (param) => {
    return apiGetAuth(
      "https://kntcv2internapi.gosol.com.vn/api/v2/DanhMucBieuMau/DanhSachBieuMau",
      {
        ...param,
        PageNumber: param.PageNumber ? param.PageNumber : 1,
        PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
      }
    );
  },
  ChiTietBieuMau: (param) => {
    return apiGetAuth(apiUrl.chitietbieumau, {
      ...param,
    });
  },
  BieuMauPreView: (param) => {
    return apiGetAuth(apiUrl.bieumaupreview, param);
  },
  DanhSachCap: (param) => {
    return apiGetAuth(apiUrl.danhsachcap, param);
  },
  LichSuChiTiet: (param) => {
    return apiGetAuth(apiUrl.lichsuchitiet, param);
  },
  ThemBieuMau: (param) => {
    return apiPostAuth(
      "https://kntcv2internapi.gosol.com.vn/api/v2/DanhMucBieuMau/ThemBieuMau",
      param,
      { "Content-Type": "multipart/form-data" }
    );
  },
  SuaBieuMau: (param) => {
    return apiPostAuth(
      "https://kntcv2internapi.gosol.com.vn/api/v2/DanhMucBieuMau/SuaBieuMau",
      param,
      { "Content-Type": "multipart/form-data" }
    );
  },
  XoaBieuMau: (param) => {
    return apiPostAuth(apiUrl.xoabieumau, {
      BieuMauID: param,
    });
  },
};

export default api;
