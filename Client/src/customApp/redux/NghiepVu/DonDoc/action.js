const actions = {
  GETDATA_DS_CANDONDOC: "GETDATA_DS_CANDONDOC",
  GETDATA_DS_CANDONDOC_SUCCESS: "GETDATA_DS_CANDONDOC_SUCCESS",
  GETDATA_DS_CANDONDOC_ERROR: "GETDATA_DS_CANDONDOC_ERROR",

  getData: (filterData) => ({
    type: actions.GETDATA_DS_CANDONDOC,
    payload: { filterData },
  }),
};

export default actions;
