import actions from './action';

const initState = {
  DuLieuChart: {},
  TotalRow: 0,
  loadingChart: false,
};

const reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DASHBOARD_GET_LIST:
      return {
        ...state,
        loadingChart: true,
      };
    case actions.DASHBOARD_GET_LIST_SUCCESS:
      return {
        ...state,
        DuLieuChart: payload.DuLieuChart,
        TotalRow: payload.TotalRow,
        loadingChart: false,
      };
    case actions.DASHBOARD_GET_LIST_ERROR:
      return {
        ...state,
        DuLieuChart: {},
        TotalRow: 0,
        loadingChart: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
