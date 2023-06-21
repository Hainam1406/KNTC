import { apiGetAuth, apiPostAuth, apiDeleteAuth } from "../../../../api";
import server from "../../../../settings";

const apiUrl = {
  danhsachcoquan: server.apiTemp + "DanhMucCoQuanDonVi/DanhSachCacCap",
  getallcoquan: server.apiTemp + "DanhMucCoQuanDonVi/GetAll",
  chitietcoquan: server.apiTemp + "DanhMucCoQuanDonVi/ChiTietCoQuanID",
  themcoquan: server.apiTemp + "DanhMucCoQuanDonVi/ThemMoiCoQuanDonVi",
  suacoquan: server.apiTemp + "DanhMucCoQuanDonVi/CapNhatCoQuan",
  xoacoquan: server.apiTemp + "DanhMucCoQuanDonVi/XoaCoQuanDonVi",
  listbyuser: server.apiTemp + "DanhMucCoQuanDonVi/GetListByUser",
  checkmacq: server.apiTemp + "DanhMucCoQuanDonVi/CheckMaCQ",
  timkiemcoquan: "http://192.168.55.120:7192/SearchCoQuan",
  danhsachcaccapdonvi:
    server.apiTemp + "DanhMucCoQuanDonVi/DanhSachCacCapDonVi",
  danhsachthamquiyen: server.apiTemp + "DanhMucCoQuanDonVi/DanhSachThamQuyen",
};
const api = {
  danhSachCoQuan: (param) => {
    return apiGetAuth(apiUrl.danhsachcoquan, {
      ...param,
    });
  },
  // danhSachDiaGioi: (param) => {
  //   return apiGetAuth(
  //     "http://192.168.55.120:7070/api/v2/DanhMucDiaGioiHanhChinh_V2/DanhSachCacCap/Tinh/Huyen/Xa",
  //     {
  //       ...param,
  //       ID: param.ID ? param.ID : 0,
  //     }
  //   );
  // },
  chiTietCoQuan: (param) => {
    return apiGetAuth(apiUrl.chitietcoquan, {
      ...param,
    });
  },
  themCoQuan: (param) => {
    return apiPostAuth(apiUrl.themcoquan, {
      ...param,
    });
  },
  xoaCoQuan: (param) => {
    return apiGetAuth(`${apiUrl.xoacoquan}?CoQuanID=${param}`);
  },
  danhSachCacCapDonVi: (param) => {
    return apiGetAuth(apiUrl.danhsachcaccapdonvi);
  },
  danhSachThamQuyen: (param) => {
    return apiGetAuth(apiUrl.danhsachthamquiyen);
  },
  AllCoQuan: () => {
    return apiGetAuth(apiUrl.getallcoquan);
  },
  ListByUser: () => {
    return apiGetAuth(apiUrl.listbyuser);
  },
  CheckMaCQ: (param) => {
    return apiGetAuth(apiUrl.checkmacq, {
      ...param,
    });
  },
  suaCoQuan: (param) => {
    return apiPostAuth(apiUrl.suacoquan, {
      ...param,
    });
  },
};

export default api;
