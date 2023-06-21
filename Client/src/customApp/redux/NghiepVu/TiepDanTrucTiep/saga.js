import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/TiepDanTrucTiep/config";
import actions from "./action";

function* checkTrungDon({ payload }) {
  try {
    const response = yield call(api.CheckTrungDon, payload.filterData);
    yield put({
      type: actions.GETDATATIEPDANTRUCTIEP_INIT_SUCCESS,
      payload: {
        DanhSachTrungDon: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GETDATATIEPDANTRUCTIEP_INIT_ERROR,
    });
  }
}

export default function* TiepDanAll() {
  yield all([
    yield takeEvery(actions.GETDATATIEPDANTRUCTIEP_INIT, checkTrungDon),
  ]);
}
