import actions from "./action";

const initState = {
  SoTiepDan: [],
  DanhSachLanhDao: [],
  DanhSachDanKhongDen: [],
  TotalRow: 0,
  tableLoading: true,
};

const SoTiepDanTrucTiep = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_SOTIEPDAN:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_SOTIEPDAN_SUCCESS:
      return {
        ...state,
        SoTiepDan: payload.SoTiepDan,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.GET_DATA_SOTIEPDAN_ERROR:
      return {
        ...state,
        SoTiepDan: [],
        TotalRow: 0,
        tableLoading: false,
      };

    case actions.GET_DATA_DANKHONGDEN:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_DANKHONGDEN_SUCCESS:
      return {
        ...state,
        DanhSachDanKhongDen: payload.DanhSachDanKhongDen,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.GET_DATA_DANKHONGDEN_ERROR:
      return {
        ...state,
        DanhSachDanKhongDen: [],
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
        tableLoading: false,
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

export default SoTiepDanTrucTiep;
