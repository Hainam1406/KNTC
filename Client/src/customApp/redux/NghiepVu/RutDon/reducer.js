import actions from "./action";

const initState = {
  RutDon: [],
  TotalRow: 0,
  tableLoading: true,
};

const RutDon = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_RUTDON:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_RUTDON_SUCCESS:
      return {
        ...state,
        RutDon: payload.RutDon,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.GET_DATA_RUTDON_ERROR:
      return {
        ...state,
        RutDon: [],
        TotalRow: 0,
        tableLoading: false,
      };
    case actions.GET_DATA_DELETE:
      return {
        ...state,
        RutDon: payload.newData,
      };
    default:
      return {
        ...state,
      };
  }
};

export default RutDon;
