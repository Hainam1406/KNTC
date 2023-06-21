import actions from "./action";

const initState = {
  XacMinhNoiDungDon: [],
  TotalRow: 0,
  tableLoading: true,
};

const XacMinhNoiDungDon = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_XACMINHNOIDUNGDON:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_XACMINHNOIDUNGDON_SUCCESS:
      return {
        ...state,
        XacMinhNoiDungDon: payload.XacMinhNoiDungDon,
        TotalRow: payload.TotalRow,
        tableLoading: true,

      };
    case actions.GET_DATA_XACMINHNOIDUNGDON_ERROR:
      return {
        ...state,
        XacMinhNoiDungDon: [],
        TotalRow: 0,
        tableLoading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default XacMinhNoiDungDon;
