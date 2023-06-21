import { apiGet, apiPostAuth, apiGetAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  danhsachnhatky: server.apiTemp + "QuanTriDuLieu/TimKiem",
  danhsachfilephuchoi: server.apiTemp + "QuanTriDuLieu/GetFileInDerectory",
  saoluu: server.apiTemp + "QuanTriDuLieu/BackupDatabase",
  phuchoi: server.apiTemp + "QuanTriDuLieu/RestoreDatabase",
};
const api = {
  getUnit: (param) => {
    return apiGetAuth(apiUrl.danhsachnhatky, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  getFilePhucHoi: () => {
    return apiGetAuth(apiUrl.danhsachfilephuchoi);
  },
  saoLuu: (param) => {
    return apiGetAuth(apiUrl.saoluu, { ...param });
  },
  phucHoi: (param) => {
    return apiGetAuth(apiUrl.phuchoi, { ...param });
  },
};

export default api;
