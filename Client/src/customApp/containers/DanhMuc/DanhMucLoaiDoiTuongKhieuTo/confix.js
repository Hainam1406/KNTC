import Axios from "axios";
import { apiGetAuth, apiPostAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

const apiUrl = {
  getDanhSachDoiTuongKT:
    server.v2Url + "TiepDanGianTiep/DanhSachLoaiDoiTuongKN",
};
// lay danh sach
const api = {
  DanhSachDanToc: (param) => {
    return apiGetAuth(apiUrl.getDanhSachDoiTuongKT, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
};

export default api;
