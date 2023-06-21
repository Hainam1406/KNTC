import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  danhsachbuocxacminh:
    server.apiTemp + "DanhMucBuocXacMinh/DanhSachBuocXacMinh",
  chitietbuocxacminh: server.apiTemp + "DanhMucBuocXacMinh/ChiTietBuocXacMinh",
  thembuocxacminh: server.apiTemp + "DanhMucBuocXacMinh/ThemMoiBuocXacMinh",
  capnhatbuocxacminh: server.apiTemp + "DanhMucBuocXacMinh/CapNhatBuocXacMinh",
  xoabuocxacminh: server.apiTemp + "DanhMucBuocXacMinh/XoaBuocXacMinh",
  danhSachLoaiKhieuToCha:
    server.apiTemp + "DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha",
  danhsachfile: server.apiTemp + "DanhMucFile/DanhSachFile",
  danhsachfilemau: server.apiTemp + "DanhMucBuocXacMinh/DanhSachFileMau",
  idfilemau: server.apiTemp + "DanhMucBuocXacMinh/DanhSachFileID",
  themfile: server.apiTemp + "DanhMucBuocXacMinh/ThemMoiFileMau",
  xoafile: server.apiTemp + "DanhMucBuocXacMinh/XoaFileMau",
  capnhatfile: server.apiTemp + "DanhMucBuocXacMinh/CapNhatFileMau",
  getFile: server.apiTemp + "DanhMucBuocXacMinh/Download",
};
const api = {
  DanhSachBuocXacMinh: (param) => {
    return apiGetAuth(apiUrl.danhsachbuocxacminh, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietBuocXacMinh: (param) => {
    return apiGetAuth(apiUrl.chitietbuocxacminh, {
      ...param,
    });
  },
  THemBuocXacMinh: (param) => {
    return apiPostAuth(apiUrl.thembuocxacminh, param, {
      "Content-Type": "multipart/form-data",
    });
  },
  CapNhatBuocXacMinh: (param) => {
    return apiPostAuth(apiUrl.capnhatbuocxacminh, param, {
      "Content-Type": "multipart/form-data",
    });
  },
  XoaBuocXacMinh: (param) => {
    return apiPostAuth(apiUrl.xoabuocxacminh, param);
  },
  DanhSachLoaiKhieuToCha: (param) => {
    return apiGetAuth(apiUrl.danhSachLoaiKhieuToCha, {
      ...param,
    });
  },
  DanhSachFile: (param) => {
    return apiGetAuth(apiUrl.danhsachfile, {
      ...param,
    });
  },
  DanhSachFileMau: (param) => {
    return apiGetAuth(apiUrl.danhsachfilemau, {
      ...param,
    });
  },
  IdFileMau: (param) => {
    return apiGetAuth(apiUrl.idfilemau, {
      ...param,
    });
  },
  THemFile: (param) => {
    return apiPostAuth(apiUrl.themfile, param, {
      "Content-Type": "multipart/form-data",
    });
  },
  XoaFile: (param) => {
    return apiPostAuth(apiUrl.xoafile, param);
  },
  CapNhatFile: (param) => {
    return apiPostAuth(apiUrl.capnhatfile, param, {
      "Content-Type": "multipart/form-data",
    });
  },
  GetFile: (param) => {
    return apiGetAuth(apiUrl.getFile, {
      ...param,
    });
  },
};

export default api;
