const actions = {
  DANHMUCQUOCTICH_GET_LIST_REQUEST : 'DANHMUCQUOCTICH_GET_LIST_REQUEST',
  DANHMUCQUOCTICH_GET_LIST_REQUEST_SUCCESS : 'DANHMUCQUOCTICH_GET_LIST_REQUEST_SUCCESS',
  DANHMUCQUOCTICH_GET_LIST_REQUEST_ERROR : 'DANHMUCQUOCTICH_GET_LIST_REQUEST_ERROR',
  getList : (filterData) => (
    {
    type : actions.DANHMUCQUOCTICH_GET_LIST_REQUEST,
    payload : {filterData}
  })
}

export default actions