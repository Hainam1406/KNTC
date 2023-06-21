import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/PhanGiaiQuyet/PheDuyetKetQua/config";
import actions from "./action";

function* getDataDanhSach({ payload }) {
  try {
    const response = yield call(
      api.DanhSachDonThuCanPheDuyet,
      payload.filterData
    );
    yield put({
      type: actions.GET_DANHSACH_DONTHUCANPHEDUYET_SUCCESS,
      payload: {
        DanhSachCanPheDuyet: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DANHSACH_DONTHUCANPHEDUYET_ERROR,
    });
  }
}

export default function* DanhSachDonThuCanPheDuyet() {
  yield all([
    yield takeEvery(actions.GET_DANHSACH_DONTHUCANPHEDUYET, getDataDanhSach),
  ]);
}
