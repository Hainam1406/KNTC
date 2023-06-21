import actions from "./action";

const initState = {
  DanhSachCanDonDoc: [],

  TotalRow: 0,
  tableLoading: true,
};

const KetQuaCanPheDuyet = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GETDATA_DS_CANDONDOC:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GETDATA_DS_CANDONDOC_SUCCESS:
      return {
        ...state,
        DanhSachCanDonDoc: payload.DanhSachCanDonDoc,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.GETDATA_DS_CANDONDOC_ERROR:
      return {
        ...state,
        DanhSachCanDonDoc: [],
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
