import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/SoTiepDanTrucTiep/config";
import actions from "./action";

function* getDataSoTiepDan({ payload }) {
  try {
    const response = yield call(api.SoTiepDanTrucTiep, payload.filterData);
    yield put({
      type: actions.GET_DATA_SOTIEPDAN_SUCCESS,
      payload: {
        SoTiepDan: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_SOTIEPDAN_ERROR,
    });
  }
}

function* getDataDanhSachDanKhongDen({ payload }) {
  try {
    const response = yield call(api.DanhSachDanKhongDen, payload.filterData);
    yield put({
      type: actions.GET_DATA_DANKHONGDEN_SUCCESS,
      payload: {
        DanhSachDanKhongDen: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_DANKHONGDEN_ERROR,
    });
  }
}

function* getDataDanhSachLanhDao({ payload }) {
  try {
    const response = yield call(api.DanhSachLanhDao, payload.filterData);
    console.log(response.data.Data, "123");
    yield put({
      type: actions.GET_DATA_DANHSACHLANHDAO_SUCCESS,
      payload: {
        DanhSachLanhDao: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_DANHSACHLANHDAO_ERROR,
    });
  }
}

export default function* sotiepAll() {
  yield all([
    yield takeEvery(actions.GET_DATA_SOTIEPDAN, getDataSoTiepDan),
    yield takeEvery(actions.GET_DATA_DANHSACHLANHDAO, getDataDanhSachLanhDao),
    yield takeEvery(actions.GET_DATA_DANKHONGDEN, getDataDanhSachDanKhongDen),
  ]);
}
