import { apiGetAuth, apiPostAuth } from '../../../../api';
import server from '../../../../settings';
import { getDefaultPageSize } from '../../../../helpers/utility';

const apiUrl = {
    danhsachphongban: server.apiTemp + 'DanhMucPhongBan/DanhSachPhongBan',
    chitietphongban: server.apiTemp + 'DanhMucPhongBan/ChiTietPhongBan',
    themphongban: server.apiTemp + 'DanhMucPhongBan/ThemMoiPhongBan',
    capnhatphongban: server.apiTemp + 'DanhMucPhongBan/CapNhatPhongBan',
    xoaphongban: server.apiTemp + 'DanhMucPhongBan/XoaPhongBan',
};
const api = {
    DanhSachPhongBan: (param) => {
        return apiGetAuth(apiUrl.danhsachphongban, {
            ...param,
            PageNumber: param.PageNumber ? param.PageNumber : 1,
            PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
        });
    },
    ChiTietPhongBan: (param) => {
        return apiGetAuth(apiUrl.chitietphongban, {
            ...param,
        });
    },
    ThemPhongBan: (param) => {
        return apiPostAuth(apiUrl.themphongban, {
            ...param,
        });
    },
    CapNhatPhongBan: (param) => {
        return apiPostAuth(apiUrl.capnhatphongban, {
            ...param,
        });
    },
    XoaPhongBan: (param) => {
        return apiPostAuth(apiUrl.xoaphongban, param);
    },
};

export default api;
