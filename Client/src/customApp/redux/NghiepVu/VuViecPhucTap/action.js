const actions = {
  GET_DATA_VUVIECPHUCTAP: "GET_DATA_VUVIECPHUCTAP",
  GET_DATA_VUVIECPHUCTAP_SUCCESS: "GET_DATA_VUVIECPHUCTAP_SUCCESS",
  GET_DATA_VUVIECPHUCTAP_ERROR: "GET_DATA_VUVIECPHUCTAP_ERROR",


  getData: (filterData) => ({
    type: actions.GET_DATA_VUVIECPHUCTAP,
    payload: { filterData },
  }),
};

export default actions;
