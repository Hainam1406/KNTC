const actions = {
  GET_DATA_PHANXULYDON: "GET_DATA_PHANXULYDON",
  GET_DATA_PHANXULYDON_SUCCESS: "GET_DATA_PHANXULYDON_SUCCESS",
  GET_DATA_PHANXULYDON_ERROR: "GET_DATA_PHANXULYDON_ERROR",


  getData: (filterData) => ({
    type: actions.GET_DATA_PHANXULYDON,
    payload: { filterData },
  }),
};

export default actions;
