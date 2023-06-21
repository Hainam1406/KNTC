import { apiGetAuth, apiPostAuth } from "../../api";
import server from '../../settings';
import {getDefaultPageSize} from "../../helpers/utility";

const apiUrl = {
  // getnotifications: server.apiTemp + 'NhacViec/GetViecLam',
  danhsachhuongdan: server.apiTemp + 'HuongDanSuDung/GetAll',
  changepassword: server.apiTemp + 'Hethongnguoidung/ChangePassword',
  getlistchucnang :server.apiTemp + 'ChucNang/GetListMenu'
};
const api = {
  getListChucNang : (param) => {
    return apiGetAuth(apiUrl.getlistchucnang,{...param});
  },
  // getNotifications: (param) => {
  //   return apiGetAuth(apiUrl.getnotifications);
  // },
  danhSachHuongDan: (param) => {
    return apiGetAuth(apiUrl.danhsachhuongdan,{
      ...param,
      PageNumber: 1,
      PageSize: 1000
    });
  },
  changePassword: (param) => {
    return apiPostAuth(apiUrl.changepassword, {...param});
  },
};

export default api;