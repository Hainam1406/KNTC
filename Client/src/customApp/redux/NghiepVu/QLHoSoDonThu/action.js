const actions = {
  GET_DATA_QUANLYDONTHU: "GET_DATA_QUANLYDONTHU",
  GET_DATA_QUANLYDONTHU_SUCCESS: "GET_DATA_QUANLYDONTHU_SUCCESS",
  GET_DATA_QUANLYDONTHU_ERROR: "GET_DATA_QUANLYDONTHU_ERROR",

  getData: (filterData) => ({
    type: actions.GET_DATA_QUANLYDONTHU,
    payload: { filterData },
  }),
};

export default actions;
