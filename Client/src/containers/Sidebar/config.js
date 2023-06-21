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
};

export default api;