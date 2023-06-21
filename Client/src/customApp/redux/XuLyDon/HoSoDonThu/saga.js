import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/XuLyDon/DanhSachHoSoDonThu/config";
import actions from "./action";

function* getDataDonThuCanPhanXuLy({ payload }) {
  try {
    const response = yield call(api.DanhSachHoSoDonThu, payload.filterData);
    yield put({
      type: actions.GET_DATA_HOSODONTHU_SUCCESS,
      payload: {
        HoSoDonThu: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_HOSODONTHU_ERROR,
    });
  }
}

export default function* donthuAll() {
  yield all([
    yield takeEvery(actions.GET_DATA_HOSODONTHU, getDataDonThuCanPhanXuLy),
  ]);
}
