import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  danhsachloaivanbankemtheo:
    server.apiTemp + "DanhMucLoaiVanBan/DanhSachLoaiVanBan",
  chitietloaivanbankemtheo:
    server.apiTemp + "DanhMucLoaiVanBan/ChiTietLoaiVanBan",
  themloaivanbankemtheo: server.apiTemp + "DanhMucLoaiVanBan/ThemMoiVanBan",
  capnhatloaivanbankemtheo: server.apiTemp + "DanhMucLoaiVanBan/CapNhatVanBan",
  xoaloaivanbankemtheo: server.apiTemp + "DanhMucLoaiVanBan/XoaVanBan",
};
const api = {
  DanhSachLoaiVanBanKemTheo: (param) => {
    return apiGetAuth(apiUrl.danhsachloaivanbankemtheo, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietLoaiVanBanKemTheo: (param) => {
    return apiGetAuth(apiUrl.chitietloaivanbankemtheo, {
      ...param,
    });
  },
  THemLoaiVanBanKemTheo: (param) => {
    return apiPostAuth(apiUrl.themloaivanbankemtheo, {
      ...param,
    });
  },
  CapNhatLoaiVanBanKemTheo: (param) => {
    return apiPostAuth(apiUrl.capnhatloaivanbankemtheo, {
      ...param,
    });
  },
  XoaLoaiVanBanKemTheo: (param) => {
    return apiPostAuth(apiUrl.xoaloaivanbankemtheo, param);
  },
};

export default api;
