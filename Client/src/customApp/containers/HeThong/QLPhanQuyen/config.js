import {
  apiGetAuth, apiGetUser,
  apiPostAuth
} from "../../../../api";
import server from '../../../../settings';
import {getDefaultPageSize} from "../../../../helpers/utility";

const apiUrl = {
  danhsachnhom: server.apiTemp + 'PhanQuyen/GetListPaging',
  danhsachcoquan: server.apiTemp + 'DanhMucCoQuanDonVi/GetListByUser_FoPhanQuyen',
  danhsachcanbo: server.apiTemp + 'hethongcanbo/getlistpaging',

  themnhom: server.apiTemp + 'PhanQuyen/NhomNguoiDung_Insert',
  suanhom: server.apiTemp + 'PhanQuyen/NhomNguoiDung_Update',
  chitietnhom: server.apiTemp + 'PhanQuyen/NhomNguoiDung_GetFoUpdate',
  sieuchitietnhom: server.apiTemp + 'PhanQuyen/NhomNguoiDung_GetChiTietByNhomNguoiDungID',
  xoanhom: server.apiTemp + 'PhanQuyen/NhomNguioDung_Delete',
  //chitietnguoidung: server.apiTemp + 'HeThongNguoiDung/GetByIDForPhanQuyen',
  danhsachchucnang: server.apiTemp + 'PhanQuyen/PhanQuyen_GetQuyenDuocThaoTacTrongNhom',

  danhsachnguoidung: server.apiTemp + 'HeThongNguoiDung/HeThong_NguoiDung_GetListBy_NhomNguoiDungID',
  themnguoidung: server.apiTemp + 'PhanQuyen/NguoiDung_NhomNguoiDung_Insert',
  themnhieunguoidung: server.apiTemp + 'PhanQuyen/NguoiDung_NhomNguoiDung_Insert_Multi',
  xoanguoidung: server.apiTemp + 'PhanQuyen/NguoiDung_NhomNguoiDung_Delete',

  themchucnang: server.apiTemp + 'PhanQuyen/PhanQuyen_InsertMult',
  suachucnang: server.apiTemp + 'PhanQuyen/PhanQuyen_Update',
  xoachucnang: server.apiTemp + 'PhanQuyen/PhanQuyen_Delete',
};
const api = {
  danhSachNhom: (param) => {
    return apiGetAuth(apiUrl.danhsachnhom,{
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize()
    });
  },
  danhSachCoQuan: (param) => {
    return apiGetAuth(apiUrl.danhsachcoquan,{
      ...param
    });
  },
  danhSachCanBo: (param) => {
    return apiGetAuth(apiUrl.danhsachcanbo,{
      ...param,
      PageNumber: 1,
      PageSize: 999999
    });
  },
  themNhom: (param) => {
    return apiPostAuth(apiUrl.themnhom,{
      ...param
    });
  },
  suaNhom: (param) => {
    return apiPostAuth(apiUrl.suanhom,{
      ...param
    });
  },
  chiTietNhom: (param) => {
    return apiGetAuth(apiUrl.chitietnhom,{
      ...param
    });
  },
  sieuChiTietNhom: (param) => {
    return apiGetAuth(apiUrl.sieuchitietnhom,{
      ...param
    });
  },
  xoaNhom: (param) => {
    return apiPostAuth(apiUrl.xoanhom,{
      ...param
    });
  },
  // chiTietNguoiDung: (param) => {
  //   return apiGetUser(apiUrl.chitietnguoidung, {
  //     ...param
  //   });
  // },
  danhSachChucNang: (param) => {
    return apiGetAuth(apiUrl.danhsachchucnang, {
      ...param
    });
  },
  danhSachNguoiDung: (param) => {
    return apiGetAuth(apiUrl.danhsachnguoidung,{
      ...param
    });
  },
  themNguoiDung: (param) => {
    return apiPostAuth(apiUrl.themnguoidung,{
      ...param
    });
  },
  themNhieuNguoiDung: (param) => {
    return apiPostAuth(apiUrl.themnhieunguoidung,{
      ...param
    });
  },
  xoaNguoiDung: (param) => {
    return apiPostAuth(apiUrl.xoanguoidung,{
      ...param
    });
  },
  themChucNang: (paramArray) => {
    return apiPostAuth(apiUrl.themchucnang,paramArray);
  },
  suaChucNang: (paramArray) => {
    return apiPostAuth(apiUrl.suachucnang, paramArray);
  },
  xoaChucNang: (param) => {
    return apiPostAuth(apiUrl.xoachucnang,{
      ...param
    });
  },
};

export default api;