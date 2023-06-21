import {
    apiGetAuth,
    apiPostAuth
  } from "../../../../api";
  import server from '../../../../settings';
  import {getDefaultPageSize} from "../../../../helpers/utility";
  
  const apiUrl = {
    danhsachphantichkq: server.apiTemp + 'DanhMucPhanTich/DanhSachPhanTichKQ',
    chitietphantichkq: server.apiTemp + 'DanhMucPhanTich/ChiTietPhanTichKQ',
    themphantichkq: server.apiTemp + 'DanhMucPhanTich/ThemMoiPhanTichKQ',
    capnhatphantichkq: server.apiTemp + 'DanhMucPhanTich/CapNhatPhanTichKQ',
    xoaphantichkq: server.apiTemp + 'DanhMucPhanTich/XoaPhanTichKQ',
  };
  const api = {
    DanhSachPhanTichKQ: (param) => {
      return apiGetAuth(apiUrl.danhsachphantichkq, {
        ...param,
        PageNumber: param.PageNumber ? param.PageNumber : 1,
        PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
      });
    },
    ChiTietPhanTichKQ: (param) => {
      return apiGetAuth(apiUrl.chitietphantichkq, {
        ...param
      });
    },
    ThemPhanTichKQ: (param) => {
      return apiPostAuth(apiUrl.themphantichkq, {
        ...param,
      });
    },
    CapNhatPhanTichKQ: (param) => {
      return apiPostAuth(apiUrl.capnhatphantichkq, {
        ...param,
      });
    },
    XoaPhanTichKQ: (param) => {
      return apiPostAuth(apiUrl.xoaphantichkq, 
        param
      );
    },
  };
  
  export default api;