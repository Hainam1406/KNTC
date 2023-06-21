import actions from "./action";

const initState = {
  VuViecPhucTap: [],
  TotalRow: 0,
  tableLoading: true,
};

const VuViecPhucTap = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_VUVIECPHUCTAP:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_VUVIECPHUCTAP_SUCCESS:
      return {
        ...state,
        VuViecPhucTap: payload.VuViecPhucTap,
        TotalRow: payload.TotalRow,
        tableLoading: true,

      };
    case actions.GET_DATA_VUVIECPHUCTAP_ERROR:
      return {
        ...state,
        VuViecPhucTap: [],
        TotalRow: 0,
        tableLoading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default VuViecPhucTap;
