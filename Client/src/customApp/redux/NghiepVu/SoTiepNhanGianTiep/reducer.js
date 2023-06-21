import actions from "./action";

const initState = {
  SoTiepDanGianTiep: [],
  DanhSachLanhDao: [],
  TotalRow: 0,
  tableLoading: true,
};

const SoTiepDanGianTiep = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_SOTIEPNHANGIANTIEP:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_SOTIEPNHANGIANTIEP_SUCCESS:
      return {
        ...state,
        SoTiepDanGianTiep: payload.SoTiepDanGianTiep,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.GET_DATA_SOTIEPNHANGIANTIEP_ERROR:
      return {
        ...state,
        SoTiepDanGianTiep: [],
        TotalRow: 0,
        tableLoading: false,
      };

    case actions.GET_DATA_DANHSACHLANHDAO:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_DANHSACHLANHDAO_SUCCESS:
      return {
        ...state,
        DanhSachLanhDao: payload.DanhSachLanhDao,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.GET_DATA_DANHSACHLANHDAO_ERROR:
      return {
        ...state,
        DanhSachLanhDao: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default SoTiepDanGianTiep;
