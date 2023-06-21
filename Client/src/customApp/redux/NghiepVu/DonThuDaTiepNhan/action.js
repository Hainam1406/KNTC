const actions = {
  GET_DATA_DONTHUDATIEPNHAN: "GET_DATA_DONTHUDATIEPNHAN",
  GET_DATA_DONTHUDATIEPNHAN_SUCCESS: "GET_DATA_DONTHUDATIEPNHAN_SUCCESS",
  GET_DATA_DONTHUDATIEPNHAN_ERROR: "GET_DATA_DONTHUDATIEPNHAN_ERROR",

  EDIT_DATA_TRINHLANHDAO_SUCCESS: "EDIT_DATA_TRINHLANHDAO_SUCCESS",

  getData: (filterData) => ({
    type: actions.GET_DATA_DONTHUDATIEPNHAN,
    payload: { filterData },
  }),

  editDataSuccess: (payload) => ({
    type: actions.EDIT_DATA_TRINHLANHDAO_SUCCESS,
    payload: payload,
  }),
};

export default actions;
