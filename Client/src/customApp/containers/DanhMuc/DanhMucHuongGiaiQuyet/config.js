import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";
const apiUrl = {
  danhsach: server.apiTemp + "DanhMucHuongGiaiQuyet/DanhSachHuongGiaiQuyet",
  chitiet: server.apiTemp + "DanhMucHuongGiaiQuyet/HuongGiaiQuyetChiTiet",
  themmoi: server.apiTemp + "DanhMucHuongGiaiQuyet/ThemMoiHuongGiaiQuyet",
  capnhap: server.apiTemp + "DanhMucHuongGiaiQuyet/CapNhatHuongGiaiQuyet",
  xoa: server.apiTemp + "DanhMucHuongGiaiQuyet/XoaHuongGiaiQuyet",
};
const api = {
  DanhSachHuongGiaiQuyet: (param) => {
    return apiGetAuth(apiUrl.danhsach, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietHuongGiaiQuyet: (param) => {
    return apiGetAuth(apiUrl.chitiet, {
      ...param,
    });
  },
  ThemHuongGiaiQuyet: (param) => {
    return apiPostAuth(apiUrl.themmoi, {
      ...param,
    });
  },
  CapNhapHuongGiaiQuyet: (param) => {
    return apiPostAuth(apiUrl.capnhap, {
      ...param,
    });
  },
  XoaHuongGiaiQuyet: (param) => {
    return apiPostAuth(apiUrl.xoa, param);
  },
};

export default api;
