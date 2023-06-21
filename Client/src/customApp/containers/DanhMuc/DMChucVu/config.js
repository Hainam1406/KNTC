import {
    apiGetAuth,
    apiPostAuth
  } from "../../../../api";
  import server from '../../../../settings';
  import {getDefaultPageSize} from "../../../../helpers/utility";
  
  const apiUrl = {
    danhsachchucvu: server.apiTemp + 'DanhMucChucVu/DanhSachChucVu',
    chitietchucvu: server.apiTemp + 'DanhMucChucVu/ChiTietChucVu',
    themchucvu: server.apiTemp + 'DanhMucChucVu/ThemMoiChucVu',
    capnhatchucvu: server.apiTemp + 'DanhMucChucVu/CapNhatChucVu',
    xoachucvu: server.apiTemp + 'DanhMucChucVu/XoaChucVu',
  };
  const api = {
    DanhSachChucVu: (param) => {
      return apiGetAuth(apiUrl.danhsachchucvu, {
        ...param,
        PageNumber: param.PageNumber ? param.PageNumber : 1,
        PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
      });
    },
    ChiTietChucVu: (param) => {
      return apiGetAuth(apiUrl.chitietchucvu, {
        ...param
      });
    },
    ThemChucVu: (param) => {
      return apiPostAuth(apiUrl.themchucvu, {
        ...param,
      });
    },
    CapNhatChucVu: (param) => {
      return apiPostAuth(apiUrl.capnhatchucvu, {
        ...param,
      });
    },
    XoaChucVu: (param) => {
      return apiPostAuth(apiUrl.xoachucvu, 
        param
      );
    },
  };
  
  export default api;