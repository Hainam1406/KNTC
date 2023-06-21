import actions from "./action";

const initState = {
  DonThuCanPhanXuLy: [],
  TotalRow: 0,
  tableLoading: true,
};

const DonThuCanPhanXuLy = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_PHANXULYDON:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_PHANXULYDON_SUCCESS:
      return {
        ...state,
        DonThuCanPhanXuLy: payload.DonThuCanPhanXuLy,
        TotalRow: payload.TotalRow,
        tableLoading: false,

      };
    case actions.GET_DATA_PHANXULYDON_ERROR:
      return {
        ...state,
        DonThuCanPhanXuLy: [],
        TotalRow: 0,
        tableLoading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default DonThuCanPhanXuLy;
