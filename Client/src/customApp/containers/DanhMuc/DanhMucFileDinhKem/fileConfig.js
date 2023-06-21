import {
  apiGetAuth,
  apiPostAuth
} from "../../../../api";
import server from '../../../../settings';
import {getDefaultPageSize} from "../../../../helpers/utility";

const apiUrl = {
  danhsachfile: server.apiTemp + 'DanhMucFile/DanhSachFile',
  chitietfile: server.apiTemp + 'DanhMucFile/ChiTietFile',
  themfile: server.apiTemp + 'DanhMucFile/ThemFile',
  capnhatfile: server.apiTemp + 'DanhMucFile/CapNhatFile',
  xoafile: server.apiTemp + 'DanhMucFile/XoaFile',
  danhsachchucnang: server.apiTemp + 'DanhMucFile/DanhSachChucNang',
};
const api = {
  DanhSachFile: (param) => {
    return apiGetAuth(apiUrl.danhsachfile, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietFile: (param) => {
    return apiGetAuth(apiUrl.chitietfile, {
      ...param
    });
  },
  ThemFile: (param) => {
    return apiPostAuth(apiUrl.themfile, {
      ...param,
    });
  },
  CapNhatFile: (param) => {
    return apiPostAuth(apiUrl.capnhatfile, {
      ...param,
    });
  },
  XoaFile: (param) => {
    return apiPostAuth(apiUrl.xoafile, 
      param
    );
  },
  DanhSachChucNang: (param) => {
    return apiGetAuth(apiUrl.danhsachchucnang, 
      param
    );
  },
};

export default api;