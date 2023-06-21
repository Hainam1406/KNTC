import actions from "./action";

const initState = {
  DanhSachDonThu: [],
  TotalRow: 0,
  tableLoading: true,
};

const QLHoSoDonThu = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_QUANLYDONTHU:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_QUANLYDONTHU_SUCCESS:
      return {
        ...state,
        DanhSachDonThu: payload.DanhSachDonThu,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.GET_DATA_QUANLYDONTHU_ERROR:
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

export default QLHoSoDonThu;
