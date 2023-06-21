import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/QLHoSoDonThu/config";
import actions from "./action";

function* getDataDanhSachDonThu({ payload }) {
  try {
    const response = yield call(api.QuanLyHoSo, payload.filterData);
    yield put({
      type: actions.GET_DATA_QUANLYDONTHU_SUCCESS,
      payload: {
        DanhSachDonThu: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_QUANLYDONTHU_ERROR,
    });
  }
}

export default function* sotiepAll() {
  yield all([yield takeEvery(actions.GET_DATA_QUANLYDONTHU, getDataDanhSachDonThu)]);
}
