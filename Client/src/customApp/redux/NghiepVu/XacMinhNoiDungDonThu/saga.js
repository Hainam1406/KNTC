import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/XacMinhNoiDungDon/config";
import actions from "./action";

function* getDataXacMinhDonThu({ payload }) {
  try {
    const response = yield call(api.XacMinhNoiDungDon, payload.filterData);
    yield put({
      type: actions.GET_DATA_XACMINHNOIDUNGDON_SUCCESS,
      payload: {
        XacMinhNoiDungDon: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GET_DATA_XACMINHNOIDUNGDON_ERROR,
    });
  }
}
export default function* donthuAll() {
  yield all([
    yield takeEvery(actions.GET_DATA_XACMINHNOIDUNGDON, getDataXacMinhDonThu),
  ]);
}
