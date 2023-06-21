import {
  apiGetAuth,
  apiPostAuth
} from "../../../../api";
import server from '../../../../settings';
import {getDefaultPageSize} from "../../../../helpers/utility";

const apiUrl = {
  danhsachnguondonden: server.apiTemp + 'DanhMucNguonDonDen/DanhSachNguonDonDen',
  chitietnguondonden: server.apiTemp + 'DanhMucNguonDonDen/ChiTietNguonDonDen',
  themnguondonden: server.apiTemp + 'DanhMucNguonDonDen/ThemMoiNguonDonDen',
  capnhatnguondonden: server.apiTemp + 'DanhMucNguonDonDen/CapNhatNguonDonDen',
  xoanguondonden: server.apiTemp + 'DanhMucNguonDonDen/XoaNguonDonDen',
};
const api = {
  DanhSachNguonDonDen: (param) => {
    return apiGetAuth(apiUrl.danhsachnguondonden, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietNguonDonDen: (param) => {
    return apiGetAuth(apiUrl.chitietnguondonden, {
      ...param
    });
  },
  ThemNguonDonDen: (param) => {
    return apiPostAuth(apiUrl.themnguondonden, {
      ...param,
    });
  },
  CapNhatNguonDonDen: (param) => {
    return apiPostAuth(apiUrl.capnhatnguondonden, {
      ...param,
    });
  },
  XoaNguonDonDen: (param) => {
    return apiPostAuth(apiUrl.xoanguondonden, 
      param
    );
  },
};

export default api;