import actions from "./action";

const initState = {
  DonThuDaTiepNhan: [],
  TotalRow: 0,
  tableLoading: true,
};

const DonthuDaTiepNhan = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_DONTHUDATIEPNHAN:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_DONTHUDATIEPNHAN_SUCCESS:
      return {
        ...state,
        DonThuDaTiepNhan: payload.DonThuDaTiepNhan,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.GET_DATA_DONTHUDATIEPNHAN_ERROR:
      return {
        ...state,
        DonthuDaTiepNhan: [],
        TotalRow: 0,
        tableLoading: false,
      };
    case actions.EDIT_DATA_TRINHLANHDAO_SUCCESS:
      return {
        ...state,
        DonthuDaTiepNhan: payload.newArr,
      };

    default:
      return {
        ...state,
      };
  }
};

export default DonthuDaTiepNhan;
