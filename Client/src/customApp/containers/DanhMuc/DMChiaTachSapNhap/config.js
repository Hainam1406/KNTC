import {
    apiGetAuth,
    apiPostAuth
  } from "../../../../api";
  import server from '../../../../settings';
  import {getDefaultPageSize} from "../../../../helpers/utility";
  
  const apiUrl = {
    danhsachchiatachsapnhap: server.apiTemp + 'DanhMucChiaTachSapNhap/DanhSachChiaTachSapNhap',
    chitietchiatachsapnhap: server.apiTemp + 'DanhMucChiaTachSapNhap/ChiTietChiaTachSapNhap',
    themchiatachsapnhap: server.apiTemp + 'DanhMucChiaTachSapNhap/ThemMoiChiaTachSapNhap',
    capnhatchiatachsapnhap: server.apiTemp + 'DanhMucChiaTachSapNhap/CapNhatChiaTachSapNhap',
    xoachiatachsapnhap: server.apiTemp + 'DanhMucChiaTachSapNhap/XoaChiaTachSapNhap',
  };
  const api = {
    DanhSachChiaTachSapNhap: (param) => {
      return apiGetAuth(apiUrl.danhsachchiatachsapnhap, {
        ...param,
        PageNumber: param.PageNumber ? param.PageNumber : 1,
        PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
      });
    },
    ChiTietChiaTachSapNhap: (param) => {
      return apiGetAuth(apiUrl.chitietchiatachsapnhap, {
        ...param
      });
    },
    ThemChiaTachSapNhap: (param) => {
      return apiPostAuth(apiUrl.themchiatachsapnhap, {
        ...param,
      });
    },
    CapNhatChiaTachSapNhap: (param) => {
      return apiPostAuth(apiUrl.capnhatchiatachsapnhap, {
        ...param,
      });
    },
    XoaChiaTachSapNhap: (param) => {
      return apiPostAuth(apiUrl.xoachiatachsapnhap, 
        param
      );
    },
  };
  
  export default api;