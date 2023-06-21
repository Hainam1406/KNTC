import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  danhsachdonthucandocdoc: server.apiTemp + "donthudondoc/DS_DonThuCanDonDoc",
  ravanbandondoc: server.apiTemp + "donthudondoc/DuyetVBDD",
};
const api = {
  DanhSachDonDoc: (param) => {
    return apiGetAuth(apiUrl.danhsachdonthucandocdoc, {
      ...param,
      start: 1,
      end: 1000,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  RaVanBanDonDoc: (param) => {
    return apiPostAuth(apiUrl.ravanbandondoc, {
      ...param,
    });
  },
};

export default api;
