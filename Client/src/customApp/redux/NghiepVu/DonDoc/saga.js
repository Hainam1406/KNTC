import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/DonDoc/config";
import actions from "./action";

function* getDataDanhSach({ payload }) {
  try {
    const response = yield call(api.DanhSachDonDoc, payload.filterData);
    yield put({
      type: actions.GETDATA_DS_CANDONDOC_SUCCESS,
      payload: {
        DanhSachCanDonDoc: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GETDATA_DS_CANDONDOC_ERROR,
    });
  }
}

export default function* DanhSachDonThuCanPheDuyet() {
  yield all([yield takeEvery(actions.GETDATA_DS_CANDONDOC, getDataDanhSach)]);
}
