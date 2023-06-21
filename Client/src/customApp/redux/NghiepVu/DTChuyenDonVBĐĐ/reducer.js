import actions from "./action";

const initState = {
  DanhSachDonThuCanChuyenDonVBDD: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerDTCanChuyenDonVDDonDoc = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.DSDONTHUCANCHUYENDONVBDD_INIT:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DSDONTHUCANCHUYENDONVBDD_INIT_SUCCESS:
      return {
        ...state,
        DanhSachDonThuCanChuyenDonVBDD: payload.DanhSachDonThuCanChuyenDonVBDD,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.DSDONTHUCANCHUYENDONVBDD_INIT_ERROR:
      return {
        ...state,
        DanhSachDonThuCanChuyenDonVBDD: [],
        TotalRow: 0,
        tableLoading: false,
      };
      default:
        return {
          ...state,
        };
  }
};

export default ReducerDTCanChuyenDonVDDonDoc
