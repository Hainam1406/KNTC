import actions from "./action";

const initState = {
  DanhSachDonThuCanXuly: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducerDonThuCanXuly = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.DANHSACHDONTHUCANXULY_INIT:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DANHSACHDONTHUCANXULY_INIT_SUCCESS:
      return {
        ...state,
        DanhSachDonThuCanXuly: payload.DanhSachDonThuCanXuly,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.DANHSACHDONTHUCANXULY_INIT_ERROR:
      return {
        ...state,
        DanhSachDonThuCanXuly: [],
        TotalRow: 0,
        tableLoading: false,
      };
      default:
        return {
          ...state,
        };
  }
};

export default reducerDonThuCanXuly
