const actions = {
  DASHBOARD_GET_LIST: 'DASHBOARD_GET_LIST',
  DASHBOARD_GET_LIST_SUCCESS: 'DASHBOARD_GET_LIST_SUCCESS',
  DASHBOARD_GET_LIST_ERROR: 'DASHBOARD_GET_LIST_ERROR',

  getData: (filterData) => ({
    type: actions.DASHBOARD_GET_LIST,
    payload: {filterData},
  }),
};

export default actions;
