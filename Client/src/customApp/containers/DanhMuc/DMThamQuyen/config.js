import { apiGetAuth, apiPostAuth } from '../../../../api';
import server from '../../../../settings';
import { getDefaultPageSize } from '../../../../helpers/utility';

const apiUrl = {
    danhsachthamquyen: server.apiTemp + 'DanhMucThamQuyen/DanhSachThamQuyen',
    chitietthamquyen: server.apiTemp + 'DanhMucThamQuyen/ChiTietThamQuyen',
    themthamquyen: server.apiTemp + 'DanhMucThamQuyen/ThemMoiThamQuyen',
    capnhatthamquyen: server.apiTemp + 'DanhMucThamQuyen/CapNhatThamQuyen',
    xoathamquyen: server.apiTemp + 'DanhMucThamQuyen/XoaThamQuyen',
};
const api = {
    DanhSachThamQuyen: (param) => {
        return apiGetAuth(apiUrl.danhsachthamquyen, {
            ...param,
            PageNumber: param.PageNumber ? param.PageNumber : 1,
            PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
        });
    },
    ChiTietThamQuyen: (param) => {
        return apiGetAuth(apiUrl.chitietthamquyen, {
            ...param,
        });
    },
    ThemThamQuyen: (param) => {
        return apiPostAuth(apiUrl.themthamquyen, {
            ...param,
        });
    },
    CapNhatThamQuyen: (param) => {
        return apiPostAuth(apiUrl.capnhatthamquyen, {
            ...param,
        });
    },
    XoaThamQuyen: (param) => {
        return apiPostAuth(apiUrl.xoathamquyen, param);
    },
};

export default api;
