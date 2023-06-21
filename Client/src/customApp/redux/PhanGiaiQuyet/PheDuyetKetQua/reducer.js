import actions from "./action";

const initState = {
  DanhSachCanPheDuyet: [],

  TotalRow: 0,
  tableLoading: true,
};

const KetQuaCanPheDuyet = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DANHSACH_DONTHUCANPHEDUYET:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DANHSACH_DONTHUCANPHEDUYET_SUCCESS:
      return {
        ...state,
        DanhSachCanPheDuyet: payload.DanhSachCanPheDuyet,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.GET_DANHSACH_DONTHUCANPHEDUYET_ERROR:
      return {
        ...state,
        DanhSachCanPheDuyet: [],
        TotalRow: 0,
        tableLoading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default KetQuaCanPheDuyet;
