import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../containers/DashBoash/config";
import actions from "./action";

function* getBaoCao({ payload }) {
    const response = yield call(api.DanhSachData, payload.filterData);
    console.log(response, "data");
    try {
        const response = yield call(api.DanhSachData, payload.filterData);

        yield put({
            type: actions.DASHBOARD_GET_LIST_SUCCESS,
            payload: {
                DuLieuChart: response.data.Data,
                TotalRow: response.data.TotalRow,
            },
        });
    } catch (e) {
        yield put({
            type: actions.DASHBOARD_GET_LIST_ERROR,
        });
    }
}

export default function* getThongTinBaoCao() {
    yield all([yield takeEvery(actions.DASHBOARD_GET_LIST, getBaoCao)]);
}
