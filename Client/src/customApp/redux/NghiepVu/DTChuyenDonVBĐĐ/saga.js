import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/DTCanChuyenDon_VBDonDo/config"
import actions from "./action";
function* checkTrungDon({ payload }) {
  try {
    const response = yield call(api.DShDonThuCanChuyenDonVBDD, payload.filterData);
    yield put({
      type: actions.DSDONTHUCANCHUYENDONVBDD_INIT_SUCCESS,
      payload: {
        DanhSachDonThuCanChuyenDonVBDD: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DSDONTHUCANCHUYENDONVBDD_INIT_ERROR,
    });
  }
}

export default function* TraCuuDonThu() {
  yield all([
    yield takeEvery(actions.DSDONTHUCANCHUYENDONVBDD_INIT, checkTrungDon),
  ]);
}
