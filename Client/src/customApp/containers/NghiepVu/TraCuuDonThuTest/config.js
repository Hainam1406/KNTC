import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

export const apiUrl = {
  danhsachquoctich: server.apiTemp + "DanhMucQuocTich/DanhSachQuocTich",
  chitietquoctich: server.apiTemp + "DanhMucQuocTich/ChiTietQuocTich",
  themquoctich: server.apiTemp + "DanhMucQuocTich/ThemMoiQuocTich",
  capnhatquoctich: server.apiTemp + "DanhMucQuocTich/CapNhatQuocTich",
  xoaquoctich: server.apiTemp + "DanhMucQuocTich/XoaQuocTich",
  InsertFile : server.apiTemp + "FileDinhKem/Insert"
};
const api = {
  DanhSachQuocTich: (param) => {
    return apiGetAuth(apiUrl.danhsachquoctich, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietQuocTich: (param) => {
    return apiGetAuth(apiUrl.chitietquoctich, {
      ...param,
    });
  },
  THemQuocTich: (param) => {
    return apiPostAuth(apiUrl.themquoctich, {
      ...param,
      
    });
  },
  CapNhatQuocTich: (param) => {
    return apiPostAuth(apiUrl.capnhatquoctich, {
      ...param,
    });
  },
  XoaQuocTich: (param) => {
    return apiPostAuth(apiUrl.xoaquoctich, param);
  },
  InsertFile : param => {
    return apiPostAuth(apiUrl.InsertFile, param);
  }
};

export default api;
