import actions from "./action";

const initState = {
    DanhSachTrungDon: [],
    DonThuID: 0,
    XuLyDonID: 0,
    TotalRow: 0,
    tableLoading: true,
};

const TiepDanGianTiep = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.GETDATATIEPDANTRUCTIEP_INIT:
            return {
                ...state,
                tableLoading: true,
            };
        case actions.GETDATATIEPDANTRUCTIEP_INIT_SUCCESS:
            return {
                ...state,
                DanhSachTrungDon: payload.DanhSachTrungDon,
                TotalRow: payload.TotalRow,
                tableLoading: true,
            };
        case actions.GETDATATIEPDANTRUCTIEP_INIT_ERROR:
            return {
                ...state,
                DanhSachTrungDon: [],
                TotalRow: 0,
                tableLoading: false,
            };
        case actions.SETDONTHUID:
            return {
                ...state,
                DonThuID: payload.DonThuID,
                XuLyDonID: payload.XuLyDonID,
            };
        default:
            return {
                ...state,
            };
    }
};

export default TiepDanGianTiep;
