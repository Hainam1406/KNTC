import actions from "./actions";
const initialData = {
  DanhMucBieuMau: [],
  TotalRow: 0,
  tableLoading: true,
};

const DanhMucBieuMau = (state = initialData, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.DANHMUCBIEUMAU_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DANHMUCBIEUMAU_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhMucBieuMau: payload.DanhMucBieuMau,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.DANHMUCBIEUMAU_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhMucBieuMau: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default DanhMucBieuMau;
