import { apiGetAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  systemLog: server.apiTemp + "SystemLog/DanhSach",
};
const api = {
  SystemLog: (param) => {
    return apiGetAuth(apiUrl.systemLog, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
};

export default api;
