import actions from "./action";

const initState = {
  HoSoDonThu: [],
  TotalRow: 0,
  tableLoading: true,
};

const HoSoDonThu = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_HOSODONTHU:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_HOSODONTHU_SUCCESS:
      return {
        ...state,
        HoSoDonThu: payload.HoSoDonThu,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.GET_DATA_HOSODONTHU_ERROR:
      return {
        ...state,
        HoSoDonThu: [],
        TotalRow: 0,
        tableLoading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default HoSoDonThu;
