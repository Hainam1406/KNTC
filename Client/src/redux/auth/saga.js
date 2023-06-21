import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {getToken, clearToken, getConfigValueByKey} from '../../helpers/utility';
import actions from './actions';
import api from "../../containers/Page/config";

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({payload}) {
    try {
      const {data} = payload;
      if (data.Status > 0) {
        const user = data.User;
        let role = {};
        yield data.ListRole.forEach((value) => {
          role[value.MaChucNang] = {
            view: value.Xem,
            add: value.Them,
            edit: value.Sua,
            delete: value.Xoa
          };
        });
        //get data config
        const ListConfig = yield call(api.getListConfig, {PageSize: 999});
        let dataConfig = {};
        if (ListConfig.data.Status > 0) {
          const ListDataConfig = ListConfig.data.Data;
          const pageSize = getConfigValueByKey(ListDataConfig, "PAGE_SIZE", 20);
          const fileLimit = getConfigValueByKey(ListDataConfig, "FILE_LIMIT", 10);
          const thanhTraTinh = getConfigValueByKey(ListDataConfig, "Thanh_Tra_Tinh_ID", 0);
          const namTrienKhai = getConfigValueByKey(ListDataConfig, "NAM_TRIEN_KHAI_PHAN_MEM", new Date().getFullYear());
          const tenDonVi = getConfigValueByKey(ListDataConfig, "Ten_Don_Vi", "");
          const tinhTrienKhai = getConfigValueByKey(ListDataConfig, "TINH_TRIEN_KHAI", "");
          //
          dataConfig = {
            pageSize,
            fileLimit,
            coQuanThanhTraTinhID: thanhTraTinh,
            namTrienKhai,
            tenDonVi,
            tinhTrienKhai,
            isIframe : payload.data?.isIframe,
            HrefLink : payload.data?.HrefLink
          };
          console.log(payload,'payload')
        }
        yield put({
          type: actions.LOGIN_SUCCESS,
          user,
          role,
          dataConfig
        });
      }
    } catch (e) {
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    console.log(payload,'payload')
    yield localStorage.setItem('user_id', payload.user.NguoiDungID);
    yield localStorage.setItem('access_token', payload.user.Token);
    yield localStorage.setItem('role', JSON.stringify(payload.role));
    yield localStorage.setItem('user', JSON.stringify(payload.user));
    yield localStorage.setItem('data_config', JSON.stringify(payload.dataConfig));
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    clearToken();
    yield put(push('/'));
  });
}

export function* checkAuthorization() {
  console.log('check author')
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const userId = getToken().get('userId');
    const accessToken = getToken().get('accessToken');
    if (userId && accessToken) {
      const param = {NguoiDungID: userId, Token: accessToken};
      const response = yield call(api.chiTiet, param);
      if (response.data.Status > 0) {
        let user = response.data.User;
        user = {...user, Token: accessToken};
        let role = {};
        yield response.data.ListRole.forEach((value) => {
          role[value.MaChucNang] = {
            view: value.Xem,
            add: value.Them,
            edit: value.Sua,
            delete: value.Xoa
          };
        });
        //get data config
        const ListConfig = yield call(api.getListConfig, {PageSize: 999});
        let dataConfig = {};
        if (ListConfig.data.Status > 0) {
          const ListDataConfig = ListConfig.data.Data;
          const pageSize = getConfigValueByKey(ListDataConfig, "PAGE_SIZE", 20);
          const fileLimit = getConfigValueByKey(ListDataConfig, "FILE_LIMIT", 10);
          const thanhTraTinh = getConfigValueByKey(ListDataConfig, "THANH_TRA_TINH_ID", 0);
          const namTrienKhai = getConfigValueByKey(ListDataConfig, "NAM_TRIEN_KHAI_PHAN_MEM", new Date().getFullYear());
          const tenDonVi = getConfigValueByKey(ListDataConfig, "TEN_DON_VI", "");
          const tinhTrienKhai = getConfigValueByKey(ListDataConfig, "TINH_TRIEN_KHAI", "");
          const isIframe = JSON.parse(localStorage.getItem('data_config'))?.isIframe ? JSON.parse(localStorage.getItem('data_config')).isIframe : false
          const HrefLink = JSON.parse(localStorage.getItem('data_config'))?.HrefLink ? JSON.parse(localStorage.getItem('data_config')).HrefLink : ''
          //
          dataConfig = {
            pageSize,
            fileLimit,
            coQuanThanhTraTinhID: thanhTraTinh,
            namTrienKhai,
            tenDonVi,
            tinhTrienKhai,
            isIframe,
            HrefLink
          };
        }
        yield put({
          type: actions.LOGIN_SUCCESS,
          profile: 'Profile',
          user,
          role,
          dataConfig
        });
      } else {
        clearToken();
        yield put(push('/'));
      }
    } else {
      clearToken();
      if (window.location.pathname !== '/quen-mat-khau') {
        yield put(push('/'));
      }
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
