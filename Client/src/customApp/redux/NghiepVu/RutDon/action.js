const actions = {
  GET_DATA_RUTDON: "GET_DATA_RUTDON",
  GET_DATA_RUTDON_SUCCESS: "GET_DATA_RUTDON_SUCCESS",
  GET_DATA_RUTDON_ERROR: "GET_DATA_RUTDON_ERROR",
  // GET_DATA_DELETE: "GET_DATA_DELETE",
  // GET_DATA_DELETE_SUCCESS: "GET_DATA_DELETE_SUCCESS",

  getData: (filterData) => ({
    type: actions.GET_DATA_RUTDON,
    payload: { filterData },
  }),
  getListData: (payload) => ({
    type: actions.GET_DATA_RUTDON_SUCCESS,
    payload: payload,
  }),
};

export default actions;
