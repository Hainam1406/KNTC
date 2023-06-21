import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/SoTiepNhanGianTiep/config";
import actions from "./action";

function* getDataSoTiepDanGianTiep({ payload }) {
  try {
    const response = yield call(api.SoTiepNhanGianTiep, payload.filterData);
    yield put({
      type: actions.GET_DATA_SOTIEPNHANGIANTIEP_SUCCESS,
      payload: {
        SoTiepDanGianTiep: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_SOTIEPNHANGIANTIEP_ERROR,
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
    yield takeEvery(
      actions.GET_DATA_SOTIEPNHANGIANTIEP,
      getDataSoTiepDanGianTiep
    ),
    yield takeEvery(actions.GET_DATA_DANHSACHLANHDAO, getDataDanhSachLanhDao),
  ]);
}
