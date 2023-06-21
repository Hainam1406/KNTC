import {
  apiGetAuth,
  apiPostAuth
} from "../../../../api";
import server from '../../../../settings';
import {getDefaultPageSize} from "../../../../helpers/utility";

const apiUrl = {
  danhsachfiledinhkem: server.apiTemp + 'DanhMucFileDinhKem/DanhSachFileDinhKem',
  chitietfiledinhkem: server.apiTemp + 'DanhMucFileDinhKem/ChiTietFileDinhKem',
  themfiledinhkem: server.apiTemp + 'DanhMucFileDinhKem/ThemMoiFileDinhKem',
  capnhatfiledinhkem: server.apiTemp + 'DanhMucFileDinhKem/CapNhatFileDinhKem',
  xoafiledinhkem: server.apiTemp + 'DanhMucFileDinhKem/XoaFileDinhKem',
};
const api = {
  DanhSachFileDinhKem: (param) => {
    return apiGetAuth(apiUrl.danhsachfiledinhkem, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietFileDinhKem: (param) => {
    return apiGetAuth(apiUrl.chitietfiledinhkem, {
      ...param
    });
  },
  ThemFileDinhKem: (param) => {
    return apiPostAuth(apiUrl.themfiledinhkem, {
      ...param,
    });
  },
  CapNhatFileDinhKem: (param) => {
    return apiPostAuth(apiUrl.capnhatfiledinhkem, {
      ...param,
    });
  },
  XoaFileDinhKem: (param) => {
    return apiPostAuth(apiUrl.xoafiledinhkem, 
      param
    );
  },
};

export default api;