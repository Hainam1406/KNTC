import {
    apiGetAuth,
    apiPostAuth
  } from "../../../../api";
  import server from '../../../../settings';
  import {getDefaultPageSize} from "../../../../helpers/utility";
  
  const apiUrl = {
    danhsachloaiketqua: server.apiTemp + 'DanhMucLoaiKetQua/DanhSachLoaiKetQua',
    chitietloaiketqua: server.apiTemp + 'DanhMucLoaiKetQua/ChiTietLoaiKetQua',
    themloaiketqua: server.apiTemp + 'DanhMucLoaiKetQua/ThemMoiLoaiKetQua',
    capnhatloaiketqua: server.apiTemp + 'DanhMucLoaiKetQua/CapNhatLoaiKetQua',
    xoaloaiketqua: server.apiTemp + 'DanhMucLoaiKetQua/XoaLoaiKetQua',
  };
  const api = {
    DanhSachLoaiKetQua: (param) => {
      return apiGetAuth(apiUrl.danhsachloaiketqua, {
        ...param,
        PageNumber: param.PageNumber ? param.PageNumber : 1,
        PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
      });
    },
    ChiTietLoaiKetQua: (param) => {
      return apiGetAuth(apiUrl.chitietloaiketqua, {
        ...param
      });
    },
    ThemLoaiKetQua: (param) => {
      return apiPostAuth(apiUrl.themloaiketqua, {
        ...param,
      });
    },
    CapNhatLoaiKetQua: (param) => {
      return apiPostAuth(apiUrl.capnhatloaiketqua, {
        ...param,
      });
    },
    XoaLoaiKetQua: (param) => {
      return apiPostAuth(apiUrl.xoaloaiketqua, 
        param
      );
    },
  };
  
  export default api;