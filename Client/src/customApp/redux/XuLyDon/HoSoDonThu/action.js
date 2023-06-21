const actions = {
  GET_DATA_HOSODONTHU: "GET_DATA_HOSODONTHU",
  GET_DATA_HOSODONTHU_SUCCESS: "GET_DATA_HOSODONTHU_SUCCESS",
  GET_DATA_HOSODONTHU_ERROR: "GET_DATA_HOSODONTHU_ERROR",

  getData: (filterData) => ({
    type: actions.GET_DATA_HOSODONTHU,
    payload: { filterData },
  }),
};

export default actions;
