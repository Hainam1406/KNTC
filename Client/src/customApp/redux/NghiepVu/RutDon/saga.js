import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/RutDon/config";
import actions from "./action";

function* getDataRutDonThu({ payload }) {
  try {
    const response = yield call(api.DanhSachRutDonThu, payload.filterData);
    yield put({
      type: actions.GET_DATA_RUTDON_SUCCESS,
      payload: {
        RutDon: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_RUTDON_ERROR,
    });
  }
}

export default function* sotiepAll() {
  yield all([yield takeEvery(actions.GET_DATA_RUTDON, getDataRutDonThu)]);
}
