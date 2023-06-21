import {
  apiGetAuth,
  apiPostAuth
} from "../../../../api";
import server from '../../../../settings';
import {getDefaultPageSize} from "../../../../helpers/utility";

const apiUrl = {
  danhsachdonthuloi: server.apiTemp + 'DonThuLoi/DanhSachDonThuLoi',
  chitietdonthuloi: server.apiTemp + 'DonThuLoi/ChiTietDonThuLoi',
  xoadonthuloi: server.apiTemp + 'DonThuLoi/XoaDonThuLoi',
  danhsachloaikhieutocha: server.apiTemp + 'DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha'
};
const api = {
  DanhSachDonThuLoi: (param) => {
    return apiGetAuth(apiUrl.danhsachdonthuloi, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietDonThuLoi: (param) => {
    return apiGetAuth(apiUrl.chitietdonthuloi, {
      ...param
    });
  },
  XoaDonThuLoi: (param) => {
    return apiPostAuth(apiUrl.xoadonthuloi, 
      param
    );
  },
  DanhSachLoaiKhieuToCha: (param) => {
    return apiGetAuth(apiUrl.danhsachloaikhieutocha, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
};

export default api;