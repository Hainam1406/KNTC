import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/PheDuyetKetQuaXuLy/config";
import actions from "./action";

function* getDataKetQuaXuLy({ payload }) {
  try {
    const response = yield call(api.PheDuyetKetQuaXuLy, payload.filterData);
    yield put({
      type: actions.GET_DATA_PHEDUYETKETQUAXULY_SUCCESS,
      payload: {
        PheDuyetKetQuaXuLy: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_PHEDUYETKETQUAXULY_ERROR,
    });
  }
}
export default function* donthuAll() {
  yield all([
    yield takeEvery(actions.GET_DATA_PHEDUYETKETQUAXULY, getDataKetQuaXuLy),
  ]);
}
