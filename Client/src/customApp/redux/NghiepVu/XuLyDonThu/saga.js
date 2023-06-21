import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/XuLyDonThu/config"
import actions from "./action";
function* checkTrungDon({ payload }) {
  try {
    const response = yield call(api.DanhSachDonThuHeThong, payload.filterData);
    yield put({
      type: actions.DANHSACHDONTHUCANXULY_INIT_SUCCESS,
      payload: {
        DanhSachDonThuCanXuly: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DANHSACHDONTHUCANXULY_INIT_ERROR,
    });
  }
}

export default function* XuLyDonThu() {
  yield all([
    yield takeEvery(actions.DANHSACHDONTHUCANXULY_INIT, checkTrungDon),
  ]);
}