import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/TraCuuDonThu/config"
import actions from "./action";
function* checkTrungDon({ payload }) {
  try {
    const response = yield call(api.DanhSachDonThuHeThong, payload.filterData);
    yield put({
      type: actions.DANHSACHDONTHUHETHONG_INIT_SUCCESS,
      payload: {
        DanhSachDonThu: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DANHSACHDONTHUHETHONG_INIT_ERROR,
    });
  }
}

export default function* TraCuuDonThu() {
  yield all([
    yield takeEvery(actions.DANHSACHDONTHUHETHONG_INIT, checkTrungDon),
  ]);
}