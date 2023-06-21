import actions from "./action";

const initState = {
  PheDuyetKetQuaXuLy: [],
  TotalRow: 0,
  tableLoading: true,
};

const PheDuyetKetQuaXuLy = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_PHEDUYETKETQUAXULY:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_PHEDUYETKETQUAXULY_SUCCESS:
      return {
        ...state,
        PheDuyetKetQuaXuLy: payload.PheDuyetKetQuaXuLy,
        TotalRow: payload.TotalRow,
        tableLoading: false,

      };
    case actions.GET_DATA_PHEDUYETKETQUAXULY_ERROR:
      return {
        ...state,
        PheDuyetKetQuaXuLy: [],
        TotalRow: 0,
        tableLoading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default PheDuyetKetQuaXuLy;
