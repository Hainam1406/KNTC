const actions = {
  GETBAOCAO_INIT_REQUEST: "GETBAOCAO_INIT_REQUEST",
  GETBAOCAO_INIT_REQUEST_SUCCESS: "GETBAOCAO_INIT_REQUEST_SUCCESS",
  GETBAOCAO_INIT_REQUEST_ERROR: "GETBAOCAO_INIT_REQUEST_ERROR",

  getData: (filterData) => ({
    type: actions.GETBAOCAO_INIT_REQUEST,
    payload: { filterData },
  }),

};

export default actions;
