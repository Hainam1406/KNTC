import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/DonThuDaTiepNhan/config";
import actions from "./action";

function* getDataVuViecPhucTap({ payload }) {
  try {
    const response = yield call(api.DonThuDaTiepNhan, payload.filterData);
    yield put({
      type: actions.GET_DATA_VUVIECPHUCTAP_SUCCESS,
      payload: {
        VuViecPhucTap: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_VUVIECPHUCTAP_ERROR,
    });
  }
}
export default function* donthuAll() {
  yield all([
    yield takeEvery(actions.GET_DATA_VUVIECPHUCTAP, getDataVuViecPhucTap),
  ]);
}
