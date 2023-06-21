import { apiGetAuth, apiPostAuth } from "../../../api";
import server from "../../../settings";

const apiUrl = {
    danhsachdata: server.v2Url + "DashBoard/GetDanhSachData",
    getcoquanbyphamviid: server.v2Url + "DashBoard/GetCoQuanByPhamViID",
};
const api = {
    DanhSachData: (params) => {
        return apiGetAuth(apiUrl.danhsachdata, {
            ...params,
        });
    },
    GetCoQuanByPhamViID: (params) => {
        return apiGetAuth(apiUrl.getcoquanbyphamviid, {
            ...params,
        });
    },
};

export default api;
