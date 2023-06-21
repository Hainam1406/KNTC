import {apiGetAuth, apiPostAuth} from "../../../../api";
import server from '../../../../settings';
import {getDefaultPageSize} from "../../../../helpers/utility";

export const apiUrl = {
  thongtinbaocao: server.apiTemp + 'BaoCao/TCD01',
  danhsachcapbaocao : server.apiTemp + 'BaoCao/GetListCap',
  chitietdonthu : server.apiTemp + 'BaoCao/TCD01_GetDSChiTietDonThu'
  
};
const api = {
  ThongTinBaoCao: (param) => {
    return apiGetAuth(apiUrl.thongtinbaocao, {
      ...param,
    });
  },
  DanhSachCapBaoCao : params => {
    return apiGetAuth(apiUrl.danhsachcapbaocao, {
      ...params
    })
  },
  ChiTietDonThu : params => {
    return apiGetAuth(apiUrl.chitietdonthu, {
      ...params,
      PageNumber: params.PageNumber ? params.PageNumber : 1,
      PageSize: params.PageSize ? params.PageSize : getDefaultPageSize(),
    })
  }
};

export default api;