import actions from "./action";

const initState = {
  DanhSachDonThu: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerTraCuuDonThu = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.DANHSACHDONTHUHETHONG_INIT:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DANHSACHDONTHUHETHONG_INIT_SUCCESS:
      return {
        ...state,
        DanhSachDonThu: payload.DanhSachDonThu,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.DANHSACHDONTHUHETHONG_INIT_ERROR:
      return {
        ...state,
        DanhSachDonThu: [],
        TotalRow: 0,
        tableLoading: false,
      };
      default:
        return {
          ...state,
        };
  }
};

export default ReducerTraCuuDonThu