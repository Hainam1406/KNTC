import { apiGetAuth, apiPostAuth } from '../../../../api';
import server from '../../../../settings';

const apiUrl = {
    danhsachcoquan: server.apiTemp + 'DanhMucLoaiKhieuTo/DanhSachLoaiKhieuTo',
    getallcoquan: server.apiTemp + 'DanhMucLoaiKhieuTo/DanhSachLoaiKhieuTo',
    chitietcoquan: server.apiTemp + 'DanhMucLoaiKhieuTo/ChiTietLoaiKhieuTo',
    themcoquan: server.apiTemp + 'DanhMucLoaiKhieuTo/ThemMoiLoaiKhieuTo',
    suacoquan: server.apiTemp + 'DanhMucLoaiKhieuTo/CapNhatLoaiKhieuTo',
    xoacoquan: server.apiTemp + 'DanhMucLoaiKhieuTo/XoaLoaiKhieuTo',
    setSuDung: server.apiTemp + 'DanhMucLoaiKhieuTo/CapNhatTrangThaiSuDung',
    danhsachdiagioi: server.apiTemp + 'danhmucdiagioihanhchinh/getallbycap',
    listbyuser: server.apiTemp + 'DanhMucCoQuanDonVi/GetListByUser',
    checkmacq: server.apiTemp + 'DanhMucCoQuanDonVi/CheckMaCQ',
};
const api = {
    danhSachCoQuan: (param) => {
        return apiGetAuth(apiUrl.danhsachcoquan, {
            ...param,
        });
    },
    danhSachDiaGioi: (param) => {
        return apiGetAuth(apiUrl.danhsachdiagioi, {
            ...param,
            ID: param.ID ? param.ID : 0,
        });
    },
    chiTietCoQuan: (param) => {
        return apiGetAuth(apiUrl.chitietcoquan, { ...param });
    },
    themCoQuan: (param) => {
        return apiPostAuth(apiUrl.themcoquan, { ...param });
    },
    suaCoQuan: (param) => {
        return apiPostAuth(apiUrl.suacoquan, {
            ...param,
        });
    },
    xoaCoQuan: (param) => {
        return apiPostAuth(apiUrl.xoacoquan, param);
    },
    setSuDung: (param) => {
        return apiPostAuth(apiUrl.setSuDung, param);
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
};

export default api;
